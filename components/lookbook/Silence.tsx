"use client";

import { useEffect, useRef, useState } from "react";

// A waveform that goes flat when it scrolls into view, then can be toggled.
export default function Silence() {
  const ref = useRef<HTMLDivElement>(null);
  const [silent, setSilent] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setSilent(true), 900);
          io.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const bars = Array.from({ length: 64 }, (_, i) => {
    const h = 0.25 + 0.75 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17 + 1));
    return Math.round(h * 100);
  });

  return (
    <div ref={ref} className={`silence ${silent ? "is-silent" : ""}`}>
      <div className="wave" aria-hidden>
        {bars.map((h, i) => (
          <span key={i} style={{ ["--h" as string]: `${h}%`, transitionDelay: `${i * 12}ms` }} />
        ))}
      </div>
      <button className="chip chip-on silence-toggle" onClick={() => setSilent((s) => !s)} aria-pressed={silent}>
        {silent ? "Sound back on" : "Take the sound"}
      </button>
    </div>
  );
}
