"use client";

// PROJECT VERUS, MEET VERUS, 2026-10-15, on the operator's word: the robot in the hard hat is VERUS, "absolutely gold,
// the personification of VERUS", so he is in every scene. Cute and explanatory at once, text-led so it works without
// sound. Drawn here in SVG and played by the page, not a video file, so it is sharp at any size and weighs almost
// nothing. The findings, prices, percentages and dashboard tiles are the demonstration's own; the agent sentence is
// the product's own example, and the plan scene illustrates the feature, not a measured result.
//
// Every animated element rests in its final, visible state; the keyframes only bring it in. An animation class never
// sits on an element that has its own transform attribute (it would replace it), so movers are wrapped in a <g>.
// With reduced motion the animations are off and the scenes show as a still strip, so nothing is lost.

import { useCallback, useEffect, useRef, useState } from "react";
import { Sound, type Sfx } from "./verus-explainer-sound";

type Scene = {
  caption: string;
  seconds: number;
  dark: boolean;
  draw: () => React.ReactNode;
};
type Face = "eyes" | "happy" | "chart";
type Hold =
  | "clipboard"
  | "flashlight"
  | "newspaper"
  | "magnifier"
  | "pointer"
  | "wrench"
  | "pendant"
  | "pencil"
  | "none";

const INK = "#1f2937";
const BLUE = "#2a78d6";
const SCREEN = "#16365f";
const HAT = "#f2b705";
const TEAL = "#0f766e";
const SANS = "ui-sans-serif, system-ui, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";
const UP = "#22c55e";
const DOWN = "#f87171";

function cssVars(vars: Record<string, string>): React.CSSProperties {
  return vars as React.CSSProperties;
}

