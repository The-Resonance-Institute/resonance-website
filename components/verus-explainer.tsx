"use client";

// PROJECT VERUS, MEET VERUS, 2026-10-15, on the operator's word: the robot in the hard hat is VERUS, "absolutely gold,
// the personification of VERUS", so he is in every scene. Cute and explanatory at once, text-led so it works without
// sound. Drawn here in SVG and played by the page, not a video file, so it is sharp at any size and weighs almost
// nothing. The findings, prices and percentages are the demonstration's own; the plan in scene nine illustrates the
// feature and is not a measured result.
//
// Every animated element rests in its final, visible state; the keyframes only bring it in. An animation class never
// sits on an element that has its own transform attribute (it would replace it), so movers are wrapped in a <g>.
// With reduced motion the animations are off and the scenes show as a still strip, so nothing is lost.

import { useCallback, useEffect, useRef, useState } from "react";

type Scene = { caption: string; seconds: number; dark: boolean; draw: () => React.ReactNode };
type Face = "eyes" | "happy" | "chart";
type Hold = "clipboard" | "flashlight" | "newspaper" | "magnifier" | "pointer" | "stamp" | "none";

const INK = "#1f2937";
const BLUE = "#2a78d6";
const SCREEN = "#16365f";
const HAT = "#f2b705";
const TEAL = "#0f766e";
const SANS = "ui-sans-serif, system-ui, sans-serif";

function cssVars(vars: Record<string, string>): React.CSSProperties {
  return vars as React.CSSProperties;
}

