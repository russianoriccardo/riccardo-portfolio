"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  // Direction the content slides in from.
  from?: "left" | "right" | "bottom";
  className?: string;
};

// Hides its content until it scrolls into view, then slides it in (like Framer's "appear" effect).
export default function Reveal({ children, from = "bottom", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The outer element never moves, so it can be observed even when the inner one starts off-screen.
  return (
    <div ref={ref} className={`reveal-wrap ${className}`}>
      <div className={`reveal reveal-${from}${visible ? " is-visible" : ""}`}>{children}</div>
    </div>
  );
}