// VERUS himself: a friendly computer in a hard hat with a headlamp. He breathes, looks about and blinks. Origin at
// the middle of his body's top edge.
function Robot({
  x,
  y,
  s = 1,
  face = "eyes",
  hold = "clipboard",
  wave = false,
  name = false,
  alert = false,
}: {
  x: number;
  y: number;
  s?: number;
  face?: Face;
  hold?: Hold;
  wave?: boolean;
  name?: boolean;
  alert?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {hold === "flashlight" && (
        <path
          d="M36 30 L170 -6 L170 86 Z"
          fill="#fff6c8"
          opacity={0.5}
          className="vx-beam"
        />
      )}
      <ellipse cx={0} cy={62} rx={27} ry={5} fill="#000" opacity={0.18} />
      <g className="vx-breathe" style={{ transformOrigin: "0px 60px" }}>
        <rect x={-15} y={50} width={11} height={10} rx={3} fill="#4b5563" />
        <rect x={4} y={50} width={11} height={10} rx={3} fill="#4b5563" />
        <rect
          x={-22}
          y={4}
          width={44}
          height={48}
          rx={10}
          fill="#f4f5f7"
          stroke="#c9ced6"
          strokeWidth={2}
        />
        <rect x={-16} y={10} width={32} height={23} rx={5} fill={SCREEN} />
        {face === "eyes" && (
          <g className="vx-look">
            <g className="vx-eye">
              <rect x={-9} y={16} width={5} height={9} rx={2} fill="#7fc0ff" />
              <rect x={4} y={16} width={5} height={9} rx={2} fill="#7fc0ff" />
            </g>
          </g>
        )}
        {face === "happy" && (
          <g>
            <path
              d="M-11 23 l4 -5 l4 5 M3 23 l4 -5 l4 5"
              stroke="#7fc0ff"
              strokeWidth={2.4}
              fill="none"
              strokeLinecap="round"
            />
            <circle cx={-11} cy={28} r={2.2} fill="#f9a8d4" opacity={0.75} />
            <circle cx={11} cy={28} r={2.2} fill="#f9a8d4" opacity={0.75} />
          </g>
        )}
        {face === "chart" && (
          <g>
            <path d="M-13 29 H13" stroke="#3d5f8f" strokeWidth={1} />
            <path
              d="M-13 27 L-7 25 L-2 26 L3 13 L8 25 L13 24"
              stroke="#ffcf5c"
              strokeWidth={2.2}
              fill="none"
              strokeLinejoin="round"
              className="vx-trace"
            />
          </g>
        )}
        <rect x={-8} y={39} width={16} height={3} rx={1.5} fill={BLUE} />
        <path
          d="M-24 4 Q0 -22 24 4 Z"
          fill={HAT}
          stroke="#d39e00"
          strokeWidth={2}
        />
        <rect x={-28} y={2} width={56} height={5} rx={2.5} fill="#e0a800" />
        <rect x={-3} y={-14} width={6} height={8} rx={2} fill="#e0a800" />
        <circle
          cx={0}
          cy={-3}
          r={4.2}
          fill="#fff7c2"
          stroke="#d39e00"
          strokeWidth={1.5}
          className="vx-lamp"
        />
        <g className="vx-flash" style={{ transformOrigin: "0px -3px" }}>
          <circle cx={0} cy={-3} r={11} fill="#fff7c2" opacity={0.85} />
          <path
            d="M0 -19 v-9 M-14 -11 l-7 -5 M14 -11 l7 -5"
            stroke="#fde68a"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </g>
        <g
          className={wave ? "vx-wave" : ""}
          style={{ transformOrigin: "-24px 24px" }}
        >
          <rect
            x={-36}
            y={20}
            width={14}
            height={7}
            rx={3.5}
            fill="#dfe3e8"
            stroke="#c9ced6"
          />
          <circle cx={-37} cy={23.5} r={4.5} fill="#dfe3e8" stroke="#c9ced6" />
        </g>
        <rect
          x={22}
          y={20}
          width={14}
          height={7}
          rx={3.5}
          fill="#dfe3e8"
          stroke="#c9ced6"
        />
        <circle cx={37} cy={23.5} r={4.5} fill="#dfe3e8" stroke="#c9ced6" />
        {hold === "clipboard" && (
          <g>
            <rect x={26} y={10} width={21} height={27} rx={2} fill="#c8925a" />
            <rect x={29} y={14} width={15} height={19} rx={1} fill="#fff" />
            <path
              d="M31 18 h11 M31 22 h8 M31 26 h11 M31 30 h7"
              stroke="#9aa2ad"
              strokeWidth={1.4}
            />
          </g>
        )}
        {hold === "flashlight" && (
          <rect x={28} y={26} width={14} height={9} rx={2} fill="#4b5563" />
        )}
        {hold === "magnifier" && (
          <g>
            <path
              d="M33 26 L44 15"
              stroke="#6b4f2a"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <circle
              cx={50}
              cy={9}
              r={10}
              fill="#dff3ff"
              fillOpacity={0.55}
              stroke="#4b5563"
              strokeWidth={3}
            />
          </g>
        )}
        {hold === "pointer" && (
          <path
            d="M-32 23 L-74 -20"
            stroke="#8a5a3b"
            strokeWidth={3}
            strokeLinecap="round"
          />
        )}
        {hold === "wrench" && (
          <g className="vx-turn" style={{ transformOrigin: "30px 26px" }}>
            <path
              d="M30 26 L47 9"
              stroke="#8b95a3"
              strokeWidth={5}
              strokeLinecap="round"
            />
            <path
              d="M43 4 a8 8 0 1 0 11 -1"
              stroke="#8b95a3"
              strokeWidth={5}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}
        {hold === "pendant" && (
          <g>
            <path
              d="M36 12 Q44 -40 -56 -112"
              stroke="#374151"
              strokeWidth={2}
              fill="none"
            />
            <rect
              x={29}
              y={10}
              width={14}
              height={24}
              rx={3}
              fill={HAT}
              stroke="#d39e00"
              strokeWidth={1.5}
            />
            <circle cx={36} cy={17} r={2.6} fill="#22c55e" className="vx-led" />
            <circle cx={36} cy={26} r={2.6} fill="#ef4444" />
          </g>
        )}
        {hold === "pencil" && (
          <g transform="translate(38 22) rotate(22)">
            <rect x={-3} y={-27} width={6} height={5} rx={1.5} fill="#f472b6" />
            <rect x={-3} y={-22} width={6} height={20} fill="#fbbf24" />
            <path d="M-3 -2 L0 6 L3 -2 Z" fill="#f5d0a9" />
            <path d="M-1 3.4 L0 6 L1 3.4 Z" fill={INK} />
          </g>
        )}
        {hold === "newspaper" && (
          <g>
            <rect
              x={-34}
              y={34}
              width={68}
              height={30}
              rx={2}
              fill="#f8f6ef"
              stroke="#cfcab8"
            />
            <text
              x={0}
              y={44}
              textAnchor="middle"
              fontSize={7}
              fontWeight={800}
              fill={INK}
              fontFamily={SANS}
            >
              STEEL UP 1.7%
            </text>
            <path
              d="M-29 50 h26 M-29 54 h22 M-29 58 h26 M4 50 h25 M4 54 h20 M4 58 h25"
              stroke="#b9b4a3"
              strokeWidth={1.4}
            />
          </g>
        )}
      </g>
      {name && (
        <g>
          <rect x={-22} y={66} width={44} height={14} rx={3} fill="#2b3a4f" />
          <text
            x={0}
            y={76.5}
            textAnchor="middle"
            fontSize={9}
            fontWeight={800}
            fill="#fff"
            fontFamily={SANS}
            letterSpacing={1.5}
          >
            VERUS
          </text>
        </g>
      )}
      {alert && (
        <g className="vx-pop" style={{ animationDelay: "0.9s" }}>
          <circle cx={30} cy={-26} r={11} fill="#f59e0b" />
          <text
            x={30}
            y={-20.5}
            textAnchor="middle"
            fontSize={16}
            fontWeight={900}
            fill="#fff"
            fontFamily={SANS}
          >
            !
          </text>
        </g>
      )}
    </g>
  );
}

// VERUS at the wheel of a forklift, beacon flashing, headlights on. Origin on the ground under it, facing right.
function Forklift({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M12 -66 L200 -104 L200 -6 Z"
        fill="#fff6c8"
        opacity={0.4}
        className="vx-beam"
      />
      <ellipse cx={0} cy={0} rx={58} ry={5} fill="#000" opacity={0.22} />
      <Robot x={-18} y={-92} s={0.78} face="happy" hold="none" />
      <rect x={34} y={-104} width={4} height={92} fill="#4b5563" />
      <rect x={42} y={-104} width={4} height={92} fill="#4b5563" />
      <rect x={45} y={-46} width={5} height={32} rx={1} fill="#374151" />
      <rect x={46} y={-17} width={36} height={4} rx={1} fill="#374151" />
      <path
        d="M-46 -12 L-46 -40 Q-46 -48 -38 -48 L-10 -48 L-2 -32 L30 -32 L34 -12 Z"
        fill={HAT}
        stroke="#d39e00"
        strokeWidth={2}
      />
      <rect x={-54} y={-42} width={11} height={30} rx={3} fill="#a16207" />
      <text
        x={-30}
        y={-21}
        fontSize={9}
        fontWeight={800}
        fill="#7c5a00"
        fontFamily={SANS}
        letterSpacing={1}
      >
        VERUS
      </text>
      <path
        d="M-40 -48 V-114 H10 V-32"
        stroke="#374151"
        strokeWidth={3.5}
        fill="none"
        strokeLinejoin="round"
      />
      <rect
        x={-22}
        y={-123}
        width={9}
        height={8}
        rx={3}
        fill="#f59e0b"
        className="vx-beacon"
      />
      <rect x={8} y={-71} width={8} height={7} rx={2} fill="#fff7c2" />
      {(
        [
          [-28, 11],
          [24, 12],
        ] as [number, number][]
      ).map(([cx, r]) => (
        <g key={cx} transform={`translate(${cx} ${-r})`}>
          <g className="vx-spin">
            <circle r={r} fill="#1f2937" />
            <circle r={r * 0.45} fill="#9ca3af" />
            <rect
              x={-1.5}
              y={-r * 0.45}
              width={3}
              height={r * 0.9}
              fill="#4b5563"
            />
          </g>
        </g>
      ))}
    </g>
  );
}

type Pose = "idle" | "wave" | "coffee" | "thumb" | "tablet";
type Mood = "happy" | "glad" | "tired";

function Arm({
  to,
  from,
  sleeve,
  skin,
}: {
  to: [number, number];
  from: [number, number];
  sleeve: string;
  skin: string;
}) {
  return (
    <g>
      <line
        x1={from[0]}
        y1={from[1]}
        x2={to[0]}
        y2={to[1]}
        stroke={sleeve}
        strokeWidth={8}
        strokeLinecap="round"
      />
      <circle cx={to[0]} cy={to[1]} r={4.8} fill={skin} />
    </g>
  );
}

// The people, drawn in VERUS's own style: big heads, shiny eyes that blink, real arms. Origin at the top of the head;
// about a hundred tall at scale one.
function Person({
  x,
  y,
  s = 1,
  exec = false,
  skin = "#f1c8a5",
  hair = "#5a3b2a",
  ponytail = false,
  hat = "#ffffff",
  mood = "happy",
  pose = "idle",
}: {
  x: number;
  y: number;
  s?: number;
  exec?: boolean;
  skin?: string;
  hair?: string;
  ponytail?: boolean;
  hat?: string;
  mood?: Mood;
  pose?: Pose;
}) {
  const sleeve = exec ? "#1e293b" : "#2c4a74";
  const shoe = exec ? "#111827" : "#6b4423";
  const leg = exec ? "#334155" : "#1e3a5f";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {ponytail && <ellipse cx={-21} cy={46} rx={6} ry={12} fill={hair} />}
      <rect x={-13} y={86} width={10} height={11} fill={leg} />
      <rect x={3} y={86} width={10} height={11} fill={leg} />
      <rect x={-16} y={95} width={14} height={6} rx={3} fill={shoe} />
      <rect x={2} y={95} width={14} height={6} rx={3} fill={shoe} />
      <path
        d="M-19 62 Q-19 55 -11 55 L11 55 Q19 55 19 62 L20 89 L-20 89 Z"
        fill={sleeve}
      />
      {exec ? (
        <g>
          <path d="M-8 55 L0 72 L8 55 Z" fill="#fff" />
          <path d="M-2.5 57 L2.5 57 L4.5 74 L0 79 L-4.5 74 Z" fill="#c0392b" />
          <path
            d="M-9 55 L-3 70 L-12 67 Z M9 55 L3 70 L12 67 Z"
            fill="#334155"
          />
          <path d="M10 64 l7 0 l-3.5 4 Z" fill="#fff" />
        </g>
      ) : (
        <g>
          <path
            d="M-19 62 Q-19 56 -10 55 L-5 89 L-20 89 Z M19 62 Q19 56 10 55 L5 89 L20 89 Z"
            fill="#f97316"
          />
          <path
            d="M-20 71 h14 M6 71 h14 M-20 80 h14.5 M5.5 80 h14.5"
            stroke="#fde68a"
            strokeWidth={3.5}
          />
          <rect x={9} y={58} width={6} height={9} rx={1.5} fill="#111827" />
          <path d="M13.5 58 v-6" stroke="#111827" strokeWidth={1.5} />
        </g>
      )}
      <Arm
        from={[-17, 60]}
        to={pose === "tablet" ? [-15, 75] : [-24, 84]}
        sleeve={sleeve}
        skin={skin}
      />
      {pose === "idle" && (
        <Arm from={[17, 60]} to={[24, 84]} sleeve={sleeve} skin={skin} />
      )}
      {pose === "coffee" && (
        <g>
          <Arm from={[17, 60]} to={[25, 73]} sleeve={sleeve} skin={skin} />
          <rect
            x={25}
            y={62}
            width={13}
            height={15}
            rx={3}
            fill="#fff"
            stroke="#cbd5e1"
          />
          <path
            d="M38 66 q6 3.5 0 7"
            stroke="#cbd5e1"
            strokeWidth={2}
            fill="none"
          />
          <path
            d="M30 58 q3 -5 0 -10 M35 58 q3 -5 0 -10"
            stroke="#cbd5e1"
            strokeWidth={1.8}
            fill="none"
            className="vx-steam"
          />
        </g>
      )}
      {pose === "wave" && (
        <g className="vx-hello" style={{ transformOrigin: "17px 60px" }}>
          <Arm from={[17, 60]} to={[30, 38]} sleeve={sleeve} skin={skin} />
        </g>
      )}
      {pose === "thumb" && (
        <g className="vx-raise" style={{ transformOrigin: "17px 60px" }}>
          <Arm from={[17, 60]} to={[29, 47]} sleeve={sleeve} skin={skin} />
          <rect x={27} y={36} width={4.5} height={10} rx={2.2} fill={skin} />
        </g>
      )}
      {pose === "tablet" && (
        <g>
          <Arm from={[17, 60]} to={[15, 75]} sleeve={sleeve} skin={skin} />
          <rect x={-17} y={64} width={34} height={23} rx={3} fill="#0f172a" />
          <rect
            x={-14}
            y={67}
            width={28}
            height={17}
            rx={1.5}
            fill="#38bdf8"
            opacity={0.55}
          />
          <circle cx={-17} cy={76} r={4.8} fill={skin} />
          <circle cx={17} cy={76} r={4.8} fill={skin} />
        </g>
      )}
      <rect x={-5} y={49} width={10} height={8} fill={skin} />
      <circle cx={-21} cy={36} r={4.2} fill={skin} />
      <circle cx={21} cy={36} r={4.2} fill={skin} />
      <circle cx={0} cy={33} r={21} fill={skin} />
      {exec ? (
        <path
          d="M-21 32 Q-23 10 0 11 Q23 10 21 32 Q19 20 8 18 Q-2 23 -14 19 Q-19 23 -21 32 Z"
          fill={hair}
        />
      ) : (
        <path
          d="M-21 25 Q-22 34 -18 39 L-16 27 Z M21 25 Q22 34 18 39 L16 27 Z"
          fill={hair}
        />
      )}
      <path
        d="M-12 27 q4 -3 8 0 M4 27 q4 -3 8 0"
        stroke={exec ? "#6b7280" : hair}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      {mood === "tired" ? (
        <path
          d="M-11 35 h6 M5 35 h6"
          stroke={INK}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ) : (
        <g className="vx-eye">
          <ellipse cx={-8} cy={35} rx={2.9} ry={3.7} fill={INK} />
          <ellipse cx={8} cy={35} rx={2.9} ry={3.7} fill={INK} />
          <circle cx={-7} cy={33.6} r={1.1} fill="#fff" />
          <circle cx={9} cy={33.6} r={1.1} fill="#fff" />
        </g>
      )}
      {exec && (
        <g fill="none" stroke={INK} strokeWidth={1.7}>
          <circle cx={-8} cy={35} r={6.2} />
          <circle cx={8} cy={35} r={6.2} />
          <path d="M-1.8 35 h3.6" />
        </g>
      )}
      <path
        d="M0 37 q2.6 2 0 4.2"
        stroke="#c98f6a"
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={-13.5} cy={42} r={3.6} fill="#f4a3a3" opacity={0.5} />
      <circle cx={13.5} cy={42} r={3.6} fill="#f4a3a3" opacity={0.5} />
      {exec && (
        <path
          d="M-7 43.5 q3.5 -3 7 0 q3.5 -3 7 0 q-3.5 2.6 -7 1 q-3.5 1.6 -7 -1 Z"
          fill={hair}
        />
      )}
      {mood === "glad" ? (
        <path d="M-7 45 Q0 54 7 45 Z" fill="#8b2c2c" />
      ) : mood === "tired" ? (
        <path
          d="M-5 47 Q0 44 5 47"
          stroke={INK}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M-6 46 Q0 51 6 46"
          stroke={INK}
          strokeWidth={2.2}
          fill="none"
          strokeLinecap="round"
        />
      )}
      {!exec && (
        <g>
          <path
            d="M-23 24 Q-23 2 0 2 Q23 2 23 24 Z"
            fill={hat}
            stroke="#cbd5e1"
            strokeWidth={1.5}
          />
          <rect
            x={-27}
            y={20}
            width={54}
            height={6}
            rx={3}
            fill={hat}
            stroke="#cbd5e1"
            strokeWidth={1.5}
          />
          <rect
            x={-2.5}
            y={1}
            width={5}
            height={14}
            rx={2}
            fill="#000"
            opacity={0.08}
          />
          <circle cx={11} cy={13} r={3.4} fill="#22c55e" />
          <path d="M11 11 v4 M9 13 h4" stroke="#fff" strokeWidth={1.3} />
        </g>
      )}
    </g>
  );
}

