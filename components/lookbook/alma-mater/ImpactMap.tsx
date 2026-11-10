"use client";

// June's screen: helmet 089's season as dots on a skull seen from above.
// Every count and g-force comes from the scripts; dot positions are illustrative
// (seeded, so they never change), except the two hits the scripts place.
import { useEffect, useMemo, useRef, useState } from "react";
import type { ImpactStep } from "@/content/lookbook/alma-mater";

const VW = 340;
const CX = 170;
const CY = 206;
const A = 128; // half-width
const B = 172; // half-length
const P = 2.3; // superellipse exponent: blunter than an ellipse, like a cranium

// u: -1 (left) .. 1 (right); v: -1 (front, top of the drawing) .. 1 (back)
function pt(u: number, v: number): [number, number] {
  const w = 1 + 0.08 * v; // a skull from above is narrower at the brow
  const hw = A * w * Math.pow(Math.max(0, 1 - Math.pow(Math.abs(v), P)), 1 / P);
  return [CX + u * hw, CY + v * B];
}

const r1 = (n: number) => Math.round(n * 10) / 10;

function line(points: [number, number][]) {
  return points.map((p, i) => `${i ? "L" : "M"}${r1(p[0])} ${r1(p[1])}`).join(" ");
}

function outline(scale = 1) {
  const left: [number, number][] = [];
  const right: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const v = -1 + (2 * i) / 60;
    left.push(pt(-scale, v * scale));
    right.unshift(pt(scale, v * scale));
  }
  return line([...left, ...right]) + " Z";
}

// A suture: a polyline with a small alternating zigzag along it.
function suture(points: [number, number][], amp = 2.6, step = 5) {
  const out: [number, number][] = [];
  let k = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    const len = Math.hypot(x1 - x0, y1 - y0);
    const n = Math.max(1, Math.round(len / step));
    const nx = -(y1 - y0) / len;
    const ny = (x1 - x0) / len;
    for (let j = 0; j < n; j++) {
      const t = j / n;
      const s = (k++ % 2 ? 1 : -1) * amp;
      out.push([x0 + (x1 - x0) * t + nx * s, y0 + (y1 - y0) * t + ny * s]);
    }
  }
  out.push(points[points.length - 1]);
  return line(out);
}

function sample(n: number, f: (t: number) => [number, number]) {
  return Array.from({ length: n + 1 }, (_, i) => f(i / n));
}

// Deterministic PRNG so the illustrative dots are the same on every visit.
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(s: string) {
  let h = 2166136261;
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return h >>> 0;
}

const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

function dotsFor(step: ImpactStep): [number, number][] {
  const rand = rng(hash(step.id));
  const gauss = () => {
    const u = 1 - rand();
    const v = rand();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const count = step.peak ? step.hits - 1 : step.hits;
  const out: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const r = rand();
    let u: number;
    let v: number;
    if (r < 0.45) {
      u = -0.15 + gauss() * 0.32; // front
      v = -0.62 + gauss() * 0.18;
    } else if (r < 0.8) {
      u = -0.8 + gauss() * 0.13; // left side, above the ear
      v = -0.05 + gauss() * 0.28;
    } else {
      u = rand() * 1.8 - 0.9;
      v = rand() * 1.8 - 0.9;
    }
    out.push(pt(clamp(u, -0.94, 0.94), clamp(v, -0.93, 0.93)));
  }
  return out;
}

