"use client";

// PROJECT VERUS, THE 35-SECOND VERSION, 2026-10-15, on the operator's word: an explainer that is cute and explanatory
// at once, text-led so it works without sound. Drawn here in SVG and played by the page, not a video file, so it is
// sharp at any size and weighs almost nothing. The flags in scene five are the demonstration's own findings; the
// plan in scene seven is an illustration of the feature, not a measured result.
//
// Every animated element rests in its final, visible state; the keyframes only bring it in. With reduced motion the
// animations are off and the eight scenes show as a still strip, so nothing is lost.

import { useCallback, useEffect, useRef, useState } from "react";

type Scene = {
  caption: string;
  seconds: number;
  dark: boolean;
  draw: () => React.ReactNode;
};

const INK = "#1f2937";
const BLUE = "#2a78d6";
const SCREEN = "#16365f";
const HAT = "#f2b705";
const TEAL = "#0f766e";

function Robot({
  x,
  y,
  s = 1,
  clipboard = true,
  flashlight = false,
  wave = false,
  className = "",
}: {
  x: number;
  y: number;
  s?: number;
  clipboard?: boolean;
  flashlight?: boolean;
  wave?: boolean;
  className?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={className}>
      {flashlight && (
        <path
          d="M34 34 L150 0 L150 80 Z"
          fill="#fff6c8"
          opacity={0.55}
          className="vx-beam"
        />
      )}
      <ellipse cx={0} cy={58} rx={26} ry={5} fill="#000" opacity={0.15} />
      <rect
        x={-22}
        y={4}
        width={44}
        height={46}
        rx={10}
        fill="#f4f5f7"
        stroke="#c9ced6"
        strokeWidth={2}
      />
      <rect x={-16} y={10} width={32} height={22} rx={5} fill={SCREEN} />
      <rect
        x={-9}
        y={16}
        width={5}
        height={8}
        rx={2}
        fill="#7fc0ff"
        className="vx-eye"
      />
      <rect
        x={4}
        y={16}
        width={5}
        height={8}
        rx={2}
        fill="#7fc0ff"
        className="vx-eye"
      />
      <rect x={-8} y={38} width={16} height={3} rx={1.5} fill={BLUE} />
      <path
        d="M-24 4 Q0 -22 24 4 Z"
        fill={HAT}
        stroke="#d39e00"
        strokeWidth={2}
      />
      <rect x={-28} y={2} width={56} height={5} rx={2.5} fill="#e0a800" />
      <g
        className={wave ? "vx-wave" : ""}
        style={{ transformOrigin: "-22px 22px" }}
      >
        <rect x={-34} y={18} width={12} height={6} rx={3} fill="#dfe3e8" />
      </g>
      {clipboard ? (
        <g>
          <rect x={22} y={14} width={20} height={26} rx={2} fill="#c8925a" />
          <rect x={25} y={18} width={14} height={18} rx={1} fill="#fff" />
          <rect x={27} y={21} width={10} height={1.6} fill="#9aa2ad" />
          <rect x={27} y={25} width={8} height={1.6} fill="#9aa2ad" />
          <rect x={27} y={29} width={10} height={1.6} fill="#9aa2ad" />
        </g>
      ) : (
        <rect x={22} y={18} width={12} height={6} rx={3} fill="#dfe3e8" />
      )}
      {flashlight && (
        <rect x={26} y={30} width={12} height={8} rx={2} fill="#4b5563" />
      )}
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
        <circle
          key={i}
          cx={x}
          cy={y}
          r={1.6}
          fill="#fff"
          className="vx-twinkle"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </g>
  );
}

function Clock({
  x,
  y,
  text,
  light,
}: {
  x: number;
  y: number;
  text: string;
  light: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-46}
        y={-16}
        width={92}
        height={32}
        rx={8}
        fill={light ? "#fff" : "#0b1830"}
        stroke={light ? "#d6dbe1" : "#2b4570"}
      />
      <text
        x={0}
        y={6}
        textAnchor="middle"
        fontSize={17}
        fontWeight={700}
        fill={light ? INK : "#9fd0ff"}
        fontFamily="ui-monospace, monospace"
      >
        {text}
      </text>
    </g>
  );
}

