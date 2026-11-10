"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Space } from "@/content/lookbook/alcott";

// A cutaway of The Alcott. Every lit space is a button; the panel shows who is there,
// what happens there and one detail from the bible. The freight elevator only moves
// for people who know the trick.

const TRICK = [
  { id: "panel", label: "Pry open the brass panel" },
  { id: "relay", label: "Tap the relay twice" },
  { id: "wiggle", label: "Wiggle the connector" },
  { id: "kick", label: "Kick the door, low" },
] as const;
// Shown out of order, so it is a trick and not a menu.
const TRICK_SHOWN = ["kick", "relay", "panel", "wiggle"] as const;

// String lights: nine bulbs on a sagging wire. One is dead, one is thinking about it.
const BULBS = Array.from({ length: 9 }, (_, i) => {
  const t = (i + 1) / 10;
  const x = (1 - t) ** 2 * 250 + 2 * (1 - t) * t * 495 + t ** 2 * 740;
  const y = (1 - t) ** 2 * 124 + 2 * (1 - t) * t * 172 + t ** 2 * 124;
  return { x, y, state: i === 5 ? "out" : i === 2 ? "flicker" : "on" };
});

type Ctx = { sel: string; pick: (id: string) => void; byId: Record<string, Space> };
const BuildingCtx = createContext<Ctx>({ sel: "", pick: () => {}, byId: {} });

