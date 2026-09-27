"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ProjectExplanations } from "@/content/explanations";

type Props = {
  explanations: ProjectExplanations;
  children: React.ReactNode;
};

type OpenState = { id: string; phrase: string; anchor: HTMLElement };

const POPOVER_WIDTH = 440;
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Wraps case study content. Phrases marked with <span data-explain="ID"> in content/site.ts become
// buttons that open a popover explaining the decision, using entries from content/explanations.ts.
export default function ExplainLayer({ explanations, children }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<OpenState | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, width: POPOVER_WIDTH });

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

  // Place the popover under the phrase, kept inside the content column.
  const place = useCallback((anchor: HTMLElement) => {
    const root = rootRef.current;
    if (!root) return;
    const rootRect = root.getBoundingClientRect();
    const lines = anchor.getClientRects();
    const line = lines[lines.length - 1] ?? anchor.getBoundingClientRect();
    const width = Math.min(POPOVER_WIDTH, rootRect.width);
    const left = Math.min(Math.max(line.left - rootRect.left, 0), rootRect.width - width);
    setPosition({ top: line.bottom - rootRect.top + 10, left, width });
  }, []);

  const close = useCallback(
    (returnFocus: boolean) => {
      if (!open) return;
      open.anchor.setAttribute("aria-expanded", "false");
      setOpen(null);
      if (returnFocus) open.anchor.focus({ preventScroll: true });
    },
    [open],
  );

  const toggle = (anchor: HTMLElement) => {
    const id = anchor.dataset.explain ?? "";
    if (open?.anchor === anchor) return close(true);
    open?.anchor.setAttribute("aria-expanded", "false");
    anchor.setAttribute("aria-expanded", "true");
    place(anchor);
    setOpen({ id, phrase: anchor.textContent ?? "", anchor });
  };

  const phraseFrom = (target: EventTarget) =>
    (target as HTMLElement).closest<HTMLElement>(".explain-phrase") ?? null;

  const onClick = (e: React.MouseEvent) => {
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

  // Move focus into the popover when it opens, and bring it into view on desktop.
  useLayoutEffect(() => {
    if (!open || !popRef.current) return;
    popRef.current.focus({ preventScroll: true });
    if (getComputedStyle(popRef.current).position !== "fixed") {
      popRef.current.scrollIntoView({ block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
    }
  }, [open]);

  // Esc or a click outside closes the popover; keep it placed on resize.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (popRef.current?.contains(target) || open.anchor.contains(target)) return;
      if (phraseFrom(target)) return; // another phrase: its click handler switches the popover
      close(false);
    };
    const onResize = () => place(open.anchor);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close, place]);

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

  const entry = open ? explanations[open.id] : undefined;

  return (
    <div ref={rootRef} className="explain-layer" onClick={onClick} onKeyDown={onKeyDown}>
      {children}

      {open && entry && (
        <>
          <div className="explain-backdrop" aria-hidden="true" />
          <div
            ref={popRef}
            className="explain-popover"
            role="dialog"
            aria-label={`Why: ${open.phrase}`}
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
              <span className="explain-badge explain-badge-reviewed">Reviewed by Riccardo</span>
              <button type="button" className="explain-close" aria-label="Close" onClick={() => close(true)}>
                ×
              </button>
            </div>

            <p className="explain-title">“{open.phrase}”</p>

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
          </div>
        </>
      )}
    </div>
  );
}