function Plant({ glow = true }: { glow?: boolean }) {
  return (
    <g>
      <rect x={120} y={190} width={400} height={110} fill="#1d2b44" />
      <path
        d="M120 190 L170 160 L170 190 L220 160 L220 190 L270 160 L270 190 L320 160 L320 190 Z"
        fill="#1d2b44"
      />
      <rect x={430} y={120} width={22} height={70} fill="#1d2b44" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={441}
          cy={110}
          r={10}
          fill="#5b6b86"
          opacity={0.6}
          className="vx-smoke"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
      {[150, 200, 250, 300, 350, 400, 450].map((x, i) => (
        <rect
          key={x}
          x={x}
          y={220}
          width={26}
          height={20}
          rx={2}
          fill={glow ? "#ffd75e" : "#334766"}
          className={glow ? "vx-window" : ""}
          style={{ animationDelay: `${(i % 3) * 0.7}s` }}
        />
      ))}
      <rect x={300} y={255} width={40} height={45} fill="#0e1a2e" />
    </g>
  );
}

function Cabinet({
  x,
  label,
  delay,
}: {
  x: number;
  label: string;
  delay: number;
}) {
  return (
    <g transform={`translate(${x} 120)`}>
      <g className="vx-pop" style={{ animationDelay: `${delay}s` }}>
        <rect
          x={0}
          y={0}
          width={70}
          height={120}
          rx={6}
          fill="#2a3a55"
          stroke="#3f5478"
          strokeWidth={2}
        />
        {[18, 38, 58, 78].map((yy, i) => (
          <g key={yy}>
            <rect x={8} y={yy} width={54} height={12} rx={2} fill="#1b2840" />
            <circle
              cx={54}
              cy={yy + 6}
              r={2.6}
              fill={i % 2 ? "#4ade80" : "#60a5fa"}
              className="vx-led"
              style={{ animationDelay: `${((i + x) % 5) * 0.2}s` }}
            />
          </g>
        ))}
        <text
          x={35}
          y={110}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill="#cbd5e1"
          fontFamily="ui-sans-serif, system-ui"
        >
          {label}
        </text>
      </g>
    </g>
  );
}

function Paper({
  x,
  y,
  delay,
  r = 0,
}: {
  x: number;
  y: number;
  delay: number;
  r?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <g className="vx-fall" style={{ animationDelay: `${delay}s` }}>
        <rect
          x={-14}
          y={-18}
          width={28}
          height={36}
          rx={2}
          fill="#fff"
          stroke="#cbd2da"
        />
        <rect x={-9} y={-11} width={18} height={2} fill="#b6bec8" />
        <rect x={-9} y={-5} width={14} height={2} fill="#b6bec8" />
        <rect x={-9} y={1} width={18} height={2} fill="#b6bec8" />
      </g>
    </g>
  );
}