// One focusable group per space. The shapes inside it are art; the hit rects take the highlight.
function Area({ id, children }: { id: string; children: ReactNode }) {
  const { sel, pick, byId } = useContext(BuildingCtx);
  const s = byId[id];
  if (!s) return null;
  return (
    <g
      className={`alcott-space alcott-space-${id} ${sel === id ? "is-on" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`${s.name}. ${s.kicker}`}
      aria-pressed={sel === id}
      onClick={() => pick(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pick(id);
        }
      }}
    >
      {children}
    </g>
  );
}

export default function Building({ spaces, epTitles }: { spaces: Space[]; epTitles: Record<string, string> }) {
  const [sel, setSel] = useState<string>("hall");
  const [step, setStep] = useState(0);
  const [msg, setMsg] = useState<string>("");
  const [carUp, setCarUp] = useState(false);

  const byId = Object.fromEntries(spaces.map((s) => [s.id, s]));
  const space = byId[sel];
  const onsite = spaces.filter((s) => !s.offsite);
  const glass = spaces.find((s) => s.offsite);

  const pick = (id: string) => setSel(id);

  const tryStep = (id: string) => {
    if (carUp) return;
    if (TRICK[step].id === id) {
      const next = step + 1;
      if (next === TRICK.length) {
        setStep(0);
        setCarUp(true);
        setMsg("A groan, a rattle, and up she goes. Fourth floor. You know the trick now, which makes it a little bit your building.");
      } else {
        setStep(next);
        setMsg(["", "The panel's open. The contact's corroded.", "Something hums, faintly interested.", "One more thing. You know where."][next]);
      }
    } else {
      setStep(0);
      setMsg("Clank. A long groan from somewhere deep in the building. Nothing. Start over.");
    }
  };

  return (
    <BuildingCtx.Provider value={{ sel, pick, byId }}>
    <div className="alcott-building">
      <div className="web-filters alcott-space-chips" aria-label="Spaces in the building">
        {[...onsite, ...(glass ? [glass] : [])].map((s) => (
          <button key={s.id} className={`chip ${sel === s.id ? "chip-on" : ""}`} aria-pressed={sel === s.id} onClick={() => pick(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="web-grid">
        <div className="alcott-building-frame">
          <svg viewBox="0 40 1000 760" className="alcott-building-svg" role="group" aria-label="Cutaway of The Alcott. Select a space.">
            <defs>
              <linearGradient id="alc-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F7E3BC" />
                <stop offset="0.7" stopColor="#F4EDE1" />
              </linearGradient>
              <pattern id="alc-paper" width="14" height="14" patternUnits="userSpaceOnUse">
                <rect width="14" height="14" fill="none" />
                <path d="M7 0 V14" stroke="#8A5A12" strokeOpacity="0.07" strokeWidth="3" />
                <circle cx="0" cy="7" r="1.4" fill="#8A5A12" fillOpacity="0.12" />
              </pattern>
              <pattern id="alc-cage" width="12" height="12" patternUnits="userSpaceOnUse">
                <path d="M0 0 L12 12 M12 0 L0 12" stroke="#5C5243" strokeOpacity="0.35" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Sky, sun, and the Bay Bridge between two towers */}
            <rect x="0" y="0" width="1000" height="712" fill="url(#alc-sky)" />
            <circle cx="880" cy="118" r="68" fill="#F2C46B" opacity="0.35" />
            <rect x="800" y="70" width="46" height="520" fill="#DCD4C5" />
            <rect x="935" y="40" width="52" height="550" fill="#D3CBBC" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <g key={i} fill="#C3BBAC">
                <rect x="808" y={90 + i * 52} width="30" height="4" />
                <rect x="944" y={62 + i * 56} width="34" height="4" />
              </g>
            ))}
            <g stroke="#8E98A4" strokeWidth="2.5" fill="none" className="alcott-bridge">
              <path d="M846 206 H935" />
              <path d="M866 158 V214 M914 158 V214" />
              <path d="M846 192 Q856 162 866 158 Q890 196 914 158 Q926 162 935 192" strokeWidth="1.6" />
            </g>

            {/* Street, earth, sidewalk */}
            <rect x="0" y="712" width="1000" height="88" fill="#A89D8A" />
            <rect x="0" y="700" width="1000" height="12" fill="#C8BCA7" />

            {/* The building shell */}
            <rect x="170" y="190" width="590" height="510" fill="#EADCC3" stroke="#8C7456" strokeWidth="3" />
            <rect x="170" y="190" width="590" height="510" fill="url(#alc-paper)" />
            <rect x="162" y="182" width="606" height="12" fill="#B98A3E" />
            {[352, 466, 576].map((y) => (
              <rect key={y} x="170" y={y} width="590" height="6" fill="#C9B28A" />
            ))}

            {/* Floor 3: facade, windows, and the banner hanging by one zip tie */}
            {[250, 330, 410, 490, 570, 650].map((x) => (
              <g key={x}>
                <rect x={x} y="374" width="44" height="62" fill="#C7D6DB" stroke="#8C7456" strokeWidth="2" />
                <path d={`M${x + 22} 374 V436 M${x} 405 H${x + 44}`} stroke="#8C7456" strokeWidth="1.5" />
                <rect x={x - 4} y="368" width="52" height="6" fill="#C9B28A" />
              </g>
            ))}
            <g className="alcott-banner-svg" transform="rotate(6 236 392)">
              <rect x="236" y="384" width="470" height="40" fill="#FBF7EF" stroke="#C0582E" strokeWidth="2" />
              <text x="471" y="410" textAnchor="middle" className="alcott-svg-banner">
                THE ALCOTT: A FOUNDER COMMUNITY
              </text>
              <circle cx="246" cy="394" r="3" fill="#C0582E" />
              <circle cx="696" cy="394" r="3" fill="none" stroke="#C0582E" strokeWidth="1.5" />
            </g>
            <path d="M236 392 L230 382" stroke="#1E1A14" strokeWidth="2" />

            {/* Floor 2 windows, east side */}
            {[500, 580, 660].map((x) => (
              <g key={x}>
                <rect x={x} y="490" width="44" height="62" fill="#C7D6DB" stroke="#8C7456" strokeWidth="2" />
                <path d={`M${x + 22} 490 V552 M${x} 521 H${x + 44}`} stroke="#8C7456" strokeWidth="1.5" />
              </g>
            ))}

            {/* ---------- ROOF ---------- */}
            <Area id="roof">
              <rect x="236" y="96" width="524" height="88" className="alcott-hit" />
              <path d="M250 184 V120 M740 184 V120" stroke="#5C5243" strokeWidth="3" />
              <path d="M250 124 Q495 220 740 124" fill="none" stroke="#5C5243" strokeWidth="1.5" />
              {BULBS.map((b, i) => (
                <circle
                  key={i}
                  cx={b.x}
                  cy={b.y + 6}
                  r="6"
                  className={`alcott-bulb alcott-bulb-${b.state}`}
                />
              ))}
              <rect x="568" y="156" width="92" height="28" rx="7" fill="#CFE1E6" stroke="#8C7456" strokeWidth="2" />
              <rect x="572" y="152" width="84" height="8" rx="3" fill="#7A5A3A" />
              {[584, 604, 624, 644].map((x, i) => (
                <g key={x}>
                  <path d={`M${x} 152 V${136 - (i % 2) * 6}`} stroke="#5E7F45" strokeWidth="2" />
                  <circle cx={x} cy={134 - (i % 2) * 6} r="7" fill="#6B8E4E" />
                  <circle cx={x + 4} cy={142} r="3" fill="#C0582E" />
                </g>
              ))}
              <g stroke="#5C5243" strokeWidth="2.5" fill="none">
                <path d="M330 184 L346 156 M346 184 L330 156 M328 156 H350" />
                <path d="M380 184 L396 156 M396 184 L380 156 M378 156 H400" />
              </g>
              <path d="M236 168 H760" stroke="#8C7456" strokeWidth="1.5" />
              {[260, 300, 340, 380, 420, 460, 500, 540, 580, 620, 660, 700, 740].map((x) => (
                <path key={x} d={`M${x} 168 V184`} stroke="#8C7456" strokeWidth="1.5" />
              ))}
              <text x="250" y="108" className="alcott-svg-tag">
                THE ROOF
              </text>
            </Area>

            {/* Stair bulkhead and elevator machine room */}
            <rect x="172" y="138" width="60" height="46" fill="#D8C7A8" stroke="#8C7456" strokeWidth="2" />

            {/* ---------- FOURTH FLOOR ---------- */}
            <Area id="4a">
              <rect x="226" y="196" width="133" height="116" fill="#F0E4CD" />
              <rect x="226" y="196" width="133" height="116" className="alcott-hit" />
              <path d="M310 196 V214" stroke="#5C5243" strokeWidth="1.5" />
              <circle cx="310" cy="220" r="6" fill="#F2C46B" />
              <rect x="240" y="240" width="32" height="40" fill="#C7D6DB" stroke="#8C7456" strokeWidth="2" />
              {[
                [282, 288, "#C0582E"],
                [312, 288, "#4A7A8C"],
                [296, 268, "#6B8E4E"],
                [326, 268, "#8A5A12"],
              ].map(([x, y, c]) => (
                <g key={`${x}-${y}`}>
                  <rect x={x as number} y={y as number} width="26" height="22" fill="#C9A27A" stroke="#8C6E4E" />
                  <rect x={(x as number) + 3} y={(y as number) + 3} width="8" height="5" fill={c as string} />
                </g>
              ))}
              <text x="234" y="228" className="alcott-svg-unit">4A</text>
              <text x="292" y="236" className="alcott-svg-name">Margot</text>
            </Area>

            <Area id="4b">
              <rect x="359" y="196" width="134" height="116" fill="#ECE4D2" />
              <rect x="359" y="196" width="134" height="116" className="alcott-hit" />
              <rect x="363" y="236" width="16" height="74" fill="#2D3138" />
              {[246, 258, 270, 282].map((y, i) => (
                <circle key={y} cx="371" cy={y} r="2" className={i === 1 ? "alcott-led alcott-led-amber" : "alcott-led"} />
              ))}
              <rect x="385" y="236" width="56" height="32" fill="#FFFFFF" stroke="#9AA3AE" strokeWidth="2" />
              <text x="413" y="257" textAnchor="middle" className="alcott-svg-marker">31 ≠ 40</text>
              <rect x="447" y="236" width="38" height="32" fill="#FFFFFF" stroke="#9AA3AE" strokeWidth="2" />
              <path d="M453 247 h22 M453 254 h15 M453 260 h20" stroke="#4A7A8C" strokeWidth="1.5" />
              <path d="M388 312 V290 Q388 284 394 284 H448 Q454 284 454 290 V312 Z" fill="#9A7A56" />
              <g transform="translate(472 300)" className="alcott-gear-svg">
                <circle r="6" fill="none" stroke="#4A5568" strokeWidth="3" strokeDasharray="2.4 1.6" />
                <circle r="2" fill="#4A5568" />
              </g>
              <text x="367" y="226" className="alcott-svg-unit">4B</text>
              <text x="405" y="226" className="alcott-svg-name">Owen + Ellis</text>
            </Area>

            <Area id="4c">
              <rect x="493" y="196" width="133" height="116" fill="#F3DCC8" />
              <rect x="493" y="196" width="133" height="116" className="alcott-hit" />
              <rect x="504" y="292" width="46" height="9" rx="2" fill="#4A5568" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <rect key={i} x={507 + i * 6} y="294" width="4" height="4" fill="#F4EDE1" />
              ))}
              {[566, 590].map((x, i) => (
                <g key={x}>
                  <path d={`M${x - 8} 296 H${x + 8} L${x + 6} 312 H${x - 6} Z`} fill="#C0582E" />
                  <circle cx={x - 4} cy={288 - i * 4} r="6" fill="#6B8E4E" />
                  <circle cx={x + 4} cy={284 - i * 4} r="6" fill="#7FA05F" />
                </g>
              ))}
              <rect x="604" y="246" width="15" height="23" rx="2" fill="#FBF7EF" stroke="#8A5A12" strokeWidth="1.5" />
              <circle cx="611.5" cy="257.5" r="4" fill="none" stroke="#8A5A12" strokeWidth="1.5" />
              {[612, 618].map((x) => (
                <g key={x}>
                  <rect x={x} y="300" width="5" height="12" fill="#F4EDE1" stroke="#C9A27A" />
                  <path d={`M${x + 2.5} 300 v-4`} stroke="#E0952F" strokeWidth="2" />
                </g>
              ))}
              <text x="501" y="226" className="alcott-svg-unit">4C</text>
              <text x="539" y="226" className="alcott-svg-name">Val + Wren</text>
            </Area>

            <Area id="4d">
              <rect x="626" y="196" width="134" height="116" fill="#DCE3D8" />
              <rect x="626" y="196" width="200" height="116" className="alcott-hit" />
              <rect x="734" y="232" width="22" height="56" fill="#C7D6DB" stroke="#8C7456" strokeWidth="2" />
              <path d="M652 236 h22 l-3 34 h-16 Z" fill="#1F2A44" />
              <path d="M663 236 v-8" stroke="#5C5243" strokeWidth="2" />
              {[0, 1, 2].map((i) => (
                <rect key={i} x={690 + i * 10} y="292" width="7" height="12" rx="1.5" fill="#2D3138" />
              ))}
              {/* fire escape and the horse trough */}
              <g stroke="#3A3328" strokeWidth="2" fill="none">
                <path d="M760 312 H824 M760 466 H824 M760 576 H824" />
                <path d="M824 312 V318 M824 466 V472 M824 576 V582" />
                <path d="M770 318 L816 460 M770 472 L816 570" />
              </g>
              <rect x="770" y="288" width="50" height="24" rx="5" fill="#A7AFB8" stroke="#5C5243" strokeWidth="2" />
              <rect x="773" y="288" width="44" height="6" rx="2" fill="#DCEFF4" />
              <g className="alcott-steam" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round">
                <path d="M784 282 q-6 -8 0 -16 q6 -8 0 -16" />
                <path d="M800 282 q-6 -8 0 -16 q6 -8 0 -16" />
              </g>
              <text x="634" y="226" className="alcott-svg-unit">4D</text>
              <text x="672" y="226" className="alcott-svg-name">Kabir</text>
            </Area>

            {[359, 493, 626].map((x) => (
              <path key={x} d={`M${x} 196 V312`} stroke="#8C7456" strokeWidth="3" />
            ))}

            <Area id="hall">
              <rect x="226" y="312" width="534" height="40" fill="#D6B98C" />
              <rect x="226" y="312" width="534" height="40" fill="url(#alc-paper)" />
              <rect x="226" y="312" width="534" height="40" className="alcott-hit" />
              {[
                [288, "4A"],
                [420, "4B"],
                [560, "4C"],
                [692, "4D"],
              ].map(([x, n]) => (
                <g key={n as string}>
                  <rect x={(x as number) - 13} y="318" width="26" height="14" rx="2" fill="#B98A3E" />
                  <text x={x as number} y="329" textAnchor="middle" className="alcott-svg-plate">
                    {n}
                  </text>
                </g>
              ))}
              <g className="alcott-radiator">
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} x={472 + i * 9} y="330" width="7" height="20" rx="3.5" fill="#8C5A3C" />
                ))}
                <rect x="470" y="324" width="48" height="6" rx="1.5" fill="#C8CCD2" stroke="#8E98A4" />
                <rect x="500" y="318" width="12" height="8" fill="#FFFFFF" stroke="#5C5243" strokeWidth="0.8" transform="rotate(-8 506 322)" />
              </g>
            </Area>

            {/* ---------- SECOND FLOOR ---------- */}
            <Area id="2a">
              <rect x="226" y="472" width="244" height="104" fill="#E7D2B5" />
              <rect x="226" y="472" width="244" height="104" className="alcott-hit" />
              <ellipse cx="250" cy="524" rx="10" ry="44" fill="#F0C987" stroke="#8C6E4E" strokeWidth="2" transform="rotate(-8 250 524)" />
              <path d="M250 486 V560" stroke="#C0582E" strokeWidth="2" transform="rotate(-8 250 524)" />
              <path d="M300 500 h22 l-2 44 h-6 l-3 -30 l-3 30 h-6 Z" fill="#2D3138" />
              <path d="M311 492 v8" stroke="#5C5243" strokeWidth="2" />
              <rect x="338" y="558" width="58" height="16" rx="3" fill="#C9B8E0" opacity="0.6" />
              <rect x="338" y="552" width="16" height="8" rx="3" fill="#F4EDE1" />
              <rect x="404" y="472" width="66" height="104" fill="#CDB894" />
              <rect x="414" y="502" width="44" height="70" rx="9" fill="#8C5A3C" stroke="#5C3A24" strokeWidth="2" />
              <circle cx="436" cy="520" r="7" fill="#F4EDE1" stroke="#5C3A24" strokeWidth="2" />
              <path d="M436 520 l4 -4" stroke="#C0582E" strokeWidth="1.5" />
              <path d="M426 502 V478 M446 502 V478" stroke="#8E98A4" strokeWidth="5" />
              <text x="436" y="566" textAnchor="middle" className="alcott-svg-tiny">BOILER</text>
              <text x="234" y="494" className="alcott-svg-unit">2A</text>
              <text x="272" y="494" className="alcott-svg-name">Dutch</text>
            </Area>

            {/* ---------- GROUND FLOOR ---------- */}
            <Area id="lobby">
              <rect x="172" y="138" width="50" height="654" fill="url(#alc-cage)" />
              <rect x="226" y="582" width="104" height="118" fill="#EFE0C2" />
              <rect x="172" y="138" width="50" height="654" className="alcott-hit" />
              <rect x="226" y="582" width="104" height="118" className="alcott-hit" />
              {[0, 1, 2, 3].map((c) =>
                [0, 1, 2].map((r) => <rect key={`${c}${r}`} x={238 + c * 14} y={616 + r * 12} width="11" height="9" fill="#B98A3E" stroke="#8A5A12" strokeWidth="0.8" />),
              )}
              <path d="M300 582 V592" stroke="#5C5243" strokeWidth="1.5" />
              <path d="M286 600 Q300 612 314 600" fill="none" stroke="#B98A3E" strokeWidth="2" />
              {[288, 296, 304, 312].map((x, i) => (i === 1 || i === 3 ? null : <circle key={x} cx={x} cy="606" r="2.5" fill="#F4EDE1" stroke="#B98A3E" />))}
              <g className="alcott-car" style={{ transform: `translateY(${carUp ? -348 : 0}px)` }}>
                <rect x="176" y="636" width="42" height="62" fill="#C99A4A" stroke="#6B430A" strokeWidth="2" />
                <path d="M183 640 V694 M190 640 V694 M197 640 V694 M204 640 V694 M211 640 V694" stroke="#6B430A" strokeWidth="1.2" />
              </g>
              <text x="234" y="604" className="alcott-svg-tag">LOBBY</text>
            </Area>

            <Area id="moonshot">
              <rect x="330" y="582" width="430" height="118" fill="#F2E3C6" />
              <rect x="330" y="582" width="430" height="118" className="alcott-hit" />
              <text x="352" y="600" className="alcott-svg-tiny">IN MEMORIAM</text>
              {[0, 1, 2, 3, 4].map((c) =>
                [0, 1].map((r) => <rect key={`${c}${r}`} x={350 + c * 22} y={606 + r * 22} width="18" height="16" fill="#FBF7EF" stroke="#8C6E4E" strokeWidth="1.5" />),
              )}
              {[488, 528].map((x) => (
                <g key={x}>
                  <rect x={x} y="610" width="34" height="90" rx="3" fill="#B98A3E" stroke="#6B430A" strokeWidth="2" />
                  <rect x={x + 6} y="620" width="22" height="34" fill="#DDE6E8" />
                </g>
              ))}
              <rect x="590" y="664" width="86" height="36" fill="#9A7A56" />
              <rect x="616" y="616" width="26" height="32" fill="#A88A62" stroke="#6B4E30" strokeWidth="2" />
              <path d="M620 620 l18 24 M638 620 l-18 24" stroke="#6B4E30" strokeWidth="0.8" opacity="0.5" />
              <rect x="656" y="642" width="8" height="22" fill="#8E98A4" />
              <path d="M660 664 v4" stroke="#E8D9A8" strokeWidth="3" />
              {["#C0582E", "#4A7A8C", "#F0C987"].map((c, i) => (
                <ellipse key={c} cx={712 + i * 14} cy="652" rx="6" ry="44" fill={c} stroke="#5C5243" strokeWidth="1.2" />
              ))}
              <text x="590" y="600" className="alcott-svg-sign">MOONSHOT COMMONS</text>
            </Area>
            <path d="M330 582 V700" stroke="#8C7456" strokeWidth="3" />

            {/* ---------- BASEMENT ---------- */}
            <Area id="basement">
              <rect x="226" y="716" width="534" height="76" fill="#BCA785" />
              <rect x="226" y="716" width="534" height="76" className="alcott-hit" />
              <rect x="430" y="734" width="124" height="44" rx="22" fill="#EFEAE0" stroke="#4A5568" strokeWidth="2.5" />
              <circle cx="470" cy="756" r="9" fill="#C7D6DB" stroke="#4A5568" strokeWidth="2" />
              <path d="M500 744 h40" stroke="#C0582E" strokeWidth="2" strokeDasharray="4 3" />
              <text x="236" y="736" className="alcott-svg-tag">BASEMENT</text>
            </Area>
            <rect x="170" y="712" width="590" height="4" fill="#8C7456" />

            {/* ---------- NEXT DOOR ---------- */}
            <Area id="bodega">
              <rect x="832" y="592" width="156" height="108" fill="#E5CCA8" stroke="#8C7456" strokeWidth="2" />
              <rect x="832" y="560" width="156" height="140" className="alcott-hit" />
              <rect x="842" y="566" width="136" height="24" fill="#1E1A14" />
              <text x="910" y="583" textAnchor="middle" className="alcott-svg-bodega">BODEGA</text>
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <path key={i} d={`M${832 + i * 22.3} 592 h22.3 l-2 18 h-18.3 Z`} fill={i % 2 ? "#FBF7EF" : "#C0582E"} />
              ))}
              <rect x="844" y="624" width="82" height="64" fill="#DDE6E8" stroke="#8C7456" strokeWidth="2" />
              {[0, 1, 2].map((r) =>
                [0, 1, 2, 3, 4, 5].map((c) => (
                  <rect key={`${r}${c}`} x={849 + c * 12.5} y={630 + r * 14} width="8" height="9" fill={["#C0582E", "#F2C46B", "#4A7A8C", "#6B8E4E"][(r + c) % 4]} opacity="0.8" />
                )),
              )}
              <ellipse cx="884" cy="680" rx="22" ry="6" fill="#E0B878" />
              <ellipse cx="884" cy="673" rx="11" ry="6" fill="#3A3328" />
              <circle cx="894" cy="668" r="5" fill="#3A3328" />
              <path d="M891 664 l1.5 -5 2 4 M896 664 l2 -4.5 1 5" fill="#3A3328" stroke="#3A3328" strokeWidth="1" />
              <rect x="940" y="628" width="36" height="72" fill="#7A5A3A" />
              <circle cx="968" cy="666" r="2" fill="#F2C46B" />
            </Area>

            {/* ---------- THE VAN ---------- */}
            <Area id="van">
              <rect x="18" y="630" width="146" height="72" className="alcott-hit" />
              <path d="M32 692 V656 Q32 640 48 640 H134 Q150 640 152 656 L156 672 V692 Z" fill="#F1E6CC" stroke="#8C7456" strokeWidth="2" />
              <path d="M32 672 H156 V692 H32 Z" fill="#D9C7A1" />
              <rect x="42" y="648" width="26" height="16" rx="2" fill="#C7D6DB" />
              <rect x="74" y="648" width="26" height="16" rx="2" fill="#C7D6DB" />
              <rect x="106" y="648" width="22" height="16" rx="2" fill="#C7D6DB" />
              <path d="M134 648 H146 L150 664 H134 Z" fill="#C7D6DB" />
              <circle cx="56" cy="694" r="10" fill="#3A3328" />
              <circle cx="56" cy="694" r="4" fill="#C8BCA7" />
              <circle cx="132" cy="694" r="10" fill="#3A3328" />
              <circle cx="132" cy="694" r="4" fill="#C8BCA7" />
              <circle cx="146" cy="680" r="3" fill="#E0952F" className="alcott-engine-light" />
              <text x="92" y="686" textAnchor="middle" className="alcott-svg-tiny">1987</text>
            </Area>

            {/* ---------- THE WAY TO SAND HILL ---------- */}
            <Area id="glass">
              <rect x="14" y="548" width="140" height="80" className="alcott-hit" />
              <path d="M84 576 V630" stroke="#5C5243" strokeWidth="3" />
              <rect x="20" y="556" width="128" height="24" rx="3" fill="#2F5D46" />
              <text x="84" y="572" textAnchor="middle" className="alcott-svg-street">← SAND HILL RD</text>
            </Area>
          </svg>

          {glass && (
            <button className={`alcott-offsite ${sel === glass.id ? "is-on" : ""}`} onClick={() => pick(glass.id)} aria-pressed={sel === glass.id}>
              <span className="eyebrow">{glass.kicker}</span>
              <span className="alcott-offsite-name">{glass.name}</span>
              <span className="alcott-offsite-sub mono">One glass wall, oak trees and money</span>
            </button>
          )}
        </div>

        <aside className="web-panel alcott-panel" aria-live="polite">
          {space && (
            <>
              <p className="eyebrow">{space.kicker}</p>
              <h3 className="web-panel-name">{space.name}</h3>
              <p className="web-panel-role">{space.who}</p>
              <p className="web-panel-bio">{space.happens}</p>
              <p className="alcott-panel-label mono">The detail</p>
              <p className="web-panel-bio">{space.detail}</p>
              {space.card && <p className="alcott-card">{space.card}</p>}
              {space.line && (
                <blockquote className="web-panel-line alcott-line">
                  &ldquo;{space.line.text}&rdquo;
                  <cite className="mono">
                    {space.line.who} · {space.line.from}
                  </cite>
                </blockquote>
              )}

              {space.id === "lobby" && (
                <div className="alcott-trick">
                  <p className="alcott-panel-label mono">Try the trick</p>
                  <div className="alcott-trick-row">
                    {TRICK_SHOWN.map((id) => {
                      const t = TRICK.find((x) => x.id === id)!;
                      return (
                        <button key={id} className="chip" onClick={() => tryStep(id)} disabled={carUp}>
                          {t.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="alcott-trick-dots" aria-hidden>
                    {TRICK.map((t, i) => (
                      <span key={t.id} className={i < step || carUp ? "is-done" : ""} />
                    ))}
                  </p>
                  <p className="alcott-trick-msg" role="status">
                    {msg || "Hint: do it the way Owen does. Open it up before you hit it."}
                  </p>
                  {carUp && (
                    <button
                      className="linklike"
                      onClick={() => {
                        setCarUp(false);
                        setMsg("Back down to the lobby. It will not be this easy for the next person.");
                      }}
                    >
                      Send it back down
                    </button>
                  )}
                </div>
              )}

              {space.episodes.length > 0 && (
                <ul className="map-eps alcott-eps">
                  {space.episodes.map((n) => (
                    <li key={n}>
                      <a href={`#ep-${n}`}>
                        <span className="mono">{n}</span>
                        {epTitles[n]}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </aside>
      </div>
    </div>
    </BuildingCtx.Provider>
  );
}