// VERUS himself: a friendly computer in a hard hat. Origin at the middle of his body's top edge.
function Robot({
  x,
  y,
  s = 1,
  face = "eyes",
  hold = "clipboard",
  wave = false,
  name = false,
}: {
  x: number;
  y: number;
  s?: number;
  face?: Face;
  hold?: Hold;
  wave?: boolean;
  name?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {hold === "flashlight" && <path d="M36 30 L170 -6 L170 86 Z" fill="#fff6c8" opacity={0.5} className="vx-beam" />}
      <ellipse cx={0} cy={62} rx={27} ry={5} fill="#000" opacity={0.18} />
      <rect x={-15} y={50} width={11} height={10} rx={3} fill="#4b5563" />
      <rect x={4} y={50} width={11} height={10} rx={3} fill="#4b5563" />
      <rect x={-22} y={4} width={44} height={48} rx={10} fill="#f4f5f7" stroke="#c9ced6" strokeWidth={2} />
      <rect x={-16} y={10} width={32} height={23} rx={5} fill={SCREEN} />
      {face === "eyes" && (
        <g>
          <rect x={-9} y={16} width={5} height={9} rx={2} fill="#7fc0ff" className="vx-eye" />
          <rect x={4} y={16} width={5} height={9} rx={2} fill="#7fc0ff" className="vx-eye" />
        </g>
      )}
      {face === "happy" && (
        <path d="M-11 24 l4 -5 l4 5 M3 24 l4 -5 l4 5" stroke="#7fc0ff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      )}
      {face === "chart" && (
        <g>
          <path d="M-13 29 H13" stroke="#3d5f8f" strokeWidth={1} />
          <path d="M-13 27 L-7 25 L-2 26 L3 13 L8 25 L13 24" stroke="#ffcf5c" strokeWidth={2.2} fill="none" strokeLinejoin="round" className="vx-trace" />
        </g>
      )}
      <rect x={-8} y={39} width={16} height={3} rx={1.5} fill={BLUE} />
      <path d="M-24 4 Q0 -22 24 4 Z" fill={HAT} stroke="#d39e00" strokeWidth={2} />
      <rect x={-28} y={2} width={56} height={5} rx={2.5} fill="#e0a800" />
      <rect x={-3} y={-14} width={6} height={10} rx={2} fill="#e0a800" />
      <g className={wave ? "vx-wave" : ""} style={{ transformOrigin: "-24px 24px" }}>
        <rect x={-36} y={20} width={14} height={7} rx={3.5} fill="#dfe3e8" stroke="#c9ced6" />
      </g>
      <rect x={22} y={20} width={12} height={7} rx={3.5} fill="#dfe3e8" stroke="#c9ced6" />
      {hold === "clipboard" && (
        <g>
          <rect x={26} y={10} width={21} height={27} rx={2} fill="#c8925a" />
          <rect x={29} y={14} width={15} height={19} rx={1} fill="#fff" />
          <path d="M31 18 h11 M31 22 h8 M31 26 h11 M31 30 h7" stroke="#9aa2ad" strokeWidth={1.4} />
        </g>
      )}
      {hold === "flashlight" && <rect x={28} y={26} width={14} height={9} rx={2} fill="#4b5563" />}
      {hold === "magnifier" && (
        <g>
          <path d="M33 26 L44 15" stroke="#6b4f2a" strokeWidth={4} strokeLinecap="round" />
          <circle cx={50} cy={9} r={10} fill="#dff3ff" fillOpacity={0.55} stroke="#4b5563" strokeWidth={3} />
        </g>
      )}
      {hold === "pointer" && <path d="M-32 23 L-74 -20" stroke="#8a5a3b" strokeWidth={3} strokeLinecap="round" />}
      {hold === "stamp" && (
        <g>
          <rect x={30} y={4} width={8} height={18} rx={3} fill="#8a5a3b" />
          <rect x={25} y={20} width={18} height={7} rx={2} fill={TEAL} />
        </g>
      )}
      {hold === "newspaper" && (
        <g>
          <rect x={-34} y={34} width={68} height={30} rx={2} fill="#f8f6ef" stroke="#cfcab8" />
          <text x={0} y={44} textAnchor="middle" fontSize={7} fontWeight={800} fill={INK} fontFamily={SANS}>
            STEEL UP 1.7%
          </text>
          <path d="M-29 50 h26 M-29 54 h22 M-29 58 h26 M4 50 h25 M4 54 h20 M4 58 h25" stroke="#b9b4a3" strokeWidth={1.4} />
        </g>
      )}
      {name && (
        <g>
          <rect x={-22} y={66} width={44} height={14} rx={3} fill="#2b3a4f" />
          <text x={0} y={76.5} textAnchor="middle" fontSize={9} fontWeight={800} fill="#fff" fontFamily={SANS} letterSpacing={1.5}>
            VERUS
          </text>
        </g>
      )}
    </g>
  );
}

// The plant manager: hard hat, hi-vis vest, coffee. Origin at the top of the head.
function PlantManager({ x, y, s = 1, mood = "happy", coffee = true }: { x: number; y: number; s?: number; mood?: "happy" | "tired" | "glad"; coffee?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30 96 Q-30 52 0 50 Q30 52 30 96 Z" fill="#2c4a74" />
      <path d="M-24 96 L-20 56 Q-10 51 -6 52 L-6 96 Z M24 96 L20 56 Q10 51 6 52 L6 96 Z" fill="#f97316" />
      <path d="M-23 70 h17 M-23 80 h17 M6 70 h17 M6 80 h17" stroke="#e5e7eb" strokeWidth={3} />
      <rect x={-6} y={50} width={12} height={8} fill="#f1c8a5" />
      <circle cx={0} cy={30} r={20} fill="#f1c8a5" />
      <path d="M-20 30 Q-21 12 0 11 Q21 12 20 30 Q17 20 0 19 Q-17 20 -20 30 Z" fill="#5a3b2a" />
      <path d="M-23 21 Q0 -6 23 21 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth={1.5} />
      <rect x={-27} y={19} width={54} height={5} rx={2.5} fill="#f1f5f9" stroke="#cbd5e1" />
      <rect x={-3} y={4} width={6} height={9} rx={2} fill="#e2e8f0" />
      {mood === "tired" ? (
        <g stroke={INK} strokeWidth={2} strokeLinecap="round" fill="none">
          <path d="M-10 32 h6 M4 32 h6" />
          <path d="M-5 43 Q0 40 5 43" />
        </g>
      ) : (
        <g>
          <circle cx={-7} cy={32} r={2.4} fill={INK} />
          <circle cx={7} cy={32} r={2.4} fill={INK} />
          <path d={mood === "glad" ? "M-8 39 Q0 48 8 39" : "M-6 40 Q0 45 6 40"} stroke={INK} strokeWidth={2.2} fill={mood === "glad" ? "#fff" : "none"} strokeLinecap="round" />
          <circle cx={-12} cy={38} r={3} fill="#f4a3a3" opacity={0.5} />
          <circle cx={12} cy={38} r={3} fill="#f4a3a3" opacity={0.5} />
        </g>
      )}
      {coffee && (
        <g>
          <rect x={22} y={66} width={14} height={16} rx={3} fill="#fff" stroke="#cbd5e1" />
          <path d="M36 70 q6 4 0 8" stroke="#cbd5e1" strokeWidth={2} fill="none" />
          <path d="M27 62 q3 -5 0 -10" stroke="#cbd5e1" strokeWidth={2} fill="none" className="vx-steam" />
        </g>
      )}
    </g>
  );
}

// The executive: suit, tie, glasses. Origin at the top of the head.
function Executive({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-32 96 Q-32 52 0 50 Q32 52 32 96 Z" fill="#1e293b" />
      <path d="M-11 51 L0 74 L11 51 Z" fill="#ffffff" />
      <path d="M-3 56 L3 56 L5 80 L0 86 L-5 80 Z" fill="#c0392b" />
      <path d="M-11 51 L-4 64 L-13 62 Z M11 51 L4 64 L13 62 Z" fill="#334155" />
      <rect x={-6} y={45} width={12} height={8} fill="#e8b996" />
      <circle cx={0} cy={28} r={19} fill="#e8b996" />
      <path d="M-19 26 Q-19 8 0 8 Q19 8 19 26 Q15 15 0 15 Q-15 15 -19 26 Z" fill="#9ca3af" />
      <g fill="none" stroke={INK} strokeWidth={1.8}>
        <circle cx={-7} cy={29} r={5} />
        <circle cx={7} cy={29} r={5} />
        <path d="M-2 29 h4" />
      </g>
      <circle cx={-7} cy={29} r={1.8} fill={INK} />
      <circle cx={7} cy={29} r={1.8} fill={INK} />
      <path d="M-6 38 Q0 43 6 38" stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round" />
    </g>
  );
}

function Stars() {
  const pts = [
    [40, 30],
    [120, 60],
    [210, 25],
    [300, 50],
    [380, 20],
    [470, 45],
    [560, 28],
    [600, 70],
    [90, 95],
    [520, 100],
  ];
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill="#fff" className="vx-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </g>
  );
}

function Clock({ x, y, text, light }: { x: number; y: number; text: string; light: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={-46} y={-16} width={92} height={32} rx={8} fill={light ? "#fff" : "#0b1830"} stroke={light ? "#d6dbe1" : "#2b4570"} />
      <text x={0} y={6} textAnchor="middle" fontSize={17} fontWeight={700} fill={light ? INK : "#9fd0ff"} fontFamily="ui-monospace, monospace">
        {text}
      </text>
    </g>
  );
}

function Plant() {
  return (
    <g>
      <rect x={60} y={190} width={380} height={110} fill="#1d2b44" />
      <path d="M60 190 L110 160 L110 190 L160 160 L160 190 L210 160 L210 190 L260 160 L260 190 Z" fill="#1d2b44" />
      <rect x={370} y={120} width={22} height={70} fill="#1d2b44" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={381} cy={110} r={10} fill="#5b6b86" opacity={0.6} className="vx-smoke" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
      {[90, 140, 190, 240, 290, 340, 390].map((x, i) => (
        <rect key={x} x={x} y={220} width={26} height={20} rx={2} fill="#ffd75e" className="vx-window" style={{ animationDelay: `${(i % 3) * 0.7}s` }} />
      ))}
    </g>
  );
}

function Cabinet({ x, y = 70, label, delay }: { x: number; y?: number; label: string; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="vx-pop" style={{ animationDelay: `${delay}s` }}>
        <rect x={0} y={0} width={64} height={110} rx={6} fill="#2a3a55" stroke="#3f5478" strokeWidth={2} />
        {[16, 34, 52, 70].map((yy, i) => (
          <g key={yy}>
            <rect x={8} y={yy} width={48} height={11} rx={2} fill="#1b2840" />
            <circle cx={49} cy={yy + 5.5} r={2.5} fill={i % 2 ? "#4ade80" : "#60a5fa"} className="vx-led" style={{ animationDelay: `${((i + x) % 5) * 0.2}s` }} />
          </g>
        ))}
        <text x={32} y={100} textAnchor="middle" fontSize={11} fontWeight={700} fill="#cbd5e1" fontFamily={SANS}>
          {label}
        </text>
      </g>
    </g>
  );
}

function Flag({ x, y, text, delay }: { x: number; y: number; text: string; delay: number }) {
  const w = text.length * 6.6 + 22;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="vx-pop" style={{ animationDelay: `${delay}s` }}>
        <line x1={0} y1={0} x2={0} y2={34} stroke="#f8fafc" strokeWidth={2} />
        <rect x={0} y={-2} width={w} height={22} rx={5} fill="#fff" stroke="#f59e0b" strokeWidth={2} />
        <circle cx={10} cy={9} r={4} fill="#f59e0b" />
        <text x={19} y={13.5} fontSize={11.5} fontWeight={600} fill={INK} fontFamily={SANS}>
          {text}
        </text>
      </g>
    </g>
  );
}

