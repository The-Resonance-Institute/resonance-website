"use client";

import { useState } from "react";
import type { Act, Beat, Motif } from "@/content/lookbook/unfinished";

const LAST_PAGE = 97;

// The film on one line, page 1 to the end. Pick an act to read its set pieces; follow a motif to light
// every place it returns.
export default function Structure({
  acts,
  beats,
  motifs,
}: {
  acts: Act[];
  beats: Beat[];
  motifs: { id: Motif; label: string }[];
}) {
  const [actId, setActId] = useState(acts[1]?.id ?? acts[0].id);
  const [motif, setMotif] = useState<Motif | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const act = acts.find((a) => a.id === actId) ?? acts[0];
  const list = beats.filter((b) => b.act === act.id);
  const pos = (page: number) => `${((page - 1) / (LAST_PAGE - 1)) * 100}%`;
  const lit = (b: Beat) => motif !== null && b.motifs.includes(motif);

  const jump = (b: Beat) => {
    setActId(b.act);
    setPicked(b.id);
    requestAnimationFrame(() => document.getElementById(`unf-beat-${b.id}`)?.focus({ preventScroll: false }));
  };

  return (
    <div className={`unf-struct ${motif ? "has-motif" : ""}`}>
      <div className="unf-struct-motifs" role="group" aria-label="Follow a motif through the film">
        <span className="mono unf-struct-follow">Follow</span>
        {motifs.map((m) => (
          <button
            key={m.id}
            className={`chip ${motif === m.id ? "chip-on" : ""}`}
            aria-pressed={motif === m.id}
            onClick={() => setMotif(motif === m.id ? null : m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="unf-track">
        <div className="unf-track-acts" role="tablist" aria-label="Acts">
          {acts.map((a) => (
            <button
              key={a.id}
              role="tab"
              aria-selected={a.id === act.id}
              className={`unf-track-act ${a.id === act.id ? "is-on" : ""}`}
              onClick={() => {
                setActId(a.id);
                setPicked(null);
              }}
            >
              <span className="unf-track-label">{a.label}</span>
              <span className="unf-track-pages mono">
                pp. {a.from}–{a.to}
              </span>
            </button>
          ))}
        </div>
        <div className="unf-track-bar">
          {acts.map((a) => (
            <span
              key={a.id}
              aria-hidden
              className={`unf-seg ${a.id === act.id ? "is-on" : ""}`}
              style={{ left: pos(a.from), width: `calc(${pos(a.to)} - ${pos(a.from)})` }}
            />
          ))}
          {beats.map((b) => (
            <button
              key={b.id}
              className={`unf-tick ${lit(b) ? "is-lit" : ""} ${b.id === picked ? "is-picked" : ""} ${b.act === act.id ? "is-act" : ""}`}
              style={{ left: pos(b.page) }}
              onClick={() => jump(b)}
              aria-label={`Page ${b.page}: ${b.title}`}
              tabIndex={-1}
            />
          ))}
        </div>
        <div className="unf-track-scale mono" aria-hidden>
          <span>Fade in</span>
          <span>The end</span>
        </div>
      </div>

      <div className="unf-act" role="tabpanel" aria-label={`${act.label}: ${act.name}`}>
        <div className="unf-act-head">
          <p className="eyebrow">
            {act.label} · pages {act.from}–{act.to}
          </p>
          <h3 className="unf-act-name">{act.name}</h3>
          <p className="body">{act.summary}</p>
        </div>
        <ol className="unf-beats">
          {list.map((b) => (
            <li
              key={b.id}
              id={`unf-beat-${b.id}`}
              tabIndex={-1}
              className={`unf-beat ${lit(b) ? "is-lit" : ""} ${motif && !lit(b) ? "is-dim" : ""} ${b.id === picked ? "is-picked" : ""}`}
            >
              <span className="unf-beat-page mono">p. {b.page}</span>
              <div>
                <h4 className="unf-beat-title">{b.title}</h4>
                <p className="unf-beat-text">{b.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="unf-act-out">{act.out}</p>
      </div>
    </div>
  );
}
