"use client";

import { useState } from "react";
import type { Episode } from "@/content/lookbook/aegis";

export default function Episodes({ episodes }: { episodes: Episode[] }) {
  const [open, setOpen] = useState<string | null>("101");
  const total = episodes.reduce((s, e) => s + e.pages, 0);
  const max = Math.max(...episodes.map((e) => e.pages));

  return (
    <div className="eps">
      <ol className="eps-list">
        {episodes.map((e) => {
          const isOpen = open === e.n;
          return (
            <li key={e.n} id={`ep-${e.n}`} className={`ep ${isOpen ? "is-open" : ""}`}>
              <button className="ep-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : e.n)}>
                <span className="ep-n mono">{e.n}</span>
                <span className="ep-title">{e.title}</span>
                <span className="ep-bar" aria-hidden>
                  <span style={{ width: `${(e.pages / max) * 100}%` }} />
                </span>
                <span className="ep-pages mono">{e.pages} pp</span>
              </button>
              <div className="ep-body" hidden={!isOpen}>
                <p>{e.summary}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="eps-total mono">
        {episodes.length} episodes · {total} pages · teaser plus five acts, the finale six
      </p>
    </div>
  );
}