function Machine({ x, label }: { x: number; label?: string }) {
  return (
    <g transform={`translate(${x} 222)`}>
      <rect x={0} y={0} width={70} height={50} rx={5} fill="#2c3d5b" />
      <rect x={8} y={8} width={26} height={16} rx={2} fill="#1a2740" />
      <circle cx={52} cy={16} r={8} fill="#3d5580" />
      <rect x={-4} y={50} width={78} height={8} fill="#22314c" />
      {label && (
        <text x={35} y={42} textAnchor="middle" fontSize={11} fontWeight={800} fill="#cbd5e1" fontFamily={SANS}>
          {label}
        </text>
      )}
    </g>
  );
}

function Desk({ x = 140, w = 360, children }: { x?: number; w?: number; children?: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={250} width={w} height={14} rx={3} fill="#8a5a3b" />
      <rect x={x + 20} y={264} width={12} height={60} fill="#7a4d31" />
      <rect x={x + w - 32} y={264} width={12} height={60} fill="#7a4d31" />
      {children}
    </g>
  );
}

function Brief({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x={0} y={0} width={170} height={118} rx={6} fill="#fff" stroke="#d6dbe1" strokeWidth={2} />
      <text x={12} y={20} fontSize={11.5} fontWeight={800} fill={INK} fontFamily={SANS}>
        Your brief for Tuesday
      </text>
      {["4 customers below 85% on time", "Overtime up: 7 to 62 hours", "Scrap up: 9 to 17 units", "Steel up 1.7% in August"].map((t, i) => (
        <g key={t}>
          <circle cx={15} cy={39 + i * 20} r={2.6} fill={i === 3 ? TEAL : BLUE} />
          <text x={23} y={42.5 + i * 20} fontSize={9.6} fill={INK} fontFamily={SANS}>
            {t}
          </text>
        </g>
      ))}
    </g>
  );
}

