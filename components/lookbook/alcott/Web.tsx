"use client";

// Adapted from components/CharacterWeb.tsx for The Alcott: people and companies,
// with five kinds of relationship instead of AEGIS's four groups.

import { useMemo, useState } from "react";
import type { Group, Link, LinkKind, Person } from "@/content/lookbook/alcott";

const GROUPS: { id: Group | "all"; label: string }[] = [
  { id: "all", label: "Everyone" },
  { id: "six", label: "The six" },
  { id: "orbit", label: "The orbit" },
  { id: "company", label: "The companies" },
];

const groupName: Record<Group, string> = { six: "The six regulars", orbit: "The orbit", company: "The companies" };

const KINDS: { id: LinkKind; label: string }[] = [
  { id: "romance", label: "Will they, won't they" },
  { id: "friends", label: "Friends" },
  { id: "rivals", label: "Rivals" },
  { id: "business", label: "Business" },
  { id: "wound", label: "Old wounds" },
];

export default function Web({ people, links }: { people: Person[]; links: Link[] }) {
  const [selected, setSelected] = useState<string>("owen");
  const [hover, setHover] = useState<string | null>(null);
  const [filter, setFilter] = useState<Group | "all">("all");

  const byId = useMemo(() => Object.fromEntries(people.map((p) => [p.id, p])), [people]);
  const focus = hover ?? selected;
  const person = byId[selected];
  const related = links.filter((l) => l.a === selected || l.b === selected);

  const visible = (p: Person) => filter === "all" || p.group === filter;
  const touches = (l: Link, id: string) => l.a === id || l.b === id;

  return (
    <div className="web alcott-web">
      <div className="web-filters" role="tablist" aria-label="Filter the map">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={filter === g.id}
            className={`chip ${filter === g.id ? "chip-on" : ""}`}
            onClick={() => setFilter(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="web-grid">
        <div>
          <svg viewBox="0 0 1000 660" className="web-svg" role="img" aria-label="Relationship map of people and companies">
            {links.map((l, i) => {
              const a = byId[l.a];
              const b = byId[l.b];
              if (!a || !b) return null;
              const on = touches(l, focus);
              const dim = !visible(a) && !visible(b);
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={`web-link alcott-link-${l.kind} ${on ? "is-on" : ""} ${dim ? "is-dim" : ""}`}
                />
              );
            })}
            {people.map((p) => {
              const isSel = p.id === selected;
              const isNear = p.id === focus || links.some((l) => touches(l, focus) && touches(l, p.id));
              const dim = !visible(p);
              const r = isSel ? 15 : 11;
              return (
                <g
                  key={p.id}
                  transform={`translate(${p.x} ${p.y})`}
                  className={`web-node alcott-node-${p.group} ${isSel ? "is-sel" : ""} ${isNear ? "is-near" : ""} ${dim ? "is-dim" : ""}`}
                  tabIndex={0}
                  role="button"
                  aria-label={`${p.name}, ${p.role}`}
                  aria-pressed={isSel}
                  onClick={() => setSelected(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(p.id);
                    }
                  }}
                  onMouseEnter={() => setHover(p.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(p.id)}
                  onBlur={() => setHover(null)}
                >
                  {p.group === "company" ? (
                    <rect x={-r} y={-r} width={r * 2} height={r * 2} rx="4" className="web-dot" />
                  ) : (
                    <circle r={r} className="web-dot" />
                  )}
                  <circle r={isSel ? 26 : 0} className="web-halo" />
                  <text y={-24} textAnchor="middle" className="web-name">
                    {p.name}
                  </text>
                  <text y={34} textAnchor="middle" className="web-role">
                    {p.role.split(" · ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
          <ul className="alcott-legend" aria-label="Line key">
            {KINDS.map((k) => (
              <li key={k.id}>
                <svg width="28" height="8" aria-hidden>
                  <line x1="0" y1="4" x2="28" y2="4" className={`web-link alcott-link-${k.id} is-on`} />
                </svg>
                {k.label}
              </li>
            ))}
          </ul>
        </div>

        <aside className="web-panel" aria-live="polite">
          {person && (
            <>
              <p className="eyebrow">{groupName[person.group]}</p>
              <h3 className="web-panel-name">{person.name}</h3>
              <p className="web-panel-role">{person.role}</p>
              <p className="web-panel-bio">{person.bio}</p>
              {person.line && <blockquote className="web-panel-line">&ldquo;{person.line}&rdquo;</blockquote>}
              {related.length > 0 && (
                <ul className="web-panel-links">
                  {related.map((l, i) => {
                    const other = byId[l.a === person.id ? l.b : l.a];
                    return (
                      <li key={i}>
                        <button className="linklike" onClick={() => setSelected(other.id)}>
                          {other.name}
                        </button>
                        <span>{l.label}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
