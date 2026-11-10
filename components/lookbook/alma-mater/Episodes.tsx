"use client";

// A copy of the shared Episodes list with a project-specific footer, a "when" line,
// and links like #ep-106 (from the schedule) opening the matching episode.
import { useEffect, useState } from "react";
import type { AmEpisode } from "@/content/lookbook/alma-mater";

export default function Episodes({ episodes, note }: { episodes: AmEpisode[]; note: string }) {
  const [open, setOpen] = useState<string | null>(episodes[0]?.n ?? null);
  const total = episodes.reduce((s, e) => s + e.pages, 0);
  const max = Math.max(...episodes.map((e) => e.pages));

  useEffect(() => {
    const sync = () => {
      const m = /^#ep-(\d{3})$/.exec(window.location.hash);
      if (m && episodes.some((e) => e.n === m[1])) setOpen(m[1]);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [episodes]);

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
                <p className="alma-mater-ep-when mono">{e.when}</p>
                <p>{e.summary}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="eps-total mono">
        {episodes.length} episodes · {total} pages · {note}
      </p>
    </div>
  );
}
