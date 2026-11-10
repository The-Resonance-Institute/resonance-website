"use client";

import { useEffect, useRef, useState } from "react";
import type { Book } from "@/content/lookbook/aegis";

const ARC_LABEL = { main: "The main series", origins: "Origins", closing: "The closing trilogy" } as const;

export default function Shelf({ books }: { books: Book[] }) {
  const [pick, setPick] = useState<Book | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (pick && !d.open) d.showModal();
    if (!pick && d.open) d.close();
  }, [pick]);

  return (
    <>
      {(["main", "origins", "closing"] as const).map((arc) => (
        <div key={arc} className="shelf-row">
          <p className="eyebrow shelf-label">{ARC_LABEL[arc]}</p>
          <ul className="shelf">
            {books
              .filter((b) => b.arc === arc)
              .map((b) => (
                <li key={b.n}>
                  <button className="book" onClick={() => setPick(b)} aria-label={`Book ${b.n}: ${b.title}`}>
                    {b.cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={b.cover} alt="" loading="lazy" width={640} height={960} />
                    ) : (
                      <span className="book-plain">
                        <span className="book-plain-n">Book {b.n}</span>
                        <span className="book-plain-title">{b.title}</span>
                        <span className="book-plain-by">Jack Maddox</span>
                      </span>
                    )}
                    {b.cover && <span className="book-n mono">{String(b.n).padStart(2, "0")}</span>}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}

      <dialog ref={dialog} className="book-dialog" onClose={() => setPick(null)} onClick={(e) => e.target === dialog.current && setPick(null)}>
        {pick && (
          <div className="book-dialog-inner">
            {pick.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pick.cover} alt={`${pick.title} cover`} className="book-dialog-cover" />
            )}
            <div>
              <p className="eyebrow">
                Book {pick.n} · {ARC_LABEL[pick.arc]}
              </p>
              <h3 className="web-panel-name">{pick.title}</h3>
              <p className="book-tag">{pick.tagline}</p>
              <p className="web-panel-bio">{pick.hook}</p>
              {pick.argument && (
                <dl className="book-meta">
                  <dt>The argument</dt>
                  <dd>{pick.argument}</dd>
                  <dt>Antagonist</dt>
                  <dd>{pick.antagonist}</dd>
                </dl>
              )}
              <button className="btn btn-ghost" onClick={() => setPick(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