const SCENES: Scene[] = [
  {
    caption: "Meet VERUS.",
    seconds: 3.5,
    dark: true,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-night)" />
        <Stars />
        <g className="vx-fade">
          <path d="M262 0 L378 0 L440 250 L200 250 Z" fill="#fff6c8" opacity={0.12} />
        </g>
        <ellipse cx={320} cy={238} rx={110} ry={12} fill="#fff6c8" opacity={0.15} />
        <g className="vx-pop" style={{ animationDelay: "0.2s" }}>
          <Robot x={320} y={86} s={2.4} face="happy" wave name />
        </g>
      </>
    ),
  },
  {
    caption: "Your plant never stops. Neither does VERUS.",
    seconds: 4,
    dark: true,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-night)" />
        <Stars />
        <circle cx={560} cy={64} r={20} fill="#f8f3d6" />
        <circle cx={552} cy={58} r={20} fill="#132447" />
        <Plant />
        <rect x={0} y={300} width={640} height={60} fill="#0b1426" />
        <g transform="translate(512 206)">
          <rect x={0} y={0} width={46} height={64} rx={5} fill="#64748b" stroke="#94a3b8" />
          <rect x={8} y={8} width={30} height={14} rx={2} fill="#0f172a" />
          <text x={23} y={19} textAnchor="middle" fontSize={9} fontWeight={700} fill="#4ade80" fontFamily="ui-monospace, monospace">
            2:00
          </text>
          <rect x={14} y={30} width={18} height={4} rx={1} fill="#0f172a" />
          <rect x={20} y={64} width={6} height={30} fill="#475569" />
        </g>
        <g className="vx-pop" style={{ animationDelay: "2.2s" }}>
          <rect x={526} y={168} width={22} height={30} rx={2} fill="#fef3c7" stroke="#d6b35a" />
          <text x={537} y={188} textAnchor="middle" fontSize={10} fontWeight={800} fill={INK} fontFamily={SANS}>
            IN
          </text>
        </g>
        <g className="vx-enter">
          <Robot x={452} y={222} s={1.25} hold="flashlight" />
        </g>
        <Clock x={90} y={56} text="2:00 AM" light={false} />
      </>
    ),
  },
  {
    caption: "It reads every system you run. Read-only.",
    seconds: 4,
    dark: true,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-night)" />
        {["ERP", "MES", "QUALITY", "HR", "CRM"].map((l, i) => (
          <Cabinet key={l} x={28 + i * 78} label={l} delay={i * 0.12} />
        ))}
        <path d="M400 150 C 440 150 460 200 500 214" stroke="#94a3b8" strokeWidth={4} fill="none" className="vx-draw" />
        <g className="vx-pop" style={{ animationDelay: "1s" }}>
          <rect x={433} y={164} width={22} height={18} rx={4} fill={HAT} />
          <path d="M437 164 v-6 a7 7 0 0 1 14 0 v6" stroke={HAT} strokeWidth={3.5} fill="none" />
          <text x={444} y={200} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#fde68a" fontFamily={SANS}>
            read-only
          </text>
        </g>
        {[60, 138, 216, 294, 372].map((sx, i) => (
          <g key={sx} transform={`translate(${sx} 120)`}>
            <g className="vx-fly" style={{ ...cssVars({ "--dx": `${520 - sx}px`, "--dy": "100px" }), animationDelay: `${1.2 + i * 0.35}s` }}>
              <rect x={-9} y={-11} width={18} height={22} rx={2} fill="#fff" stroke="#cbd2da" />
              <path d="M-5 -5 h10 M-5 0 h8 M-5 5 h10" stroke="#b6bec8" strokeWidth={1.4} />
            </g>
          </g>
        ))}
        <rect x={0} y={290} width={640} height={70} fill="#0b1426" />
        <Robot x={540} y={206} s={1.25} face="happy" hold="none" />
      </>
    ),
  },
  {
    caption: "It watches everything, all night.",
    seconds: 6,
    dark: true,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-night)" />
        <Stars />
        {[40, 180, 320, 460].map((x) => (
          <Machine key={x} x={x} />
        ))}
        <rect x={0} y={280} width={640} height={80} fill="#0b1426" />
        <g className="vx-walk">
          <Robot x={0} y={206} s={1.05} hold="flashlight" />
        </g>
        <Flag x={60} y={150} text="Scrap spike at HB03" delay={1.0} />
        <Flag x={300} y={110} text="Promise dates moved after shipping" delay={2.2} />
        <Flag x={150} y={60} text="Top customer: no call in 107 days" delay={3.4} />
        <Flag x={420} y={168} text="PMs falling behind" delay={4.4} />
      </>
    ),
  },
  {
    caption: "It finds what's wrong, and where the money is.",
    seconds: 4,
    dark: true,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-night)" />
        <rect x={0} y={280} width={640} height={80} fill="#0b1426" />
        <Machine x={150} label="HB03" />
        <g className="vx-pop" style={{ animationDelay: "0.4s" }}>
          <Robot x={330} y={150} s={1.9} face="chart" hold="magnifier" />
        </g>
        <g className="vx-pop" style={{ animationDelay: "1.4s" }}>
          <rect x={400} y={60} width={210} height={64} rx={8} fill="#fff" stroke="#f59e0b" strokeWidth={2.5} />
          <text x={414} y={84} fontSize={12.5} fontWeight={800} fill={INK} fontFamily={SANS}>
            HB03 scrap, March
          </text>
          <text x={414} y={106} fontSize={12} fill={INK} fontFamily={SANS}>
            $24,421 against a usual $10,705
          </text>
        </g>
      </>
    ),
  },
  {
    caption: "It reads the market, too.",
    seconds: 4,
    dark: false,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-dawn)" />
        <rect x={430} y={44} width={150} height={104} rx={6} fill="#fbd9a6" stroke="#c9a06a" strokeWidth={4} />
        <rect x={438} y={52} width={63} height={88} rx={2} fill="#ffe9c7" />
        <rect x={509} y={52} width={63} height={88} rx={2} fill="#ffe9c7" />
        <line x1={505} y1={44} x2={505} y2={148} stroke="#c9a06a" strokeWidth={4} />
        <rect x={0} y={300} width={640} height={60} fill="#e7dccb" />
        <g className="vx-pop" style={{ animationDelay: "0.2s" }}>
          <Robot x={250} y={156} s={2.2} face="eyes" hold="newspaper" />
        </g>
        <g className="vx-pop" style={{ animationDelay: "1.4s" }}>
          <rect x={420} y={190} width={170} height={58} rx={8} fill="#fff" stroke="#d6dbe1" strokeWidth={2} />
          <text x={434} y={213} fontSize={12} fontWeight={700} fill={INK} fontFamily={SANS}>
            Steel mill products +1.7%
          </text>
          <text x={434} y={234} fontSize={12} fontWeight={700} fill={INK} fontFamily={SANS}>
            Plastic resins -1.0%
          </text>
        </g>
      </>
    ),
  },
  {
    caption: "One page by six.",
    seconds: 6.5,
    dark: false,
    draw: () => (
      <>
        <defs>
          <clipPath id="vx-crane-clip">
            <rect x={0} y={44} width={640} height={320} />
          </clipPath>
        </defs>
        <rect width={640} height={360} fill="url(#vx-sunrise)" />
        <circle cx={590} cy={300} r={56} fill="#ffd27a" opacity={0.9} className="vx-rise" />
        <rect x={150} y={30} width={14} height={222} fill="#f2b705" />
        <rect x={430} y={30} width={14} height={222} fill="#f2b705" />
        <rect x={140} y={26} width={314} height={18} rx={3} fill="#e0a800" />
        <path d="M150 44 l12 -18 M176 44 l12 -18 M202 44 l12 -18 M228 44 l12 -18 M254 44 l12 -18 M280 44 l12 -18 M306 44 l12 -18 M332 44 l12 -18 M358 44 l12 -18 M384 44 l12 -18 M410 44 l12 -18" stroke="#1f2937" strokeWidth={2} opacity={0.35} />
        <rect x={282} y={40} width={38} height={14} rx={3} fill="#4b5563" />
        <g clipPath="url(#vx-crane-clip)">
          <g className="vx-crane">
            <line x1={301} y1={-300} x2={301} y2={118} stroke="#374151" strokeWidth={2} />
            <path d="M293 118 h16 l-3 8 h-10 Z" fill="#6b7280" />
            <Brief x={216} y={126} />
          </g>
        </g>
        <Desk x={180} w={250} />
        <g className="vx-fade" style={{ animationDelay: "2.6s" }}>
          <PlantManager x={110} y={150} s={1.15} mood="glad" />
        </g>
        <g transform="translate(500 214)">
          <rect x={0} y={0} width={34} height={44} rx={4} fill="#475569" />
          <rect x={6} y={8} width={22} height={8} rx={2} fill="#4ade80" opacity={0.85} />
          <path d="M17 0 L22 -16" stroke="#1f2937" strokeWidth={3} strokeLinecap="round" />
          <circle cx={22} cy={-17} r={4} fill="#dc2626" />
        </g>
        <Robot x={575} y={196} s={1.1} face="happy" hold="none" />
        <Clock x={80} y={48} text="6:00 AM" light />
      </>
    ),
  },
  {
    caption: "Every plant. Every company. One version of the truth.",
    seconds: 4.5,
    dark: false,
    draw: () => (
      <>
        <rect width={640} height={360} fill="#eef2f7" />
        <rect x={0} y={280} width={640} height={80} fill="#d9e0ea" />
        <rect x={230} y={40} width={300} height={170} rx={8} fill="#fff" stroke="#cbd5e1" strokeWidth={2} />
        <text x={250} y={66} fontSize={13} fontWeight={800} fill={INK} fontFamily={SANS}>
          On time, last month
        </text>
        {[
          { label: "Alpha (US)", v: 0.704, c: BLUE },
          { label: "Beta (Canada)", v: 0.66, c: "#eb6834" },
        ].map((b, i) => (
          <g key={b.label}>
            <text x={250} y={100 + i * 50} fontSize={11.5} fill={INK} fontFamily={SANS}>
              {b.label}
            </text>
            <rect x={345} y={88 + i * 50} width={150} height={16} rx={4} fill="#eef2f7" />
            <g className="vx-grow" style={{ animationDelay: `${0.5 + i * 0.4}s` }}>
              <rect x={345} y={88 + i * 50} width={150 * b.v} height={16} rx={4} fill={b.c} />
            </g>
            <text x={345 + 150 * b.v + 6} y={101 + i * 50} fontSize={11.5} fontWeight={700} fill={INK} fontFamily={SANS}>
              {(b.v * 100).toFixed(1)}%
            </text>
          </g>
        ))}
        <rect x={60} y={206} width={210} height={14} rx={3} fill="#8a5a3b" />
        <rect x={76} y={220} width={10} height={60} fill="#7a4d31" />
        <rect x={244} y={220} width={10} height={60} fill="#7a4d31" />
        <Executive x={160} y={108} s={1.1} />
        <rect x={112} y={196} width={60} height={12} rx={2} fill="#334155" />
        <Robot x={590} y={190} s={1.25} face="eyes" hold="pointer" />
      </>
    ),
  },
  {
    caption: "And it checks the fix worked.",
    seconds: 4,
    dark: false,
    draw: () => (
      <>
        <rect width={640} height={360} fill="#eaf3fb" />
        <rect x={200} y={44} width={250} height={220} rx={10} fill="#fff" stroke="#d6dbe1" strokeWidth={2} />
        <text x={220} y={74} fontSize={13.5} fontWeight={800} fill={INK} fontFamily={SANS}>
          Plan: recover on-time delivery
        </text>
        {[
          ["Review every late line", "Scheduling, this week"],
          ["Confirm promise dates", "Sales, by Friday"],
          ["Judged on its review date", "Back to 85%?"],
        ].map(([a, b], i) => (
          <g key={a}>
            <rect x={220} y={92 + i * 46} width={18} height={18} rx={4} fill="#fff" stroke="#9aa2ad" strokeWidth={2} />
            <path d={`M224 ${102 + i * 46} l4 4 l8 -9`} stroke={TEAL} strokeWidth={3} fill="none" className="vx-tick" style={{ animationDelay: `${0.6 + i * 0.4}s` }} />
            <text x={248} y={105 + i * 46} fontSize={12.5} fontWeight={600} fill={INK} fontFamily={SANS}>
              {a}
            </text>
            <text x={248} y={121 + i * 46} fontSize={11} fill="#5b6472" fontFamily={SANS}>
              {b}
            </text>
          </g>
        ))}
        <g className="vx-stamp">
          <circle cx={410} cy={232} r={30} fill={TEAL} />
          <path d="M396 232 l9 9 l18 -20" stroke="#fff" strokeWidth={5.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <PlantManager x={110} y={150} s={1.15} mood="glad" coffee={false} />
        <g className="vx-thumb">
          <path d="M146 220 v-14 q0 -6 6 -6 v14" fill="#f1c8a5" stroke="#d9a982" />
        </g>
        <g className="vx-bob">
          <Robot x={520} y={180} s={1.3} face="happy" hold="stamp" />
        </g>
      </>
    ),
  },
  {
    caption: "The truth about your operation, around the clock.",
    seconds: 4.5,
    dark: true,
    // the logo, Chris's own design (2026-10-15); its navy ground is the scene's, so it sits in it without a frame
    draw: () => (
      <>
        <defs>
          <radialGradient id="vx-logo-ground" cx="0.5" cy="0.42" r="0.75">
            <stop offset="0" stopColor="#172234" />
            <stop offset="1" stopColor="#0d1625" />
          </radialGradient>
          <radialGradient id="vx-logo-fade" cx="0.5" cy="0.5" r="0.62">
            <stop offset="0.6" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="vx-logo-mask">
            <rect x={170} y={30} width={420} height={235} fill="url(#vx-logo-fade)" />
          </mask>
        </defs>
        <rect width={640} height={360} fill="url(#vx-logo-ground)" />
        <image href="/verus/verus-logo.jpg" x={170} y={30} width={420} height={235} mask="url(#vx-logo-mask)" className="vx-fade" />
        <g className="vx-bob">
          <Robot x={100} y={150} s={1.5} face="happy" hold="none" wave />
        </g>
      </>
    ),
  },
];