export default function ImpactMap({
  steps,
  helmet,
  wearer,
  colt,
  caption,
}: {
  steps: ImpactStep[];
  helmet: string;
  wearer: string;
  colt: string;
  caption: string;
}) {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const geo = useMemo(
    () => ({
      skull: outline(1),
      inner: [outline(0.68)],
      meridians: [-0.5, 0.5].map((u) => line(sample(30, (t) => pt(u, -1 + 2 * t)))),
      parallels: [-0.6, -0.2, 0.2, 0.6].map((v) => line(sample(24, (t) => pt(-1 + 2 * t, v)))),
      coronal: suture(sample(16, (t) => {
        const u = -0.98 + 1.96 * t;
        return pt(u, -0.44 + 0.12 * u * u);
      })),
      sagittal: suture(sample(14, (t) => pt(0, -0.44 + 1.06 * t))),
      lambdoid: suture([pt(-0.96, 0.76), pt(-0.5, 0.7), pt(0, 0.62), pt(0.5, 0.7), pt(0.96, 0.76)]),
      brow: (() => {
        const [x0, y0] = pt(-0.5, -0.9);
        const [x1, y1] = pt(0.5, -0.9);
        return `M${r1(x0)} ${r1(y0)} Q${CX} ${CY - B - 16} ${r1(x1)} ${r1(y1)}`;
      })(),
      arches: [-1, 1].map((s) => {
        const [x0, y0] = pt(s, -0.5);
        const [x1, y1] = pt(s, -0.12);
        return `M${r1(x0)} ${r1(y0)} Q${r1(x0 + s * 16)} ${r1((y0 + y1) / 2)} ${r1(x1)} ${r1(y1)}`;
      }),
      dots: steps.map(dotsFor),
      peaks: steps.map((s) => (s.peak ? pt(s.peak.u, s.peak.v) : null)),
    }),
    [steps],
  );

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setI((n) => {
        if (n >= steps.length - 1) {
          setPlaying(false);
          return n;
        }
        return n + 1;
      });
    }, 2400);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, steps.length]);

  const go = (n: number) => {
    setPlaying(false);
    setI(clamp(n, 0, steps.length - 1));
  };

  const step = steps[i];
  const max = Math.max(...steps.map((s) => s.hits));
  const onMap = steps.slice(0, i + 1).reduce((s, x) => s + x.hits, 0);
  const now = geo.dots[i];
  const peak = geo.peaks[i];
  const delay = now.length ? Math.min(28, 1100 / now.length) : 0;

  return (
    <div className="alma-mater-lab">
      <div className="alma-mater-lab-grid">
        <figure className="alma-mater-lab-skull">
          <div className="alma-mater-lab-bar mono">
            <span>Impact Lab · helmet {helmet}</span>
            <span className="alma-mater-lab-live" aria-hidden>
              &#9679; logging
            </span>
          </div>
          <svg viewBox={`0 0 ${VW} 412`} role="img" aria-label={`Map of a skull seen from above with ${onMap} hits marked, most on the front and the left side`}>
            <defs>
              <radialGradient id="alma-mater-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff5a2c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ff5a2c" stopOpacity="0" />
              </radialGradient>
              <clipPath id="alma-mater-skull-clip">
                <path d={geo.skull} />
              </clipPath>
            </defs>
            <text x={CX} y={14} textAnchor="middle" className="alma-mater-lab-axis">
              FRONT
            </text>
            <text x={14} y={CY + 4} textAnchor="middle" className="alma-mater-lab-axis">
              L
            </text>
            <text x={VW - 14} y={CY + 4} textAnchor="middle" className="alma-mater-lab-axis">
              R
            </text>
            <text x={CX} y={406} textAnchor="middle" className="alma-mater-lab-axis">
              BACK
            </text>

            <path d={geo.skull} className="alma-mater-skull" />
            <g className="alma-mater-wire">
              {geo.inner.map((d, k) => (
                <path key={`i${k}`} d={d} />
              ))}
              {geo.meridians.map((d, k) => (
                <path key={`m${k}`} d={d} />
              ))}
              {geo.parallels.map((d, k) => (
                <path key={`p${k}`} d={d} />
              ))}
            </g>
            <g className="alma-mater-suture">
              <path d={geo.coronal} />
              <path d={geo.sagittal} />
              <path d={geo.lambdoid} />
            </g>
            <g className="alma-mater-bone">
              <path d={geo.brow} />
              {geo.arches.map((d, k) => (
                <path key={k} d={d} />
              ))}
            </g>

            <g clipPath="url(#alma-mater-skull-clip)">
              {geo.dots.slice(0, i).map((ds, k) => (
                <g key={`past${k}`} className="alma-mater-dots is-past">
                  {ds.map(([x, y], j) => (
                    <circle key={j} cx={r1(x)} cy={r1(y)} r={3.4} />
                  ))}
                </g>
              ))}
              {geo.peaks.slice(0, i).map((p, k) =>
                p ? <circle key={`pp${k}`} cx={r1(p[0])} cy={r1(p[1])} r={5.5} className="alma-mater-peak is-past" /> : null,
              )}
              <g key={`now-${step.id}`} className="alma-mater-dots is-now">
                {now.map(([x, y], j) => (
                  <circle key={j} cx={r1(x)} cy={r1(y)} r={3.6} style={{ animationDelay: `${Math.round(j * delay)}ms` }} />
                ))}
              </g>
            </g>
            {peak && step.peak && (
              <g key={`peak-${step.id}`} className={`alma-mater-peak-now ${step.peak.g >= 80 ? "is-red" : ""}`}>
                <circle cx={r1(peak[0])} cy={r1(peak[1])} r={22} fill="url(#alma-mater-glow)" />
                <circle cx={r1(peak[0])} cy={r1(peak[1])} r={11} className="alma-mater-peak-ring" />
                <circle cx={r1(peak[0])} cy={r1(peak[1])} r={6.5} className="alma-mater-peak" />
                <text
                  x={r1(peak[0] + (peak[0] < CX ? 16 : -16))}
                  y={r1(peak[1] - 12)}
                  textAnchor={peak[0] < CX ? "start" : "end"}
                  className="alma-mater-peak-label"
                >
                  {step.peak.g} g
                </text>
              </g>
            )}
          </svg>
          <figcaption className="alma-mater-lab-count mono">
            <span>
              Dots on the map <b>{onMap}</b>
            </span>
            <span>{wearer}</span>
          </figcaption>
        </figure>

        <div className="alma-mater-lab-read" aria-live="polite">
          <p className="eyebrow">
            {step.when} · Episode {step.ep}
          </p>
          <h3 className="alma-mater-lab-title">{step.label}</h3>
          {step.result && <p className="alma-mater-lab-result mono">{step.result}</p>}

          <dl className="alma-mater-lab-stats">
            <div>
              <dt>Hits</dt>
              <dd>
                <span className="alma-mater-lab-n">{step.hits}</span>
                <span className="alma-mater-lab-note">{step.hitsNote}</span>
              </dd>
            </div>
            <div>
              <dt>Hardest</dt>
              <dd>
                {step.peak ? (
                  <>
                    <span className={`alma-mater-lab-n ${step.peak.g >= 80 ? "is-red" : "is-orange"}`}>{step.peak.g} g</span>
                    <span className="alma-mater-lab-note">
                      {step.peak.where}
                      {step.peak.placed === "illustrative" ? " (spot illustrative)" : ""}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="alma-mater-lab-n is-dim">&mdash;</span>
                    <span className="alma-mater-lab-note">not stated</span>
                  </>
                )}
              </dd>
            </div>
          </dl>

          <div className="alma-mater-lab-split">
            <div>
              <p className="alma-mater-lab-k mono">In the stands</p>
              <p className="alma-mater-lab-crowd">{step.crowd}</p>
            </div>
            <div>
              <p className="alma-mater-lab-k mono is-red">On her screen</p>
              <p className="alma-mater-lab-screen mono">{step.screen}</p>
            </div>
          </div>

          {step.quote && (
            <blockquote className="alma-mater-lab-quote">
              <p>&ldquo;{step.quote.text}&rdquo;</p>
              <cite className="mono">{step.quote.who}</cite>
            </blockquote>
          )}
          {step.id === "w6" && <p className="alma-mater-lab-colt">{colt}</p>}
        </div>
      </div>

      <div
        className="alma-mater-lab-strip"
        role="group"
        aria-label="Step through the season"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(i + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(i - 1);
          }
        }}
      >
        <button className="alma-mater-lab-nav" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous week">
          &larr;
        </button>
        <ol className="alma-mater-lab-weeks">
          {steps.map((s, k) => (
            <li key={s.id}>
              <button
                className={`alma-mater-lab-wk ${k === i ? "is-on" : ""} ${k < i ? "is-done" : ""} ${s.game ? "" : "is-practice"}`}
                aria-pressed={k === i}
                aria-label={`${s.label}: ${s.hits} hits${s.peak ? `, hardest ${s.peak.g} g` : ""}`}
                onClick={() => go(k)}
              >
                <span className="alma-mater-lab-col" aria-hidden>
                  <span style={{ height: `${Math.max(3, (s.hits / max) * 100)}%` }} />
                </span>
                <span className="alma-mater-lab-wk-n mono">{s.hits}</span>
                <span className="alma-mater-lab-wk-t mono">{s.tab}</span>
              </button>
            </li>
          ))}
        </ol>
        <button className="alma-mater-lab-nav" onClick={() => go(i + 1)} disabled={i === steps.length - 1} aria-label="Next week">
          &rarr;
        </button>
      </div>
      <div className="alma-mater-lab-foot">
        <button
          className="chip chip-on"
          onClick={() => {
            if (playing) return setPlaying(false);
            if (i >= steps.length - 1) setI(0);
            setPlaying(true);
          }}
          aria-pressed={playing}
        >
          {playing ? "Pause" : i >= steps.length - 1 ? "Replay the season" : "Play the season"}
        </button>
        <p className="alma-mater-lab-cap">{caption}</p>
      </div>
    </div>
  );
}
