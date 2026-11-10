"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MemoryPart } from "@/content/lookbook/unfinished";

type Phase = "raw" | "softening" | "soft" | "pocket";
type BirdMark = "rough" | "feathered" | "half";

type Props = {
  memory: MemoryPart[][];
  offer: string;
  refusal: string;
  which: string;
  settled: string;
  pocketLine: string;
  after: string;
  birds: { id: string; raw: string; mark: BirdMark }[];
};

const STEP_MS = 520;

// A memory the reader can soften, once. It cannot be given back; the pocket returns some of it.
export default function Softening({ memory, offer, refusal, which, settled, pocketLine, after, birds }: Props) {
  const [phase, setPhase] = useState<Phase>("raw");
  const [count, setCount] = useState(0);
  const [voice, setVoice] = useState<string>(offer);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Index every charged span in reading order.
  const total = useMemo(() => memory.flat().filter((p) => typeof p !== "string").length, [memory]);

  useEffect(() => () => {
    if (timer.current) clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (phase === "softening" && count >= total) {
      if (timer.current) clearInterval(timer.current);
      setPhase("soft");
      setVoice(settled);
    }
  }, [count, phase, total, settled]);

  const soften = () => {
    if (phase !== "raw") return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setVoice("");
    if (reduce) {
      setCount(total);
      setPhase("soft");
      setVoice(settled);
      return;
    }
    setPhase("softening");
    setCount(0);
    timer.current = setInterval(() => setCount((c) => c + 1), STEP_MS);
  };

  const giveBack = () => setVoice(refusal);
  const askWhich = () => setVoice(which);
  const sitTogether = () => {
    setPhase("pocket");
    setVoice("");
  };

  const isSoft = phase === "soft" || phase === "pocket";
  let k = -1;

  return (
    <div className={`unf-soft is-${phase}`}>
      <div className="unf-hum" aria-hidden>
        <span className="unf-hum-label mono">the hum</span>
        <span className="unf-hum-line" />
      </div>

      <div className="unf-memory" aria-label="A memory of Miriam">
        {memory.map((para, pi) => (
          <p key={pi}>
            {para.map((part, i) => {
              if (typeof part === "string") return <span key={i}>{part}</span>;
              k += 1;
              const idx = k;
              let state: "raw" | "going" | "soft" | "returned" = "raw";
              if (phase === "softening") state = idx < count ? "soft" : idx === count ? "going" : "raw";
              else if (phase === "soft") state = "soft";
              else if (phase === "pocket") state = part.returns ? "returned" : "soft";
              const text = state === "soft" ? part.soft : part.raw;
              return (
                <span key={`${i}-${state === "going" ? "raw" : state}`} className={`unf-span is-${state}`}>
                  {text}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      <figure className="unf-birds">
        <ul aria-label={isSoft ? "Three carved birds. They look the same." : "Three carved birds on Elias's shelf"}>
          {birds.map((b) => (
            <li key={b.id}>
              <Bird mark={phase === "raw" || phase === "softening" ? b.mark : null} />
              <span className="unf-bird-label mono">{isSoft ? "A bird" : b.raw}</span>
            </li>
          ))}
        </ul>
      </figure>

      <div className="unf-voice" role="status" aria-live="polite">
        {voice && (
          <>
            <span className="unf-voice-who mono">The voice</span>
            <span className="unf-voice-text">{voice}</span>
          </>
        )}
        {phase === "softening" && <span className="unf-voice-text unf-voice-quiet">Just the edges.</span>}
        {phase === "pocket" && <span className="unf-voice-text unf-voice-room">{pocketLine}</span>}
      </div>

      <div className="unf-soft-actions">
        {phase === "raw" && (
          <button className="btn unf-btn-honey" onClick={soften}>
            Soften the edges
          </button>
        )}
        {phase === "soft" && (
          <>
            <button className="btn btn-ghost unf-btn-ash" onClick={giveBack}>
              Give it back
            </button>
            <button className="btn btn-ghost unf-btn-ash" onClick={askWhich}>
              Which one is from the oak?
            </button>
            <button className="btn unf-btn-frost" onClick={sitTogether}>
              Sit in the Quiet Room
            </button>
          </>
        )}
        {phase === "pocket" && <p className="unf-soft-after mono">{after}</p>}
      </div>
    </div>
  );
}

// A small carved songbird, facing left. Marks make each bird its own; softened, they're all the same.
function Bird({ mark }: { mark: BirdMark | null }) {
  return (
    <svg viewBox="0 0 120 70" className={`unf-bird ${mark ? `is-${mark}` : "is-smooth"}`} aria-hidden>
      {mark === "half" ? (
        <>
          <path className="unf-bird-body" d="M12 36 L26 32 C30 22 44 18 52 24 C56 27 58 31 64 33 L68 50 C60 56 42 58 31 50 C25 45 25 40 27 38 Z" />
          <path className="unf-bird-block" d="M64 33 L108 26 L111 52 L68 50 Z" />
          <path className="unf-bird-cut" d="M74 34 L78 50 M84 32 L88 50 M94 30 L98 51 M104 28 L106 51" />
          <path className="unf-bird-wing" d="M46 37 C54 33 62 33 66 35 C62 41 54 44 48 44 Z" />
        </>
      ) : (
        <>
          <path className="unf-bird-body" d="M12 36 L26 32 C30 22 44 18 52 24 C56 27 58 31 64 33 L106 26 L102 36 L108 43 L70 48 C60 56 42 58 31 50 C25 45 25 40 27 38 Z" />
          <path className="unf-bird-wing" d="M46 37 C58 31 78 31 92 36 C82 43 62 46 48 44 Z" />
          {mark === "rough" && <path className="unf-bird-cut" d="M84 35 L90 32 L88 37 L95 35 L90 40 L94 42" />}
          {mark === "feathered" && <path className="unf-bird-cut" d="M54 40 L66 36 M60 43 L74 38 M68 44 L82 39 M98 30 L104 29 M99 34 L104 33" />}
        </>
      )}
      <circle className="unf-bird-eye" cx="40" cy="29" r={mark === "feathered" ? 2.4 : 1.8} />
    </svg>
  );
}