const TOTAL = SCENES.reduce((a, s) => a + s.seconds, 0);
const STARTS = SCENES.reduce<number[]>((acc, s, i) => [...acc, i ? acc[i - 1] + SCENES[i - 1].seconds : 0], []);
export const EXPLAINER_SECONDS = Math.round(TOTAL);

function Defs() {
  return (
    <defs>
      <linearGradient id="vx-night" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0b1a36" />
        <stop offset="1" stopColor="#1c3461" />
      </linearGradient>
      <linearGradient id="vx-dawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#dfe8f5" />
        <stop offset="1" stopColor="#f6efe4" />
      </linearGradient>
      <linearGradient id="vx-sunrise" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#a9cdf2" />
        <stop offset="1" stopColor="#ffe3b8" />
      </linearGradient>
    </defs>
  );
}

const CSS = `
.vx-stage *{animation-fill-mode:both!important}
.vx-pop{animation:vx-pop .5s cubic-bezier(.2,1.4,.4,1);transform-box:fill-box;transform-origin:center}
@keyframes vx-pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
.vx-fade{animation:vx-fade .8s ease-out}
@keyframes vx-fade{from{opacity:0}to{opacity:1}}
.vx-enter{animation:vx-enter 2s cubic-bezier(.2,.9,.3,1)}
@keyframes vx-enter{from{transform:translateX(-520px)}to{transform:translateX(0)}}
.vx-walk{animation:vx-walk 6s linear;transform:translateX(560px)}
@keyframes vx-walk{from{transform:translateX(-60px)}to{transform:translateX(560px)}}
.vx-fly{animation:vx-fly 1.1s ease-in;opacity:0}
@keyframes vx-fly{0%{opacity:1;transform:translate(0,0) rotate(0)}85%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(30deg) scale(.4)}}
.vx-crane{animation:vx-crane 2.4s cubic-bezier(.3,.7,.3,1) .5s}
@keyframes vx-crane{from{transform:translateY(-170px)}to{transform:none}}
.vx-grow{animation:vx-grow .9s ease-out;transform-box:fill-box;transform-origin:left center}
@keyframes vx-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.vx-stamp{animation:vx-stamp .45s cubic-bezier(.2,1.6,.4,1) 2.2s;transform-box:fill-box;transform-origin:center}
@keyframes vx-stamp{from{opacity:0;transform:scale(2.4)}to{opacity:1;transform:scale(1)}}
.vx-thumb{animation:vx-pop .5s cubic-bezier(.2,1.4,.4,1) 2.8s;transform-box:fill-box;transform-origin:center}
.vx-tick{stroke-dasharray:24;animation:vx-tick .35s ease-out}
@keyframes vx-tick{from{stroke-dashoffset:24}to{stroke-dashoffset:0}}
.vx-trace{stroke-dasharray:60;animation:vx-trace 1.2s ease-out .6s}
@keyframes vx-trace{from{stroke-dashoffset:60}to{stroke-dashoffset:0}}
.vx-draw{stroke-dasharray:200;animation:vx-draw 1s ease-out .4s}
@keyframes vx-draw{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}
.vx-rise{animation:vx-rise 5s ease-out}
@keyframes vx-rise{from{transform:translateY(60px)}to{transform:none}}
.vx-bob{animation:vx-bob 2.4s ease-in-out infinite}
@keyframes vx-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.vx-wave{animation:vx-wave .5s ease-in-out 6 alternate}
@keyframes vx-wave{from{transform:rotate(0)}to{transform:rotate(-55deg)}}
.vx-twinkle{animation:vx-twinkle 1.8s ease-in-out infinite alternate}
@keyframes vx-twinkle{from{opacity:.25}to{opacity:1}}
.vx-window{animation:vx-window 2.2s steps(2) infinite}
@keyframes vx-window{0%{opacity:1}50%{opacity:.55}}
.vx-led{animation:vx-led 1s steps(2) infinite}
@keyframes vx-led{0%{opacity:1}50%{opacity:.2}}
.vx-smoke{animation:vx-smoke 2.7s ease-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes vx-smoke{from{opacity:.6;transform:translate(0,0) scale(.6)}to{opacity:0;transform:translate(14px,-40px) scale(1.6)}}
.vx-steam{animation:vx-fade 1.2s ease-in-out infinite alternate}
.vx-eye{animation:vx-blink 3.2s infinite;transform-box:fill-box;transform-origin:center}
@keyframes vx-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
.vx-beam{animation:vx-beam 1.4s ease-in-out infinite alternate}
@keyframes vx-beam{from{opacity:.35}to{opacity:.6}}
.vx-caption{animation:vx-caption .5s ease-out}
@keyframes vx-caption{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.vx-stage *,.vx-caption{animation:none!important}.vx-walk{transform:translateX(250px)}}
`;