function PlantManager({
  x,
  y,
  s = 1,
  mood = "happy",
  pose = "idle",
  skin,
  hair,
  ponytail,
  hat,
}: {
  x: number;
  y: number;
  s?: number;
  mood?: Mood;
  pose?: Pose;
  skin?: string;
  hair?: string;
  ponytail?: boolean;
  hat?: string;
}) {
  return (
    <Person
      x={x}
      y={y}
      s={s}
      mood={mood}
      pose={pose}
      skin={skin}
      hair={hair}
      ponytail={ponytail}
      hat={hat}
    />
  );
}

function Executive({
  x,
  y,
  s = 1,
  pose = "idle",
}: {
  x: number;
  y: number;
  s?: number;
  pose?: Pose;
}) {
  return (
    <Person x={x} y={y} s={s} exec skin="#e8b996" hair="#9ca3af" pose={pose} />
  );
}

// Little gold sparkles that twinkle where something went right.
function Sparkles({
  pts,
  delay = 0,
}: {
  pts: [number, number][];
  delay?: number;
}) {
  return (
    <g>
      {pts.map(([sx, sy], i) => (
        <g key={i} transform={`translate(${sx} ${sy})`}>
          <g
            className="vx-sparkle"
            style={{ animationDelay: `${delay + i * 0.3}s` }}
          >
            <path
              d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z"
              fill="#fcd34d"
            />
          </g>
        </g>
      ))}
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

function Plant() {
  return (
    <g>
      <rect x={60} y={190} width={380} height={110} fill="#1d2b44" />
      <path
        d="M60 190 L110 160 L110 190 L160 160 L160 190 L210 160 L210 190 L260 160 L260 190 Z"
        fill="#1d2b44"
      />
      <rect x={370} y={120} width={22} height={70} fill="#1d2b44" />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={381}
          cy={110}
          r={10}
          fill="#5b6b86"
          opacity={0.6}
          className="vx-smoke"
          style={{ animationDelay: `${i * 0.9}s` }}
        />
      ))}
      {[90, 140, 190, 240, 290, 340, 390].map((x, i) => (
        <rect
          key={x}
          x={x}
          y={220}
          width={26}
          height={20}
          rx={2}
          fill="#ffd75e"
          className="vx-window"
          style={{ animationDelay: `${(i % 3) * 0.7}s` }}
        />
      ))}
    </g>
  );
}

function Cabinet({
  x,
  y = 70,
  label,
  delay,
}: {
  x: number;
  y?: number;
  label: string;
  delay: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="vx-pop" style={{ animationDelay: `${delay}s` }}>
        <rect
          x={0}
          y={0}
          width={64}
          height={110}
          rx={6}
          fill="#2a3a55"
          stroke="#3f5478"
          strokeWidth={2}
        />
        {[16, 34, 52, 70].map((yy, i) => (
          <g key={yy}>
            <rect x={8} y={yy} width={48} height={11} rx={2} fill="#1b2840" />
            <circle
              cx={49}
              cy={yy + 5.5}
              r={2.5}
              fill={i % 2 ? "#4ade80" : "#60a5fa"}
              className="vx-led"
              style={{ animationDelay: `${((i + x) % 5) * 0.2}s` }}
            />
          </g>
        ))}
        <text
          x={32}
          y={100}
          textAnchor="middle"
          fontSize={11}
          fontWeight={700}
          fill="#cbd5e1"
          fontFamily={SANS}
        >
          {label}
        </text>
      </g>
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
          fontFamily={SANS}
        >
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
        <text
          x={35}
          y={42}
          textAnchor="middle"
          fontSize={11}
          fontWeight={800}
          fill="#cbd5e1"
          fontFamily={SANS}
        >
          {label}
        </text>
      )}
    </g>
  );
}