function Person({
  x,
  y,
  tired = false,
}: {
  x: number;
  y: number;
  tired?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-30 70 Q0 20 30 70 Z" fill="#3b5b8f" />
      <circle cx={0} cy={18} r={18} fill="#f1c8a5" />
      <path d="M-18 14 Q0 -10 18 14 Q12 2 0 2 Q-12 2 -18 14 Z" fill="#5a3b2a" />
      {tired ? (
        <g stroke={INK} strokeWidth={2} strokeLinecap="round">
          <line x1={-8} y1={18} x2={-3} y2={18} />
          <line x1={3} y1={18} x2={8} y2={18} />
          <path d="M-5 28 Q0 25 5 28" fill="none" />
        </g>
      ) : (
        <g>
          <circle cx={-6} cy={17} r={2.2} fill={INK} />
          <circle cx={6} cy={17} r={2.2} fill={INK} />
          <path
            d="M-6 25 Q0 31 6 25"
            stroke={INK}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
}

function Desk({ children }: { children?: React.ReactNode }) {
  return (
    <g>
      <rect x={140} y={250} width={360} height={14} rx={3} fill="#8a5a3b" />
      <rect x={160} y={264} width={12} height={60} fill="#7a4d31" />
      <rect x={468} y={264} width={12} height={60} fill="#7a4d31" />
      {children}
    </g>
  );
}

function Flag({
  x,
  y,
  text,
  delay,
}: {
  x: number;
  y: number;
  text: string;
  delay: number;
}) {
  const w = text.length * 6.6 + 22;
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="vx-pop" style={{ animationDelay: `${delay}s` }}>
        <line x1={0} y1={0} x2={0} y2={34} stroke="#f8fafc" strokeWidth={2} />
        <rect
          x={0}
          y={-2}
          width={w}
          height={22}
          rx={5}
          fill="#fff"
          stroke="#f59e0b"
          strokeWidth={2}
        />
        <circle cx={10} cy={9} r={4} fill="#f59e0b" />
        <text
          x={19}
          y={13.5}
          fontSize={11.5}
          fontWeight={600}
          fill={INK}
          fontFamily="ui-sans-serif, system-ui"
        >
          {text}
        </text>
      </g>
    </g>
  );
}

function Machine({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 222)`}>
      <rect x={0} y={0} width={70} height={50} rx={5} fill="#2c3d5b" />
      <rect x={8} y={8} width={26} height={16} rx={2} fill="#1a2740" />
      <circle cx={52} cy={16} r={8} fill="#3d5580" />
      <rect x={-4} y={50} width={78} height={8} fill="#22314c" />
    </g>
  );
}

const SCENES: Scene[] = [
  {
    caption: "Your plant never stops.",
    seconds: 4,
    dark: true,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-night)" />
        <Stars />
        <circle cx={540} cy={70} r={22} fill="#f8f3d6" />
        <circle cx={532} cy={64} r={22} fill="#132447" />
        <Plant />
        <rect x={0} y={300} width={640} height={60} fill="#0b1426" />
        <Clock x={90} y={60} text="2:00 AM" light={false} />
      </>
    ),
  },
  {
    caption: "Neither does the data.",
    seconds: 4,
    dark: true,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-night)" />
        {["ERP", "MES", "MAINT", "QUALITY", "HR", "CRM"].map((l, i) => (
          <Cabinet key={l} x={70 + i * 85} label={l} delay={i * 0.15} />
        ))}
        {[110, 190, 270, 350, 430, 510, 160, 300, 460].map((x, i) => (
          <Paper
            key={i}
            x={x}
            y={262 + (i % 3) * 6}
            delay={0.6 + i * 0.25}
            r={(i % 5) * 9 - 18}
          />
        ))}
        <rect x={0} y={290} width={640} height={70} fill="#0b1426" />
      </>
    ),
  },
  {
    caption: "Getting answers out takes an analyst and a week.",
    seconds: 4,
    dark: false,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-dawn)" />
        <rect
          x={420}
          y={40}
          width={150}
          height={110}
          rx={6}
          fill="#fbd9a6"
          stroke="#c9a06a"
          strokeWidth={4}
        />
        <rect x={428} y={48} width={63} height={94} rx={2} fill="#ffe9c7" />
        <rect x={499} y={48} width={63} height={94} rx={2} fill="#ffe9c7" />
        <circle cx={530} cy={128} r={18} fill="#ffc46b" opacity={0.85} />
        <line
          x1={495}
          y1={40}
          x2={495}
          y2={150}
          stroke="#c9a06a"
          strokeWidth={4}
        />
        <Clock x={90} y={60} text="6:00 AM" light />
        <Person x={250} y={188} tired />
        <Desk>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect
              key={i}
              x={320 + (i % 2) * 4}
              y={238 - i * 9}
              width={70}
              height={10}
              rx={1.5}
              fill="#fff"
              stroke="#cfd6de"
              className="vx-stack"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          <rect
            x={410}
            y={226}
            width={20}
            height={24}
            rx={3}
            fill="#f5f5f5"
            stroke="#cfd6de"
          />
          <path
            d="M414 220 Q418 210 414 202"
            stroke="#cbd5e1"
            strokeWidth={2}
            fill="none"
            className="vx-steam"
          />
        </Desk>
        <g className="vx-pop" style={{ animationDelay: "1.2s" }}>
          <circle cx={205} cy={150} r={16} fill="#fff" stroke="#cfd6de" />
          <text
            x={205}
            y={157}
            textAnchor="middle"
            fontSize={20}
            fontWeight={700}
            fill={INK}
          >
            ?
          </text>
        </g>
      </>
    ),
  },
  {
    caption: "So VERUS reads it for you. Read-only.",
    seconds: 3,
    dark: true,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-night)" />
        <Cabinet x={430} label="ERP" delay={0} />
        <path
          d="M300 230 C 360 230 380 200 430 200"
          stroke="#94a3b8"
          strokeWidth={4}
          fill="none"
          className="vx-draw"
        />
        <g className="vx-pop" style={{ animationDelay: "1.2s" }}>
          <rect x={352} y={196} width={26} height={22} rx={4} fill={HAT} />
          <path
            d="M357 196 v-7 a8 8 0 0 1 16 0 v7"
            stroke={HAT}
            strokeWidth={4}
            fill="none"
          />
          <text
            x={365}
            y={238}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fill="#fde68a"
            fontFamily="ui-sans-serif, system-ui"
          >
            read-only
          </text>
        </g>
        <g className="vx-enter">
          <Robot x={250} y={180} s={1.4} />
        </g>
        <rect x={0} y={290} width={640} height={70} fill="#0b1426" />
      </>
    ),
  },
  {
    caption: "It watches everything, all night.",
    seconds: 7,
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
          <Robot x={0} y={208} s={1.05} clipboard={false} flashlight />
        </g>
        <Flag x={60} y={150} text="Scrap spike at HB03" delay={1.2} />
        <Flag
          x={300}
          y={110}
          text="Promise dates moved after shipping"
          delay={2.6}
        />
        <Flag
          x={150}
          y={60}
          text="Top customer: no call in 107 days"
          delay={4.0}
        />
        <Flag x={420} y={170} text="Steel up 1.7%" delay={5.2} />
      </>
    ),
  },
  {
    caption: "One page by six.",
    seconds: 5,
    dark: false,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-sunrise)" />
        <circle
          cx={520}
          cy={300}
          r={60}
          fill="#ffd27a"
          opacity={0.9}
          className="vx-rise"
        />
        <Clock x={90} y={60} text="6:00 AM" light />
        <Person x={170} y={188} />
        <Desk>
          <g className="vx-slide">
            <rect
              x={250}
              y={86}
              width={210}
              height={160}
              rx={8}
              fill="#fff"
              stroke="#d6dbe1"
              strokeWidth={2}
            />
            <text
              x={266}
              y={112}
              fontSize={13}
              fontWeight={700}
              fill={INK}
              fontFamily="ui-sans-serif, system-ui"
            >
              Your brief for Tuesday
            </text>
            {[
              "4 customers below 85% on time",
              "Overtime up: 7 to 62 hours",
              "Scrap up: 9 to 17 units",
              "Steel up 1.7% in August",
            ].map((t, i) => (
              <g key={t}>
                <circle
                  cx={270}
                  cy={133 + i * 24}
                  r={3}
                  fill={i === 3 ? TEAL : BLUE}
                />
                <text
                  x={280}
                  y={137 + i * 24}
                  fontSize={11.5}
                  fill={INK}
                  fontFamily="ui-sans-serif, system-ui"
                >
                  {t}
                </text>
              </g>
            ))}
          </g>
        </Desk>
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
        <rect
          x={170}
          y={60}
          width={300}
          height={220}
          rx={10}
          fill="#fff"
          stroke="#d6dbe1"
          strokeWidth={2}
        />
        <text
          x={190}
          y={92}
          fontSize={14}
          fontWeight={700}
          fill={INK}
          fontFamily="ui-sans-serif, system-ui"
        >
          Plan: recover on-time delivery
        </text>
        {[
          ["Review every late line", "Scheduling, this week"],
          ["Confirm promise dates", "Sales, by Friday"],
          ["Judged on its review date", "Back to 85%?"],
        ].map(([a, b], i) => (
          <g
            key={a}
            className="vx-pop"
            style={{ animationDelay: `${0.3 + i * 0.5}s` }}
          >
            <rect
              x={190}
              y={110 + i * 46}
              width={18}
              height={18}
              rx={4}
              fill="#fff"
              stroke="#9aa2ad"
              strokeWidth={2}
            />
            <path
              d={`M194 ${120 + i * 46} l4 4 l8 -9`}
              stroke={TEAL}
              strokeWidth={3}
              fill="none"
              className="vx-tick"
              style={{ animationDelay: `${1.6 + i * 0.4}s` }}
            />
            <text
              x={218}
              y={123 + i * 46}
              fontSize={12.5}
              fontWeight={600}
              fill={INK}
              fontFamily="ui-sans-serif, system-ui"
            >
              {a}
            </text>
            <text
              x={218}
              y={139 + i * 46}
              fontSize={11}
              fill="#5b6472"
              fontFamily="ui-sans-serif, system-ui"
            >
              {b}
            </text>
          </g>
        ))}
        <g className="vx-stamp">
          <circle cx={430} cy={250} r={34} fill={TEAL} />
          <path
            d="M414 250 l10 10 l20 -22"
            stroke="#fff"
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <Robot x={540} y={196} s={1.1} />
      </>
    ),
  },
  {
    caption: "The truth about your operation, around the clock.",
    seconds: 4,
    dark: true,
    // the logo, Chris's own design (2026-10-15); its navy ground is the scene's, so it sits in it without a frame
    draw: () => (
      <>
        <rect width={640} height={360} fill="#111a2b" />
        <defs>
          <radialGradient id="vx-logo-fade" cx="0.5" cy="0.5" r="0.62">
            <stop offset="0.6" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </radialGradient>
          <mask id="vx-logo-mask">
            <rect x={150} y={34} width={420} height={235} fill="url(#vx-logo-fade)" />
          </mask>
        </defs>
        <image
          href="/verus/verus-logo.jpg"
          x={150}
          y={34}
          width={420}
          height={235}
          mask="url(#vx-logo-mask)"
          className="vx-fade"
        />
        <g className="vx-bob">
          <Robot x={92} y={176} s={1.25} wave />
        </g>
      </>
    ),
  },
];

const TOTAL = SCENES.reduce((a, s) => a + s.seconds, 0);
const STARTS = SCENES.reduce<number[]>(
  (acc, s, i) => [...acc, i ? acc[i - 1] + SCENES[i - 1].seconds : 0],
  [],
);

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
      <linearGradient id="vx-day" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bcdcfb" />
        <stop offset="1" stopColor="#eef6ff" />
      </linearGradient>
    </defs>
  );
}

const CSS = `
.vx-stage *{animation-fill-mode:both!important}
.vx-pop{animation:vx-pop .5s cubic-bezier(.2,1.4,.4,1)}
@keyframes vx-pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
.vx-pop{transform-box:fill-box;transform-origin:center}
.vx-fall{animation:vx-fall .9s ease-in}
@keyframes vx-fall{from{opacity:0;transform:translateY(-200px)}to{opacity:1;transform:translateY(0)}}
.vx-stack{animation:vx-fade .4s ease-out}
.vx-fade{animation:vx-fade .8s ease-out}
@keyframes vx-fade{from{opacity:0}to{opacity:1}}
.vx-enter{animation:vx-enter 1.1s cubic-bezier(.2,.9,.3,1)}
@keyframes vx-enter{from{transform:translateX(-320px)}to{transform:translateX(0)}}
.vx-walk{animation:vx-walk 7s linear}
@keyframes vx-walk{from{transform:translateX(-60px)}to{transform:translateX(560px)}}
.vx-walk{transform:translateX(560px)}
.vx-slide{animation:vx-slide .9s cubic-bezier(.2,.9,.3,1) .3s}
@keyframes vx-slide{from{opacity:0;transform:translateY(-120px) rotate(-6deg)}to{opacity:1;transform:none}}
.vx-stamp{animation:vx-stamp .45s cubic-bezier(.2,1.6,.4,1) 3s;transform-box:fill-box;transform-origin:center}
@keyframes vx-stamp{from{opacity:0;transform:scale(2.4)}to{opacity:1;transform:scale(1)}}
.vx-tick{stroke-dasharray:24;animation:vx-tick .35s ease-out}
@keyframes vx-tick{from{stroke-dashoffset:24}to{stroke-dashoffset:0}}
.vx-draw{stroke-dasharray:200;animation:vx-draw 1s ease-out .4s}
@keyframes vx-draw{from{stroke-dashoffset:200}to{stroke-dashoffset:0}}
.vx-rise{animation:vx-rise 4s ease-out}
@keyframes vx-rise{from{transform:translateY(60px)}to{transform:none}}
.vx-bob{animation:vx-bob 2.4s ease-in-out infinite}
@keyframes vx-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.vx-wave{animation:vx-wave .6s ease-in-out 4 alternate}
@keyframes vx-wave{from{transform:rotate(0)}to{transform:rotate(-40deg)}}
.vx-twinkle{animation:vx-twinkle 1.8s ease-in-out infinite alternate}
@keyframes vx-twinkle{from{opacity:.25}to{opacity:1}}
.vx-window{animation:vx-window 2.2s steps(2) infinite}
@keyframes vx-window{0%{opacity:1}50%{opacity:.55}}
.vx-led{animation:vx-led 1s steps(2) infinite}
@keyframes vx-led{0%{opacity:1}50%{opacity:.2}}
.vx-smoke{animation:vx-smoke 2.7s ease-out infinite}
@keyframes vx-smoke{from{opacity:.6;transform:translate(0,0) scale(.6)}to{opacity:0;transform:translate(14px,-40px) scale(1.6)}}
.vx-smoke,.vx-eye,.vx-beam{transform-box:fill-box;transform-origin:center}
.vx-steam{animation:vx-fade 1.2s ease-in-out infinite alternate}
.vx-eye{animation:vx-blink 3.2s infinite}
@keyframes vx-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
.vx-beam{animation:vx-beam 1.4s ease-in-out infinite alternate}
@keyframes vx-beam{from{opacity:.35}to{opacity:.6}}
.vx-caption{animation:vx-caption .5s ease-out}
@keyframes vx-caption{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){.vx-stage *,.vx-caption{animation:none!important}.vx-walk{transform:translateX(250px)}}
`;

function Frame({ scene, still = false }: { scene: Scene; still?: boolean }) {
  return (
    <div
      className={`vx-stage relative overflow-hidden ${still ? "rounded-lg border border-line" : ""}`}
    >
      <svg
        viewBox="0 0 640 360"
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <Defs />
        {scene.draw()}
      </svg>
      <p
        className={`vx-caption pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-[4%] pt-8 text-center font-serif leading-tight ${
          still ? "text-sm" : "text-[clamp(1rem,3.6vw,1.9rem)]"
        } ${scene.dark ? "bg-gradient-to-t from-black/45 to-transparent text-white" : "bg-gradient-to-t from-white/80 to-transparent text-ink"}`}
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
        <Frame
          key={`${index}-${started ? "on" : "off"}-${t < 0.05 ? "r" : ""}`}
          scene={SCENES[index]}
        />
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
            const done =
              i < index
                ? 1
                : i > index
                  ? 0
                  : Math.min(1, (t - STARTS[i]) / s.seconds);
            return (
              <div
                key={s.caption}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
                style={{ flexGrow: s.seconds }}
              >
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${done * 100}%` }}
                />
              </div>
            );
          })}
        </div>
        <span className="w-10 text-right text-xs tabular-nums text-muted">
          {Math.round(TOTAL - t)}s
        </span>
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
