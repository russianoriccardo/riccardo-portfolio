"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ExplainApiResponse, Explanation, ProjectExplanations } from "@/content/explanations";

type Props = {
  slug: string;
  explanations: ProjectExplanations;
  // Case studies under NDA: unmatched selections always show "Not covered on this page".
  liveExplanations: boolean;
  email: string;
  children: React.ReactNode;
};

// What the popover is showing. Pre-written explanations have a phrase element to return focus to.
type Popover =
  | { kind: "reviewed"; phrase: string; entry: Explanation; anchor: HTMLElement }
  | { kind: "loading"; phrase: string }
  | { kind: "generated"; phrase: string; entry: Explanation }
  | { kind: "not-covered"; phrase: string }
  | { kind: "error"; phrase: string; message: string };

type Rect = { top: number; bottom: number; left: number };

const POPOVER_WIDTH = 440;
const MIN_SELECTION = 3;
const MAX_SELECTION = 300;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const badges = {
  reviewed: { label: "Reviewed by Riccardo", className: "explain-badge-reviewed" },
  generated: { label: "Generated from this page", className: "explain-badge-generated" },
  "not-covered": { label: "Not covered on this page", className: "explain-badge-missing" },
};

// Wraps case study content. Phrases marked with <span data-explain="ID"> in content/site.ts become
// buttons that open a popover explaining the decision (content/explanations.ts). Highlighting any
// other text shows an "Explain this" button that asks /api/explain, which answers from this page only.
export default function ExplainLayer({ slug, explanations, liveExplanations, email, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<AbortController | null>(null);
  const [popover, setPopover] = useState<Popover | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: POPOVER_WIDTH });
  const [selectionButton, setSelectionButton] = useState<{ top: number; left: number; range: Range } | null>(null);

  // The case study HTML is injected with dangerouslySetInnerHTML, so upgrade the marked spans after mount.
  useEffect(() => {
    rootRef.current?.querySelectorAll<HTMLElement>("[data-explain]").forEach((el) => {
      if (!explanations[el.dataset.explain ?? ""]) return;
      el.classList.add("explain-phrase");
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("aria-haspopup", "dialog");
      el.setAttribute("aria-expanded", "false");
    });
  }, [explanations]);

  // Place the popover under a phrase or selection (viewport rect), kept inside the content column.
  const place = useCallback((rect: Rect) => {
    const root = rootRef.current;
    if (!root) return;
    const rootRect = root.getBoundingClientRect();
    const width = Math.min(POPOVER_WIDTH, rootRect.width);
    const left = Math.min(Math.max(rect.left - rootRect.left, 0), rootRect.width - width);
    setPosition({ top: rect.bottom - rootRect.top + 10, left, width });
  }, []);

  const lastLine = (el: Element | Range): Rect => {
    const lines = el.getClientRects();
    return lines[lines.length - 1] ?? el.getBoundingClientRect();
  };

  const close = useCallback(
    (returnFocus: boolean) => {
      requestRef.current?.abort();
      if (popover?.kind === "reviewed") {
        popover.anchor.setAttribute("aria-expanded", "false");
        if (returnFocus) popover.anchor.focus({ preventScroll: true });
      }
      setPopover(null);
    },
    [popover],
  );

  const openReviewed = (anchor: HTMLElement) => {
    const entry = explanations[anchor.dataset.explain ?? ""];
    if (!entry) return;
    if (popover?.kind === "reviewed") popover.anchor.setAttribute("aria-expanded", "false");
    anchor.setAttribute("aria-expanded", "true");
    place(lastLine(anchor));
    setPopover({ kind: "reviewed", phrase: anchor.textContent ?? "", entry, anchor });
  };

  const toggle = (anchor: HTMLElement) => {
    if (popover?.kind === "reviewed" && popover.anchor === anchor) close(true);
    else openReviewed(anchor);
  };

  const phraseFrom = (target: EventTarget | null) =>
    target instanceof Element ? target.closest<HTMLElement>(".explain-phrase") : null;

  const onClick = (e: React.MouseEvent) => {
    // Let a text selection that ends on a phrase stay a selection.
    if (!window.getSelection()?.isCollapsed) return;
    const anchor = phraseFrom(e.target);
    if (anchor) toggle(anchor);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const anchor = phraseFrom(e.target);
    if (!anchor) return;
    e.preventDefault();
    toggle(anchor);
  };

  // Show the "Explain this" button above a text selection inside the case study.
  useEffect(() => {
    let timer = 0;
    const update = () => {
      const root = rootRef.current;
      const sel = window.getSelection();
      if (!root || !sel || sel.isCollapsed || sel.rangeCount === 0) return setSelectionButton(null);
      const range = sel.getRangeAt(0);
      const inside = (node: Node | null) =>
        !!node && root.contains(node) && !popRef.current?.contains(node);
      const length = sel.toString().replace(/\s+/g, " ").trim().length;
      if (!inside(range.startContainer) || !inside(range.endContainer) || length < MIN_SELECTION || length > MAX_SELECTION) {
        return setSelectionButton(null);
      }
      const rootRect = root.getBoundingClientRect();
      const first = range.getClientRects()[0] ?? range.getBoundingClientRect();
      setSelectionButton({ top: first.top - rootRect.top, left: first.left - rootRect.left, range: range.cloneRange() });
    };
    const onSelectionChange = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(update, 150);
    };
    document.addEventListener("selectionchange", onSelectionChange);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  const explainSelection = async () => {
    if (!selectionButton) return;
    const { range } = selectionButton;
    const phrase = range.toString().replace(/\s+/g, " ").trim();
    setSelectionButton(null);
    window.getSelection()?.removeAllRanges();

    // 1. A pre-written explanation wins if the selection touches its phrase.
    const marked = [...(rootRef.current?.querySelectorAll<HTMLElement>(".explain-phrase") ?? [])];
    const match = marked.find((el) => range.intersectsNode(el));
    if (match) return openReviewed(match);

    if (popover?.kind === "reviewed") popover.anchor.setAttribute("aria-expanded", "false");
    place(lastLine(range));

    // 2. Case studies under NDA never generate answers.
    if (!liveExplanations) return setPopover({ kind: "not-covered", phrase });

    // 3. Ask the server, which answers from this page only.
    requestRef.current?.abort();
    const controller = new AbortController();
    requestRef.current = controller;
    setPopover({ kind: "loading", phrase });
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, selection: phrase }),
        signal: controller.signal,
      });
      const data = (await res.json()) as ExplainApiResponse | { error: string };
      if (controller.signal.aborted) return;
      if (!res.ok || "error" in data) {
        const message = "error" in data ? data.error : "Something went wrong. Please try again.";
        return setPopover({ kind: "error", phrase, message });
      }
      if (!data.supported) return setPopover({ kind: "not-covered", phrase });
      const { supported: _, ...entry } = data;
      setPopover({ kind: "generated", phrase, entry });
    } catch {
      if (!controller.signal.aborted) {
        setPopover({ kind: "error", phrase, message: "Something went wrong. Please try again." });
      }
    }
  };

  // Move focus into the popover when it opens, and bring it into view on desktop.
  const popoverKey = popover ? `${popover.kind}:${popover.phrase}` : "";
  useLayoutEffect(() => {
    if (!popoverKey || !popRef.current) return;
    popRef.current.focus({ preventScroll: true });
    if (getComputedStyle(popRef.current).position !== "fixed") {
      popRef.current.scrollIntoView({ block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
    }
  }, [popoverKey]);

  // Esc or a click outside closes the popover; keep it placed on resize.
  useEffect(() => {
    if (!popover) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (popRef.current?.contains(target)) return;
      if (target instanceof Element && target.closest(".explain-phrase, .explain-select")) return;
      close(false);
    };
    const onResize = () => {
      if (popover.kind === "reviewed") place(lastLine(popover.anchor));
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [popover, close, place]);

  const jumpToSource = (sourceId: string) => {
    const target = document.getElementById(`src-${sourceId}`);
    close(false);
    if (!target) return;
    target.scrollIntoView({ block: "center", behavior: reducedMotion() ? "auto" : "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.classList.remove("explain-flash");
    void target.offsetWidth; // restart the animation if it's already running
    target.classList.add("explain-flash");
    window.setTimeout(() => target.classList.remove("explain-flash"), 1800);
  };

  const badge = popover && popover.kind in badges ? badges[popover.kind as keyof typeof badges] : null;
  const entry = popover?.kind === "reviewed" || popover?.kind === "generated" ? popover.entry : null;

  return (
    <div ref={rootRef} className="explain-layer" onClick={onClick} onKeyDown={onKeyDown}>
      {children}

      {selectionButton && (
        <button
          type="button"
          className="explain-select"
          style={{ top: selectionButton.top, left: selectionButton.left }}
          // Keep the text selected while pressing the button.
          onPointerDown={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
          onClick={explainSelection}
        >
          Explain this
        </button>
      )}

      {popover && (
        <>
          <div className="explain-backdrop" aria-hidden="true" />
          <div
            ref={popRef}
            className="explain-popover"
            role="dialog"
            aria-label={`Why: ${popover.phrase}`}
            aria-busy={popover.kind === "loading"}
            tabIndex={-1}
            style={
              {
                "--explain-top": `${position.top}px`,
                "--explain-left": `${position.left}px`,
                "--explain-width": `${position.width}px`,
              } as React.CSSProperties
            }
          >
            <div className="explain-head">
              {badge ? <span className={`explain-badge ${badge.className}`}>{badge.label}</span> : <span />}
              <button type="button" className="explain-close" aria-label="Close" onClick={() => close(true)}>
                ×
              </button>
            </div>

            <p className="explain-title">“{popover.phrase}”</p>

            {popover.kind === "loading" && (
              <p className="explain-status" role="status">
                Reading this page…
              </p>
            )}

            {popover.kind === "error" && (
              <p className="explain-status" role="alert">
                {popover.message}
              </p>
            )}

            {popover.kind === "not-covered" && (
              <p className="explain-status">
                This case study doesn&apos;t explain the reasoning behind that part, so I won&apos;t guess. You can ask
                Riccardo directly: <span className="explain-email">{email}</span>
              </p>
            )}

            {entry && (
              <>
                <p className="explain-label">The decision</p>
                <p>{entry.decision}</p>

                <p className="explain-label">From the case study</p>
                <figure className="explain-quote">
                  <blockquote>{entry.quote}</blockquote>
                  <figcaption>{entry.source}</figcaption>
                </figure>

                <p className="explain-label">Why it mattered</p>
                <p>{entry.why}</p>

                <p className="explain-label">Principle · General UX knowledge</p>
                <p>
                  <strong>{entry.principle}</strong> {entry.principleNote}
                </p>

                <div className="explain-foot">
                  <button type="button" className="explain-jump" onClick={() => jumpToSource(entry.sourceId)}>
                    Jump to the source ↓
                  </button>
                  <span>Answers use only this page</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