function Desk({
  x = 140,
  w = 360,
  children,
}: {
  x?: number;
  w?: number;
  children?: React.ReactNode;
}) {
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
      <rect
        x={0}
        y={0}
        width={170}
        height={118}
        rx={6}
        fill="#fff"
        stroke="#d6dbe1"
        strokeWidth={2}
      />
      <text
        x={12}
        y={20}
        fontSize={11.5}
        fontWeight={800}
        fill={INK}
        fontFamily={SANS}
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
            cx={15}
            cy={39 + i * 20}
            r={2.6}
            fill={i === 3 ? TEAL : BLUE}
          />
          <text
            x={23}
            y={42.5 + i * 20}
            fontSize={9.6}
            fill={INK}
            fontFamily={SANS}
          >
            {t}
          </text>
        </g>
      ))}
    </g>
  );
}

// One tile of the plant's morning dashboard, its bars drawn from the demonstration's numbers.
function Tile({
  x,
  y,
  title,
  rows,
  delay,
}: {
  x: number;
  y: number;
  title: string;
  rows: [string, number, string][];
  delay: number;
}) {
  const top = Math.max(...rows.map((r) => r[1]));
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={0}
        y={0}
        width={196}
        height={80}
        rx={6}
        fill="#fff"
        stroke="#dbe1e8"
      />
      <text
        x={10}
        y={18}
        fontSize={10.5}
        fontWeight={700}
        fill={INK}
        fontFamily={SANS}
      >
        {title}
      </text>
      {rows.map(([label, v, shown], i) => (
        <g key={label} transform={`translate(0 ${32 + i * 22})`}>
          <text x={10} y={9} fontSize={9.5} fill="#5b6472" fontFamily={SANS}>
            {label}
          </text>
          <g
            className="vx-grow"
            style={{ animationDelay: `${delay + i * 0.25}s` }}
          >
            <rect
              x={56}
              y={0}
              width={(v / top) * 90}
              height={11}
              rx={3}
              fill={i ? "#eb6834" : BLUE}
            />
          </g>
          <text
            x={56 + (v / top) * 90 + 5}
            y={9.5}
            fontSize={9.5}
            fontWeight={700}
            fill={INK}
            fontFamily={SANS}
          >
            {shown}
          </text>
        </g>
      ))}
    </g>
  );
}

// A small copy of an agent, the card that flies to each teammate.
function AgentChip({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x={-16}
        y={-11}
        width={32}
        height={22}
        rx={4}
        fill="#fff"
        stroke={TEAL}
        strokeWidth={2}
      />
      <circle cx={-7} cy={0} r={3.5} fill={TEAL} />
      <path d="M-1 -3 h12 M-1 3 h9" stroke="#9aa2ad" strokeWidth={1.6} />
    </g>
  );
}