function Frame({ scene, still = false }: { scene: Scene; still?: boolean }) {
  return (
    <div className={`vx-stage relative overflow-hidden ${still ? "rounded-lg border border-line" : ""}`}>
      <svg viewBox="0 0 640 360" className="block h-auto w-full" aria-hidden="true">
        <Defs />
        {scene.draw()}
      </svg>
      <p
        className={`vx-caption pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-[4%] pt-8 text-center font-serif leading-tight ${
          still ? "text-sm" : "text-[clamp(1rem,3.6vw,1.9rem)]"
        } ${scene.dark ? "bg-gradient-to-t from-black/50 to-transparent text-white" : "bg-gradient-to-t from-white/85 to-transparent text-ink"}`}
      >
        {scene.caption}
      </p>
    </div>
  );
}

export function VerusExplainer() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [started, setStarted] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const last = useRef<number | null>(null);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(m.matches);
    set();
    m.addEventListener("change", set);
    return () => m.removeEventListener("change", set);
  }, []);

  // starts the first time it is on screen, once
  useEffect(() => {
    const el = box.current;
    if (!el || started) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setStarted(true);
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!playing) {
      last.current = null;
      return;
    }
    let raf = 0;
    const step = (now: number) => {
      if (last.current !== null) {
        const dt = (now - last.current) / 1000;
        setT((v) => {
          const n = v + dt;
          if (n >= TOTAL) {
            setPlaying(false);
            return TOTAL - 0.001;
          }
          return n;
        });
      }
      last.current = now;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  let index = 0;
  STARTS.forEach((s, i) => {
    if (t >= s) index = i;
  });
  const replay = useCallback(() => {
    setT(0);
    setPlaying(true);
  }, []);
  const ended = !playing && t >= TOTAL - 0.01;

  if (reduced) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <style>{CSS}</style>
        {SCENES.map((s) => (
          <Frame key={s.caption} scene={s} still />
        ))}
      </div>
    );
  }

  return (
    <div ref={box} className="grid gap-3">
      <style>{CSS}</style>
      <div className="overflow-hidden rounded-2xl border border-line bg-[#0b1a36] shadow-sm">
        <Frame key={`${index}-${started ? "on" : "off"}-${t < 0.05 ? "r" : ""}`} scene={SCENES[index]} />
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => (ended ? replay() : setPlaying((p) => !p))}
          className="inline-flex min-w-[5.5rem] items-center justify-center rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {ended ? "Replay" : playing ? "Pause" : "Play"}
        </button>
        <div className="flex flex-1 gap-1" aria-hidden="true">
          {SCENES.map((s, i) => {
            const done = i < index ? 1 : i > index ? 0 : Math.min(1, (t - STARTS[i]) / s.seconds);
            return (
              <div key={s.caption} className="h-1.5 flex-1 overflow-hidden rounded-full bg-line" style={{ flexGrow: s.seconds }}>
                <div className="h-full rounded-full bg-accent" style={{ width: `${done * 100}%` }} />
              </div>
            );
          })}
        </div>
        <span className="w-10 text-right text-xs tabular-nums text-muted">{Math.round(TOTAL - t)}s</span>
      </div>
      <details className="text-sm text-muted">
        <summary className="cursor-pointer py-1">Read it as text</summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {SCENES.map((s) => (
            <li key={s.caption}>{s.caption}</li>
          ))}
        </ol>
      </details>
    </div>
  );
}
