"use client";

import { useState } from "react";

export type MapPin = {
  id: string;
  name: string;
  x: number;
  y: number;
  layer: "season" | "past" | "next";
  note: string;
  labelSide?: "left" | "right" | "above" | "below";
  episodes: { n: string; title: string }[];
};

type Props = {
  width: number;
  height: number;
  land: string;
  borders: string;
  graticule: string;
  pins: MapPin[];
  route: string[];
  inset: { name: string; note: string; episodes: { n: string; title: string }[] };
};

const LAYERS = [
  { id: "season", label: "Season one, 2027" },
  { id: "past", label: "1943 strand" },
  { id: "next", label: "Season two" },
] as const;

export default function RouteMap({ width, height, land, borders, graticule, pins, route, inset }: Props) {
  const [active, setActive] = useState<string>("prague");
  const [layers, setLayers] = useState<Record<string, boolean>>({ season: true, past: true, next: true });

  const byId = Object.fromEntries(pins.map((p) => [p.id, p]));
  const routePts = route.map((id) => byId[id]).filter(Boolean);
  const routeD = routePts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const current = active === "newyork" ? null : byId[active];

  const label = (p: MapPin) => {
    const side = p.labelSide ?? "right";
    if (side === "left") return { x: -16, y: 8, anchor: "end" as const };
    if (side === "above") return { x: 0, y: -18, anchor: "middle" as const };
    if (side === "below") return { x: 0, y: 34, anchor: "middle" as const };
    return { x: 16, y: 8, anchor: "start" as const };
  };

  return (
    <div className="map">
      <div className="web-filters" aria-label="Map layers">
        {LAYERS.map((l) => (
          <button
            key={l.id}
            className={`chip chip-${l.id} ${layers[l.id] ? "chip-on" : ""}`}
            aria-pressed={layers[l.id]}
            onClick={() => setLayers((s) => ({ ...s, [l.id]: !s[l.id] }))}
          >
            <span className={`dot dot-${l.id}`} aria-hidden /> {l.label}
          </button>
        ))}
      </div>

      <div className="map-grid">
        <div className="map-frame">
          <svg viewBox={`0 0 ${width} ${height}`} className="map-svg" role="img" aria-label="Map of season one locations">
            <defs>
              <radialGradient id="sea" cx="55%" cy="55%" r="75%">
                <stop offset="0%" stopColor="#15120d" />
                <stop offset="100%" stopColor="#0a0907" />
              </radialGradient>
            </defs>
            <rect width={width} height={height} fill="url(#sea)" />
            <path d={graticule} className="map-graticule" />
            <path d={land} className="map-land" />
            <path d={borders} className="map-borders" />
            {layers.season && <path d={routeD} className="map-route" />}
            {pins.map((p) => {
              if (!layers[p.layer]) return null;
              const l = label(p);
              const on = p.id === active;
              return (
                <g
                  key={p.id}
                  transform={`translate(${p.x} ${p.y})`}
                  className={`map-pin map-pin-${p.layer} ${on ? "is-on" : ""}`}
                  tabIndex={0}
                  role="button"
                  aria-label={p.name}
                  aria-pressed={on}
                  onClick={() => setActive(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(p.id);
                    }
                  }}
                >
                  <circle r={on ? 20 : 0} className="map-pin-halo" />
                  <circle r={on ? 10 : 7} className="map-pin-dot" />
                  <circle r={24} className="map-pin-hit" />
                  <text x={l.x} y={l.y} textAnchor={l.anchor} className="map-pin-label">
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>

          <button
            className={`map-inset ${active === "newyork" ? "is-on" : ""}`}
            onClick={() => setActive("newyork")}
            aria-pressed={active === "newyork"}
          >
            <span className="eyebrow">Across the Atlantic</span>
            <span className="map-inset-name">{inset.name}</span>
            <span className="map-inset-sub">The Burrow</span>
          </button>
        </div>

        <aside className="map-panel" aria-live="polite">
          {current ? (
            <>
              <p className="eyebrow">
                {current.layer === "season" ? "Season one" : current.layer === "past" ? "The 1943 strand" : "Next"}
              </p>
              <h3 className="web-panel-name">{current.name}</h3>
              <p className="web-panel-bio">{current.note}</p>
              {current.episodes.length > 0 && (
                <ul className="map-eps">
                  {current.episodes.map((e) => (
                    <li key={e.n}>
                      <a href={`#ep-${e.n}`}>
                        <span className="mono">{e.n}</span> {e.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <p className="eyebrow">Season one</p>
              <h3 className="web-panel-name">{inset.name}</h3>
              <p className="web-panel-bio">{inset.note}</p>
              <ul className="map-eps">
                {inset.episodes.map((e) => (
                  <li key={e.n}>
                    <a href={`#ep-${e.n}`}>
                      <span className="mono">{e.n}</span> {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
