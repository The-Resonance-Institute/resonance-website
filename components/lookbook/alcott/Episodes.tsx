"use client";

// Adapted from components/Episodes.tsx for The Alcott. Only the pilot is written, so each
// row shows its comic engine instead of a page count, and 101 is marked as written.
// Links to #ep-NNN (from the building) open the matching episode.

import { useEffect, useState } from "react";
import type { Episode } from "@/content/lookbook/alcott";

export default function Episodes({ episodes }: { episodes: Episode[] }) {
  const [open, setOpen] = useState<string | null>("101");

  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#ep-(\d{3})$/);
      if (m) setOpen(m[1]);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const written = episodes.filter((e) => e.written);

  return (
    <div className="eps">
      <ol className="eps-list">
        {episodes.map((e) => {
          const isOpen = open === e.n;
          return (
            <li key={e.n} id={`ep-${e.n}`} className={`ep alcott-ep ${isOpen ? "is-open" : ""} ${e.written ? "is-written" : ""}`}>
              <button className="ep-head alcott-ep-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : e.n)}>
                <span className="ep-n mono">{e.n}</span>
                <span className="alcott-ep-main">
                  <span className="ep-title">
                    {e.title}
                    {e.tag && <span className="alcott-ep-tag mono">{e.tag}</span>}
                  </span>
                  <span className="alcott-ep-engine">{e.engine}</span>
                </span>
                <span className={`alcott-ep-status mono ${e.written ? "is-written" : ""}`}>
                  {e.written ? `Written · ${e.pages} pp` : "Mapped"}
                </span>
              </button>
              <div className="ep-body" hidden={!isOpen}>
                <p>{e.summary}</p>
                {e.notes && (
                  <dl className="alcott-ep-notes">
                    {e.notes.map((n) => (
                      <div key={n.k}>
                        <dt className="mono">{n.k}</dt>
                        <dd>{n.v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="eps-total mono">
        {episodes.length} episodes · {written.length === 1 ? "the pilot written" : `${written.length} written`}, the rest mapped with a comic engine each
      </p>
    </div>
  );
}
