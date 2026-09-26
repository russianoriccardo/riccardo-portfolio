"use client";

import Image from "next/image";
import { useState } from "react";
import type { Img } from "@/content/site";

// Before/after image slider, like the one on the Framer site.
export default function Compare({ before, after, sizes }: { before: Img; after: Img; sizes: string }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="compare">
      <Image src={after.src} alt="After" fill sizes={sizes} />
      <div className="compare-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={before.src} alt="Before" fill sizes={sizes} />
      </div>
      <div className="compare-handle" style={{ left: `${position}%` }} aria-hidden="true">
        <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <span className="compare-label compare-label-before">Before</span>
      <span className="compare-label compare-label-after">After</span>
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-label="Drag to compare before and after"
      />
    </div>
  );
}