const TICKER: [string, "up" | "down" | "watch"][] = [
  ["\u25B2 STEEL MILL PRODUCTS +1.7%", "up"],
  ["\u25B2 IRON AND STEEL +1%", "up"],
  ["\u25BC PLASTIC RESINS -1.0%", "down"],
  ["\u25CF INDUSTRIAL PRODUCTION", "watch"],
  ["\u25CF DIESEL", "watch"],
  ["\u25CF INTEREST RATES", "watch"],
  ["\u25CF USD/CAD", "watch"],
  ["\u25CF TRADE NEWS ON YOUR MATERIALS", "watch"],
];

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
          <path
            d="M262 0 L378 0 L440 250 L200 250 Z"
            fill="#fff6c8"
            opacity={0.12}
          />
        </g>
        <ellipse
          cx={320}
          cy={238}
          rx={110}
          ry={12}
          fill="#fff6c8"
          opacity={0.15}
        />
        <g className="vx-hop">
          <Robot x={320} y={86} s={2.4} face="happy" wave name />
        </g>
        <Sparkles
          pts={[
            [214, 96],
            [430, 120],
            [236, 226],
            [410, 40],
          ]}
          delay={1.3}
        />
      </>
    ),
  },
  {
    caption: "Your plant never stops. Neither does VERUS.",
    seconds: 4.5,
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
          <rect
            x={0}
            y={0}
            width={46}
            height={64}
            rx={5}
            fill="#64748b"
            stroke="#94a3b8"
          />
          <rect x={8} y={8} width={30} height={14} rx={2} fill="#0f172a" />
          <text
            x={23}
            y={19}
            textAnchor="middle"
            fontSize={9}
            fontWeight={700}
            fill="#4ade80"
            fontFamily="ui-monospace, monospace"
          >
            2:00
          </text>
          <rect x={14} y={30} width={18} height={4} rx={1} fill="#0f172a" />
          <rect x={20} y={64} width={6} height={30} fill="#475569" />
        </g>
        <g className="vx-pop" style={{ animationDelay: "3.3s" }}>
          <rect
            x={526}
            y={168}
            width={22}
            height={30}
            rx={2}
            fill="#fef3c7"
            stroke="#d6b35a"
          />
          <text
            x={537}
            y={188}
            textAnchor="middle"
            fontSize={10}
            fontWeight={800}
            fill={INK}
            fontFamily={SANS}
          >
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
        <path
          d="M400 150 C 440 150 460 200 500 214"
          stroke="#94a3b8"
          strokeWidth={4}
          fill="none"
          className="vx-draw"
        />
        <g className="vx-pop" style={{ animationDelay: "1s" }}>
          <rect x={433} y={164} width={22} height={18} rx={4} fill={HAT} />
          <path
            d="M437 164 v-6 a7 7 0 0 1 14 0 v6"
            stroke={HAT}
            strokeWidth={3.5}
            fill="none"
          />
          <text
            x={444}
            y={200}
            textAnchor="middle"
            fontSize={10.5}
            fontWeight={700}
            fill="#fde68a"
            fontFamily={SANS}
          >
            read-only
          </text>
        </g>
        {[60, 138, 216, 294, 372].map((sx, i) => (
          <g key={sx} transform={`translate(${sx} 120)`}>
            <g
              className="vx-fly"
              style={{
                ...cssVars({ "--dx": `${520 - sx}px`, "--dy": "100px" }),
                animationDelay: `${1.2 + i * 0.35}s`,
              }}
            >
              <rect
                x={-9}
                y={-11}
                width={18}
                height={22}
                rx={2}
                fill="#fff"
                stroke="#cbd2da"
              />
              <path
                d="M-5 -5 h10 M-5 0 h8 M-5 5 h10"
                stroke="#b6bec8"
                strokeWidth={1.4}
              />
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
    seconds: 5,
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
          <Forklift x={0} y={284} s={1.05} />
        </g>
        <Flag x={60} y={118} text="Scrap spike at HB03" delay={1.0} />
        <Flag
          x={300}
          y={70}
          text="Promise dates moved after shipping"
          delay={2.2}
        />
        <Flag
          x={150}
          y={26}
          text="Top customer: no call in 107 days"
          delay={3.4}
        />
        <Flag x={440} y={122} text="PMs falling behind" delay={4.4} />
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
          <Robot x={330} y={150} s={1.9} face="chart" hold="magnifier" alert />
        </g>
        <g className="vx-pop" style={{ animationDelay: "1.4s" }}>
          <rect
            x={400}
            y={60}
            width={210}
            height={64}
            rx={8}
            fill="#fff"
            stroke="#f59e0b"
            strokeWidth={2.5}
          />
          <text
            x={414}
            y={84}
            fontSize={12.5}
            fontWeight={800}
            fill={INK}
            fontFamily={SANS}
          >
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
    seconds: 4.5,
    dark: true,
    draw: () => (
      <>
        <defs>
          <clipPath id="vx-ticker-clip">
            <rect x={0} y={8} width={640} height={30} />
          </clipPath>
        </defs>
        <rect width={640} height={360} fill="#0d1526" />
        <rect x={0} y={232} width={640} height={128} fill="#0a1120" />
        <rect x={0} y={8} width={640} height={30} fill="#020617" />
        <g clipPath="url(#vx-ticker-clip)">
          <g className="vx-ticker">
            <text
              x={12}
              y={28}
              fontSize={13}
              fontWeight={700}
              fontFamily={MONO}
            >
              {TICKER.map(([label, tone], i) => (
                <tspan
                  key={i}
                  fill={tone === "up" ? UP : tone === "down" ? DOWN : "#94a3b8"}
                >
                  {label}
                  {"     "}
                </tspan>
              ))}
            </text>
          </g>
        </g>
        <rect
          x={292}
          y={50}
          width={330}
          height={176}
          rx={10}
          fill="#060b16"
          stroke="#24324d"
          strokeWidth={3}
        />
        <text
          x={308}
          y={74}
          fontSize={11}
          fontWeight={800}
          fill="#94a3b8"
          fontFamily={MONO}
          letterSpacing={2}
        >
          PRODUCER PRICES, AUGUST
        </text>
        {(
          [
            ["STEEL MILL PRODUCTS", "+1.7%", true],
            ["IRON AND STEEL", "+1%", true],
            ["PLASTIC RESINS", "-1.0%", false],
          ] as [string, string, boolean][]
        ).map(([name, pct, up], i) => (
          <g
            key={name}
            className="vx-pop"
            style={{ animationDelay: `${0.5 + i * 0.35}s` }}
          >
            <text
              x={308}
              y={102 + i * 28}
              fontSize={13}
              fontWeight={700}
              fill="#e2e8f0"
              fontFamily={MONO}
            >
              {name}
            </text>
            <path
              d={
                up
                  ? `M532 ${100 + i * 28} l6 -9 l6 9 Z`
                  : `M532 ${91 + i * 28} l6 9 l6 -9 Z`
              }
              fill={up ? UP : DOWN}
            />
            <text
              x={604}
              y={102 + i * 28}
              textAnchor="end"
              fontSize={14}
              fontWeight={800}
              fill={up ? UP : DOWN}
              fontFamily={MONO}
            >
              {pct}
            </text>
          </g>
        ))}
        <path d="M308 212 H606" stroke="#1e293b" strokeWidth={1} />
        <path
          d="M308 202 L338 204 L368 201 L398 203 L428 200 L458 202 L488 201 L518 202 L548 200 L578 199 L606 184"
          stroke={UP}
          strokeWidth={2.5}
          fill="none"
          strokeLinejoin="round"
          className="vx-chart"
        />
        <g className="vx-pop" style={{ animationDelay: "0.2s" }}>
          <Robot x={150} y={118} s={1.9} face="chart" hold="newspaper" />
        </g>
      </>
    ),
  },
  {
    caption: "Your one-page brief, every morning.",
    seconds: 5.5,
    dark: false,
    draw: () => (
      <>
        <defs>
          <clipPath id="vx-crane-clip">
            <rect x={0} y={66} width={640} height={300} />
          </clipPath>
        </defs>
        <rect width={640} height={360} fill="url(#vx-sunrise)" />
        <circle
          cx={590}
          cy={300}
          r={56}
          fill="#ffd27a"
          opacity={0.9}
          className="vx-rise"
        />
        <rect
          x={470}
          y={34}
          width={16}
          height={258}
          rx={2}
          fill={HAT}
          stroke="#d39e00"
          strokeWidth={2}
        />
        <rect x={454} y={288} width={48} height={10} rx={2} fill="#4b5563" />
        <g className="vx-jib" style={{ transformOrigin: "478px 47px" }}>
          <rect
            x={196}
            y={40}
            width={290}
            height={14}
            rx={3}
            fill={HAT}
            stroke="#d39e00"
            strokeWidth={2}
          />
          <path
            d="M478 118 L404 54"
            stroke="#d39e00"
            strokeWidth={6}
            strokeLinecap="round"
          />
          <rect x={286} y={54} width={30} height={12} rx={3} fill="#4b5563" />
        </g>
        <circle cx={478} cy={44} r={9} fill="#d39e00" />
        <g clipPath="url(#vx-crane-clip)">
          <g className="vx-crane">
            <line
              x1={301}
              y1={-300}
              x2={301}
              y2={118}
              stroke="#374151"
              strokeWidth={2}
            />
            <path d="M293 118 h16 l-3 8 h-10 Z" fill="#6b7280" />
            <Brief x={216} y={126} />
          </g>
        </g>
        <Desk x={180} w={250} />
        <g className="vx-fade" style={{ animationDelay: "3.2s" }}>
          <PlantManager x={104} y={150} s={1.15} mood="glad" pose="coffee" />
        </g>
        <Robot x={552} y={192} s={1.15} face="happy" hold="pendant" />
      </>
    ),
  },
  {
    caption: "Dashboards that stay current, all day.",
    seconds: 4.5,
    dark: false,
    draw: () => (
      <>
        <rect width={640} height={360} fill="#eef2f7" />
        <rect x={0} y={286} width={640} height={74} fill="#d9e0ea" />
        <rect x={40} y={26} width={444} height={244} rx={10} fill="#1f2937" />
        <rect x={50} y={36} width={424} height={216} rx={4} fill="#f4f6f9" />
        <rect x={244} y={270} width={36} height={18} fill="#374151" />
        <rect x={214} y={286} width={96} height={6} rx={3} fill="#374151" />
        <text
          x={62}
          y={56}
          fontSize={12.5}
          fontWeight={800}
          fill={INK}
          fontFamily={SANS}
        >
          Morning: the plant
        </text>
        <circle cx={392} cy={52} r={3.5} fill="#16a34a" className="vx-led" />
        <text x={400} y={56} fontSize={9.5} fill="#16a34a" fontFamily={SANS}>
          up to date
        </text>
        <Tile
          x={58}
          y={66}
          title="Build completion, yesterday"
          rows={[["FAB", 0.857, "85.7%"]]}
          delay={0.4}
        />
        <Tile
          x={266}
          y={66}
          title="Labor efficiency, yesterday"
          rows={[
            ["CUT", 0.856, "85.6%"],
            ["FINISH", 1.132, "113.2%"],
          ]}
          delay={0.7}
        />
        <Tile
          x={58}
          y={158}
          title="On time, last month"
          rows={[
            ["Alpha", 0.704, "70.4%"],
            ["Beta", 0.66, "66.0%"],
          ]}
          delay={1.0}
        />
        <Tile
          x={266}
          y={158}
          title="Downtime, last month"
          rows={[
            ["Alpha", 5796, "5,796 min"],
            ["Beta", 2962, "2,962 min"],
          ]}
          delay={1.3}
        />
        <Robot x={566} y={190} s={1.25} face="eyes" hold="pointer" />
      </>
    ),
  },
  {
    caption: "Need to dig in? Describe an agent in one sentence.",
    seconds: 5,
    dark: false,
    draw: () => (
      <>
        <defs>
          <clipPath id="vx-type-clip">
            <rect x={186} y={64} width={296} height={46} />
          </clipPath>
        </defs>
        <rect width={640} height={360} fill="#eaf3fb" />
        <rect x={0} y={292} width={640} height={68} fill="#dbe7f3" />
        <PlantManager x={92} y={150} s={1.15} pose="tablet" />
        <rect
          x={176}
          y={34}
          width={316}
          height={84}
          rx={10}
          fill="#fff"
          stroke="#cbd5e1"
          strokeWidth={2}
        />
        <text
          x={190}
          y={54}
          fontSize={10.5}
          fontWeight={700}
          fill="#5b6472"
          fontFamily={SANS}
        >
          Describe a new agent
        </text>
        <g clipPath="url(#vx-type-clip)">
          <text x={190} y={80} fontSize={12.5} fill={INK} fontFamily={SANS}>
            Tell me every Monday if any customer&apos;s
          </text>
          <text x={190} y={100} fontSize={12.5} fill={INK} fontFamily={SANS}>
            on-time delivery drops below 85%.
          </text>
          <g className="vx-type">
            <rect x={186} y={64} width={300} height={46} fill="#fff" />
          </g>
        </g>
        <path
          d="M334 122 v26"
          stroke="#94a3b8"
          strokeWidth={3}
          className="vx-draw"
          style={{ animationDelay: "2.6s" }}
        />
        <g className="vx-pop" style={{ animationDelay: "3s" }}>
          <rect
            x={214}
            y={152}
            width={240}
            height={104}
            rx={10}
            fill="#fff"
            stroke={TEAL}
            strokeWidth={2.5}
          />
          <rect x={228} y={164} width={70} height={18} rx={9} fill="#ccfbf1" />
          <text
            x={263}
            y={177}
            textAnchor="middle"
            fontSize={10}
            fontWeight={700}
            fill={TEAL}
            fontFamily={SANS}
          >
            New agent
          </text>
          <text
            x={228}
            y={202}
            fontSize={13}
            fontWeight={800}
            fill={INK}
            fontFamily={SANS}
          >
            On time below 85%, by customer
          </text>
          <text
            x={228}
            y={222}
            fontSize={10.5}
            fill="#5b6472"
            fontFamily={SANS}
          >
            Every Monday. Tested on the last 90 days first.
          </text>
          <text
            x={228}
            y={242}
            fontSize={10.5}
            fill="#5b6472"
            fontFamily={SANS}
          >
            Sees only what you may see.
          </text>
        </g>
        <Robot x={560} y={186} s={1.3} face="happy" hold="wrench" />
      </>
    ),
  },
  {
    caption: "Run it once or on a schedule. Share it with your team.",
    seconds: 5,
    dark: false,
    draw: () => (
      <>
        <rect width={640} height={360} fill="#eef2f7" />
        <rect x={0} y={282} width={640} height={78} fill="#d9e0ea" />
        <rect
          x={170}
          y={20}
          width={300}
          height={112}
          rx={10}
          fill="#fff"
          stroke="#cbd5e1"
          strokeWidth={2}
        />
        <text
          x={186}
          y={44}
          fontSize={13}
          fontWeight={800}
          fill={INK}
          fontFamily={SANS}
        >
          On time below 85%, by customer
        </text>
        {(
          [
            ["Once", 186, 46],
            ["Every day", 240, 70],
            ["Every Monday", 318, 92],
          ] as [string, number, number][]
        ).map(([label, x, w], i) => (
          <g key={label}>
            <rect
              x={x}
              y={56}
              width={w}
              height={24}
              rx={12}
              fill="#fff"
              stroke="#cbd5e1"
            />
            {i === 2 && (
              <g className="vx-pop" style={{ animationDelay: "0.6s" }}>
                <rect x={x} y={56} width={w} height={24} rx={12} fill={TEAL} />
              </g>
            )}
            <text
              x={x + w / 2}
              y={72}
              textAnchor="middle"
              fontSize={11}
              fontWeight={600}
              fill={i === 2 ? "#fff" : INK}
              fontFamily={SANS}
              className={i === 2 ? "vx-fade" : ""}
              style={i === 2 ? { animationDelay: "0.6s" } : undefined}
            >
              {label}
            </text>
          </g>
        ))}
        <g className="vx-pop" style={{ animationDelay: "1.3s" }}>
          <rect x={186} y={92} width={136} height={26} rx={6} fill={BLUE} />
          <text
            x={254}
            y={109}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fill="#fff"
            fontFamily={SANS}
          >
            Share with the team
          </text>
        </g>
        {[
          [140, 196],
          [300, 196],
          [460, 196],
        ].map(([px, py], i) => (
          <g key={px} transform="translate(320 150)">
            <g
              className="vx-fly"
              style={{
                ...cssVars({
                  "--dx": `${px - 320}px`,
                  "--dy": `${py - 150}px`,
                }),
                animationDelay: `${1.9 + i * 0.3}s`,
              }}
            >
              <AgentChip x={0} y={0} />
            </g>
          </g>
        ))}
        <PlantManager x={140} y={190} s={0.8} pose="wave" />
        <PlantManager
          x={300}
          y={190}
          s={0.8}
          skin="#a8714a"
          hair="#1f1f1f"
          ponytail
          hat={HAT}
          mood="glad"
        />
        <Executive x={460} y={190} s={0.8} pose="tablet" />
        {[140, 300, 460].map((px, i) => (
          <g key={px} transform={`translate(${px + 26} 196)`}>
            <g className="vx-pop" style={{ animationDelay: `${3 + i * 0.3}s` }}>
              <AgentChip x={0} y={0} />
            </g>
          </g>
        ))}
        <Robot x={580} y={202} s={1.05} face="happy" hold="none" />
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
        <rect
          x={230}
          y={40}
          width={300}
          height={170}
          rx={8}
          fill="#fff"
          stroke="#cbd5e1"
          strokeWidth={2}
        />
        <text
          x={250}
          y={66}
          fontSize={13}
          fontWeight={800}
          fill={INK}
          fontFamily={SANS}
        >
          On time, last month
        </text>
        {[
          { label: "Alpha (US)", v: 0.704, c: BLUE },
          { label: "Beta (Canada)", v: 0.66, c: "#eb6834" },
        ].map((b, i) => (
          <g key={b.label}>
            <text
              x={250}
              y={100 + i * 50}
              fontSize={11.5}
              fill={INK}
              fontFamily={SANS}
            >
              {b.label}
            </text>
            <rect
              x={345}
              y={88 + i * 50}
              width={150}
              height={16}
              rx={4}
              fill="#eef2f7"
            />
            <g
              className="vx-grow"
              style={{ animationDelay: `${0.5 + i * 0.4}s` }}
            >
              <rect
                x={345}
                y={88 + i * 50}
                width={150 * b.v}
                height={16}
                rx={4}
                fill={b.c}
              />
            </g>
            <text
              x={345 + 150 * b.v + 6}
              y={101 + i * 50}
              fontSize={11.5}
              fontWeight={700}
              fill={INK}
              fontFamily={SANS}
            >
              {(b.v * 100).toFixed(1)}%
            </text>
          </g>
        ))}
        <Executive x={160} y={92} s={1.3} pose="tablet" />
        <rect x={60} y={206} width={210} height={14} rx={3} fill="#8a5a3b" />
        <rect x={76} y={220} width={10} height={60} fill="#7a4d31" />
        <rect x={244} y={220} width={10} height={60} fill="#7a4d31" />
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
        <rect
          x={200}
          y={44}
          width={250}
          height={220}
          rx={10}
          fill="#fff"
          stroke="#d6dbe1"
          strokeWidth={2}
        />
        <text
          x={220}
          y={74}
          fontSize={13.5}
          fontWeight={800}
          fill={INK}
          fontFamily={SANS}
        >
          Plan: recover on-time delivery
        </text>
        {[
          ["Review every late line", "Scheduling, this week"],
          ["Confirm promise dates", "Sales, by Friday"],
          ["Judged on its review date", "Back to 85%?"],
        ].map(([a, b], i) => (
          <g key={a}>
            <rect
              x={220}
              y={92 + i * 46}
              width={18}
              height={18}
              rx={4}
              fill="#fff"
              stroke="#9aa2ad"
              strokeWidth={2}
            />
            <path
              d={`M224 ${102 + i * 46} l4 4 l8 -9`}
              stroke={TEAL}
              strokeWidth={3}
              fill="none"
              className="vx-tick"
              style={{ animationDelay: `${0.6 + i * 0.4}s` }}
            />
            <text
              x={248}
              y={105 + i * 46}
              fontSize={12.5}
              fontWeight={600}
              fill={INK}
              fontFamily={SANS}
            >
              {a}
            </text>
            <text
              x={248}
              y={121 + i * 46}
              fontSize={11}
              fill="#5b6472"
              fontFamily={SANS}
            >
              {b}
            </text>
          </g>
        ))}
        <g className="vx-stamp">
          <circle cx={410} cy={232} r={30} fill={TEAL} />
          <path
            d="M396 232 l9 9 l18 -20"
            stroke="#fff"
            strokeWidth={5.5}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <PlantManager x={110} y={150} s={1.15} mood="glad" pose="thumb" />
        <Sparkles
          pts={[
            [372, 196],
            [452, 210],
            [440, 262],
          ]}
          delay={2.5}
        />
        <g className="vx-bob">
          <Robot x={530} y={180} s={1.3} face="happy" hold="pencil" />
        </g>
      </>
    ),
  },
  {
    caption: "It lights the path. Your team moves faster.",
    seconds: 5.5,
    dark: false,
    draw: () => (
      <>
        <rect width={640} height={360} fill="url(#vx-sunrise)" />
        <path d="M0 290 Q150 240 320 270 T640 220 V360 H0 Z" fill="#cfe8c6" />
        <path d="M0 318 Q200 286 400 306 T640 290 V360 H0 Z" fill="#b7dcae" />
        <g transform="translate(30 0)">
          <rect x={-3} y={240} width={6} height={56} fill="#8a5a3b" />
          <rect
            x={-26}
            y={236}
            width={52}
            height={20}
            rx={3}
            fill="#fff"
            stroke="#8a5a3b"
            strokeWidth={2}
          />
          <text
            x={0}
            y={250}
            textAnchor="middle"
            fontSize={10}
            fontWeight={800}
            fill={INK}
            fontFamily={SANS}
          >
            TODAY
          </text>
        </g>
        {Array.from({ length: 12 }, (_, i) => {
          const cx = 70 + 42 * i;
          return (
            <g
              key={i}
              transform={`translate(${cx} ${290 - 0.2308 * (cx - 40)}) rotate(-13)`}
            >
              <g
                className="vx-pop"
                style={{
                  animationDelay: `${Math.max(0.15, 0.12 + 0.347 * i)}s`,
                }}
              >
                <rect
                  x={-21}
                  y={-7}
                  width={42}
                  height={14}
                  rx={2}
                  fill={HAT}
                  stroke="#b45309"
                  strokeWidth={1.5}
                />
              </g>
            </g>
          );
        })}
        <g transform="translate(588 0)">
          <rect x={-2} y={92} width={4} height={72} fill="#475569" />
          <g className="vx-pop" style={{ animationDelay: "4s" }}>
            <rect x={2} y={92} width={46} height={30} rx={3} fill={TEAL} />
            <text
              x={25}
              y={107}
              textAnchor="middle"
              fontSize={13}
              fontWeight={800}
              fill="#fff"
              fontFamily={SANS}
            >
              85%
            </text>
            <text
              x={25}
              y={118}
              textAnchor="middle"
              fontSize={7.5}
              fontWeight={700}
              fill="#ccfbf1"
              fontFamily={SANS}
            >
              ON TIME
            </text>
          </g>
        </g>
        {(
          [
            [400, 120, 70, 1.6],
            [500, 170, 80, 2.4],
            [560, 100, 60, 2.9],
            [450, 220, 60, 2.0],
          ] as [number, number, number, number][]
        ).map(([fx, fy, r, d]) => (
          <g key={fx} className="vx-clear" style={{ animationDelay: `${d}s` }}>
            <ellipse
              cx={fx}
              cy={fy}
              rx={r}
              ry={r * 0.55}
              fill="#e2e8f0"
              opacity={0.95}
            />
            <ellipse
              cx={fx - r * 0.5}
              cy={fy + 6}
              rx={r * 0.6}
              ry={r * 0.4}
              fill="#e2e8f0"
              opacity={0.95}
            />
            <text
              x={fx}
              y={fy + 8}
              textAnchor="middle"
              fontSize={22}
              fontWeight={800}
              fill="#94a3b8"
              fontFamily={SANS}
            >
              ?
            </text>
          </g>
        ))}
        <g className="vx-follow">
          <g className="vx-march">
            <PlantManager x={210} y={195} s={0.55} />
          </g>
          <g className="vx-march" style={{ animationDelay: "0.2s" }}>
            <PlantManager
              x={270}
              y={181}
              s={0.55}
              skin="#a8714a"
              hair="#1f1f1f"
              ponytail
              hat={HAT}
              mood="glad"
              pose="wave"
            />
          </g>
          <g className="vx-march" style={{ animationDelay: "0.1s" }}>
            <Executive x={330} y={167} s={0.55} />
          </g>
        </g>
        <g className="vx-lead">
          <Robot x={540} y={124} s={0.85} face="happy" hold="flashlight" />
        </g>
        <Sparkles
          pts={[
            [566, 84],
            [632, 136],
            [540, 60],
          ]}
          delay={4.2}
        />
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
            <rect
              x={170}
              y={30}
              width={420}
              height={235}
              fill="url(#vx-logo-fade)"
            />
          </mask>
        </defs>
        <rect width={640} height={360} fill="url(#vx-logo-ground)" />
        <image
          href="/verus/verus-logo.jpg"
          x={170}
          y={30}
          width={420}
          height={235}
          mask="url(#vx-logo-mask)"
          className="vx-fade"
        />
        <g className="vx-bob">
          <Robot x={100} y={150} s={1.5} face="happy" hold="clipboard" wave />
        </g>
        <Sparkles
          pts={[
            [52, 126],
            [158, 112],
            [600, 60],
            [190, 250],
          ]}
          delay={0.8}
        />
      </>
    ),
  },
];

const TOTAL = SCENES.reduce((a, s) => a + s.seconds, 0);
const STARTS = SCENES.reduce<number[]>(
  (acc, s, i) => [...acc, i ? acc[i - 1] + SCENES[i - 1].seconds : 0],
  [],
);
export const EXPLAINER_SECONDS = Math.round(TOTAL);

const typing = Array.from({ length: 26 }, (_, i): [number, Sfx] => [
  0.5 + i * 0.075,
  "tick",
]);
const SFX: Record<string, [number, Sfx, number?][]> = {
  "Meet VERUS.": [
    [0.62, "boing"],
    [1.3, "chime"],
  ],
  "Your plant never stops. Neither does VERUS.": [
    ...Array.from({ length: 8 }, (_, i): [number, Sfx] => [
      0.3 + i * 0.4,
      "step",
    ]),
    [3.3, "clunk"],
  ],
  "It reads every system you run. Read-only.": [
    [0.4, "whoosh"],
    [1.0, "pop"],
    ...Array.from({ length: 5 }, (_, i): [number, Sfx] => [
      1.2 + i * 0.35,
      "paper",
    ]),
  ],
  "It watches everything, all night.": [
    [0.05, "motor", 4.8],
    [1.0, "pop"],
    [2.2, "pop"],
    [2.7, "honk"],
    [3.4, "pop"],
    [4.4, "pop"],
  ],
  "It finds what's wrong, and where the money is.": [
    [0.4, "pop"],
    [0.6, "rise"],
    [0.9, "alert"],
    [1.4, "pop"],
  ],
  "It reads the market, too.": [
    [0.2, "pop"],
    [0.5, "blip"],
    [0.85, "blip"],
    [1.2, "blip"],
    [1.3, "rise"],
  ],
  "Your one-page brief, every morning.": [
    [0.2, "motor", 1.1],
    [1.3, "winch", 2.2],
    [3.5, "thump"],
    [3.6, "ding"],
  ],
  "Dashboards that stay current, all day.": [
    [0.4, "blip"],
    [0.7, "blip"],
    [1.0, "blip"],
    [1.3, "blip"],
  ],
  "Need to dig in? Describe an agent in one sentence.": [
    ...typing,
    [2.6, "whoosh"],
    [3.0, "pop"],
    [3.2, "ding"],
  ],
  "Run it once or on a schedule. Share it with your team.": [
    [0.6, "pop"],
    [1.3, "pop"],
    [1.9, "whoosh"],
    [2.2, "whoosh"],
    [2.5, "whoosh"],
    [3.0, "pop"],
    [3.3, "pop"],
    [3.6, "pop"],
  ],
  "Every plant. Every company. One version of the truth.": [
    [0.5, "blip"],
    [0.9, "blip"],
  ],
  "And it checks the fix worked.": [
    [0.6, "clack"],
    [1.0, "clack"],
    [1.4, "clack"],
    [2.2, "thump"],
    [2.3, "ding"],
    [2.7, "chime"],
  ],
  "It lights the path. Your team moves faster.": [
    ...Array.from({ length: 12 }, (_, i): [number, Sfx] => [
      Math.max(0.15, 0.12 + 0.347 * i),
      "clack",
    ]),
    [1.4, "whoosh"],
    [4.0, "fanfare"],
  ],
  "The truth about your operation, around the clock.": [
    [0.3, "chime"],
    [1.0, "ding"],
  ],
};
const CUES = SCENES.flatMap((scene, i) =>
  (SFX[scene.caption] ?? []).map(([at, kind, dur]) => ({
    at: STARTS[i] + at,
    kind,
    dur,
  })),
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
    </defs>
  );
}

const CSS = `
.vx-stage *{animation-fill-mode:both!important}
.vx-pop{animation:vx-pop .5s cubic-bezier(.2,1.4,.4,1);transform-box:fill-box;transform-origin:center}
@keyframes vx-pop{from{opacity:0;transform:scale(.4)}to{opacity:1;transform:scale(1)}}
.vx-fade{animation:vx-fade .8s ease-out}
@keyframes vx-fade{from{opacity:0}to{opacity:1}}
.vx-enter{animation:vx-enter 3.4s cubic-bezier(.25,.6,.35,1)}
@keyframes vx-enter{from{transform:translateX(-420px)}to{transform:translateX(0)}}
.vx-walk{animation:vx-walk 5s linear;transform:translateX(560px)}
@keyframes vx-walk{from{transform:translateX(-60px)}to{transform:translateX(560px)}}
.vx-fly{animation:vx-fly 1.1s ease-in;opacity:0}
@keyframes vx-fly{0%{opacity:1;transform:translate(0,0) rotate(0)}85%{opacity:1}100%{opacity:0;transform:translate(var(--dx),var(--dy)) rotate(30deg) scale(.4)}}
.vx-crane{animation:vx-crane 2.2s cubic-bezier(.3,.7,.3,1) 1.3s}
@keyframes vx-crane{from{transform:translateY(-170px)}to{transform:none}}
.vx-grow{animation:vx-grow .9s ease-out;transform-box:fill-box;transform-origin:left center}
@keyframes vx-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.vx-stamp{animation:vx-stamp .45s cubic-bezier(.2,1.6,.4,1) 2.2s;transform-box:fill-box;transform-origin:center}
@keyframes vx-stamp{from{opacity:0;transform:scale(2.4)}to{opacity:1;transform:scale(1)}}
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
.vx-turn{animation:vx-turn .45s ease-in-out infinite alternate}
@keyframes vx-turn{from{transform:rotate(-18deg)}to{transform:rotate(12deg)}}
.vx-type{animation:vx-type 2s steps(28) .5s;transform:translateX(300px)}
@keyframes vx-type{from{transform:translateX(0)}to{transform:translateX(300px)}}
.vx-breathe{animation:vx-breathe 2.2s ease-in-out infinite}
@keyframes vx-breathe{0%,100%{transform:none}50%{transform:scale(1.03,.97)}}
.vx-look{animation:vx-look 4.2s ease-in-out infinite}
@keyframes vx-look{0%,30%,100%{transform:none}40%,55%{transform:translateX(-2.5px)}65%,85%{transform:translateX(2.5px)}}
.vx-lamp{animation:vx-lamp 1.4s ease-in-out infinite alternate}
@keyframes vx-lamp{from{opacity:.55}to{opacity:1}}
.vx-spin{animation:vx-spin .7s linear infinite;transform-box:fill-box;transform-origin:center}
@keyframes vx-spin{to{transform:rotate(360deg)}}
.vx-beacon{animation:vx-beacon .7s steps(2) infinite}
@keyframes vx-beacon{0%{opacity:1}50%{opacity:.2}}
.vx-jib{animation:vx-jib 1.1s cubic-bezier(.3,.8,.3,1) .2s}
@keyframes vx-jib{from{transform:scaleX(.1)}to{transform:none}}
.vx-hop{animation:vx-hop 1.2s ease-out .2s;transform-box:fill-box;transform-origin:50% 100%}
@keyframes vx-hop{0%{opacity:0;transform:translateY(-160px)}45%{opacity:1;transform:translateY(0) scale(1.1,.86)}63%{transform:translateY(-16px) scale(.95,1.06)}80%{transform:translateY(0) scale(1.04,.96)}100%{transform:none}}
.vx-sparkle{animation:vx-sparkle 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes vx-sparkle{0%,100%{opacity:.3;transform:scale(.4) rotate(0)}50%{opacity:1;transform:scale(1.15) rotate(45deg)}}
.vx-hello{animation:vx-hello .45s ease-in-out infinite alternate}
@keyframes vx-hello{from{transform:rotate(-12deg)}to{transform:rotate(14deg)}}
.vx-flash{animation:vx-flash 3.6s ease-out infinite;opacity:0}
@keyframes vx-flash{0%,78%,100%{opacity:0;transform:scale(.4)}85%{opacity:1;transform:scale(1.15)}94%{opacity:0;transform:scale(1.5)}}
.vx-raise{animation:vx-raise .55s cubic-bezier(.3,1.5,.5,1) 2.6s}
@keyframes vx-raise{from{transform:rotate(115deg)}to{transform:none}}
.vx-ticker{animation:vx-ticker 4.5s linear;transform:translateX(-560px)}
@keyframes vx-ticker{from{transform:none}to{transform:translateX(-560px)}}
.vx-chart{stroke-dasharray:320;animation:vx-chart 1.6s ease-out 1.3s}
@keyframes vx-chart{from{stroke-dashoffset:320}to{stroke-dashoffset:0}}
.vx-lead{animation:vx-lead 3.8s linear .2s}
@keyframes vx-lead{from{transform:translate(-460px,106px)}to{transform:none}}
.vx-follow{animation:vx-follow 3.4s ease-out 1.1s}
@keyframes vx-follow{from{transform:translate(-200px,46px)}to{transform:none}}
.vx-march{animation:vx-march .32s ease-in-out infinite alternate}
@keyframes vx-march{from{transform:none}to{transform:translateY(-3px)}}
.vx-clear{animation:vx-clear 1.1s ease-out;opacity:0}
@keyframes vx-clear{from{opacity:1}to{opacity:0}}
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
  const [sound, setSound] = useState(false);
  const engine = useRef<Sound | null>(null);
  const heard = useRef(0);

  useEffect(() => () => engine.current?.close(), []);

  // the music runs while it plays with sound on
  useEffect(() => {
    if (sound && playing) engine.current?.musicOn();
    else engine.current?.musicOff();
  }, [sound, playing]);

  // each effect sounds as the film passes its moment
  useEffect(() => {
    const from = heard.current;
    heard.current = t;
    if (!sound || !playing || t <= from) return;
    for (const c of CUES)
      if (c.at > from && c.at <= t) engine.current?.play(c.kind, c.dur);
  }, [t, sound, playing]);

  function toggleSound() {
    if (!sound) {
      engine.current ??= new Sound();
      engine.current.start();
    }
    setSound(!sound);
  }

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
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={sound}
          className="inline-flex items-center justify-center rounded-full border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {sound ? "Sound off" : "Sound on"}
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
