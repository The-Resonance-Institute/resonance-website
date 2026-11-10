"use client";

// Copy of components/CharacterWeb.tsx adapted to The Unfinished's groups and link kinds.
import { useMemo, useState } from "react";
import type { Group, Link, Person } from "@/content/lookbook/unfinished";

export default function CharacterWeb({
  people,
  links,
  groups,
}: {
  people: Person[];
  links: Link[];
  groups: { id: Group; label: string }[];
}) {
  const [selected, setSelected] = useState<string>("elias");
  const [hover, setHover] = useState<string | null>(null);
  const [filter, setFilter] = useState<Group | "all">("all");

  const byId = useMemo(() => Object.fromEntries(people.map((p) => [p.id, p])), [people]);
  const groupName = useMemo(() => Object.fromEntries(groups.map((g) => [g.id, g.label])) as Record<Group, string>, [groups]);
  const focus = hover ?? selected;
  const person = byId[selected];
  const related = links.filter((l) => l.a === selected || l.b === selected);

  const visible = (p: Person) => filter === "all" || p.group === filter;
  const touches = (l: Link, id: string) => l.a === id || l.b === id;

  return (
    <div className="web unf-web">
      <div className="web-filters" role="tablist" aria-label="Filter characters">
        {[{ id: "all" as const, label: "Everyone" }, ...groups].map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={filter === g.id}
            className={`chip ${filter === g.id ? "chip-on" : ""}`}
            onClick={() => setFilter(g.id)}
          >
            {g.id !== "all" && <span className={`unf-key unf-key-${g.id}`} aria-hidden />}
            {g.label}
          </button>
        ))}
      </div>

      <div className="web-grid">
        <svg viewBox="0 0 1000 660" className="web-svg unf-web-svg" role="img" aria-label="Character relationship map">
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
                className={`unf-link unf-link-${l.kind} ${on ? "is-on" : ""} ${dim ? "is-dim" : ""}`}
              />
            );
          })}
          {people.map((p) => {
            const isSel = p.id === selected;
            const isNear = p.id === focus || links.some((l) => touches(l, focus) && touches(l, p.id));
            const dim = !visible(p);
            return (
              <g
                key={p.id}
                transform={`translate(${p.x} ${p.y})`}
                className={`web-node unf-node unf-node-${p.group} ${isSel ? "is-sel" : ""} ${isNear ? "is-near" : ""} ${dim ? "is-dim" : ""}`}
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
                <circle r={isSel ? 15 : 11} className="web-dot" />
                <circle r={isSel ? 24 : 0} className="web-halo" />
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
      <ul className="unf-web-legend mono" aria-label="Line types">
        <li><span className="unf-lg unf-lg-blood" aria-hidden />Family</li>
        <li><span className="unf-lg unf-lg-bond" aria-hidden />Bond</li>
        <li><span className="unf-lg unf-lg-pressure" aria-hidden />Pressure</li>
        <li><span className="unf-lg unf-lg-thread" aria-hidden />Thread</li>
      </ul>
    </div>
  );
}
