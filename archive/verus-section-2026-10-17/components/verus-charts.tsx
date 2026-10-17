// PROJECT VERUS, INSIDE VERUS, 2026-10-13. A still picture of the product, drawn here rather than shown as a
// screenshot so it reads at any width. Nothing on it is live and nothing is clickable: every number comes from
// content/verus-demo.json, captured from a run of the VERUS demonstration, and is never typed by hand.
//
// The series colours are the product's own (a fixed order validated for colour vision and contrast), so this page
// and the screenshots on How it works look like the same thing. Text stays in the site's ink, never a series colour.

export type DemoRow = {
  period: string | null;
  member: string | null;
  name: string | null;
  currency: string | null;
  value: number | null;
};

export type DemoTile = {
  title: string;
  period: string;
  unit: string | null;
  kind: "bar" | "line" | "none";
  caveat: string | null;
  rows: DemoRow[];
};

const SERIES = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100"];
const GRID = "#e8e5dd";
const AXIS = "#5b6472";

function niceMax(v: number): number {
  if (v <= 0) return 1;
  const p = 10 ** Math.floor(Math.log10(v));
  for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= v) return m * p;
  return 10 * p;
}

function tick(v: number, unit: string | null): string {
  if (unit === "percent") return `${(v * 100).toFixed(v !== 0 && v < 0.1 ? 1 : 0)}%`;
  const short = (n: number) => String(Number(n.toFixed(2))); // 1.25, 2.5, 3: never a rounded gridline
  if (v >= 1e6) return `${short(v / 1e6)}M`;
  if (v >= 1e3) return `${short(v / 1e3)}k`;
  return short(v);
}

export function money(v: number, currency: string | null): string {
  const n = Math.round(v).toLocaleString("en-US");
  if (currency === "CAD") return `C$${n}`;
  if (currency && currency !== "USD") return `${n} ${currency}`;
  return `$${n}`;
}

export function value(v: number | null, unit: string | null, currency: string | null = null): string {
  if (v === null) return "none";
  if (unit === "percent") return `${(v * 100).toFixed(1)}%`;
  if (unit === "currency") return money(v, currency);
  const n = v.toLocaleString("en-US", { maximumFractionDigits: Number.isInteger(v) ? 0 : 1 });
  if (unit === "minutes") return `${n} min`;
  if (unit === "hours") return `${n} h`;
  return n;
}

function name(r: DemoRow): string {
  return r.name ?? r.member ?? "(none)";
}

function Bars({ tile }: { tile: DemoTile }) {
  const W = 320;
  const H = 190;
  const left = 46;
  const bottom = 40;
  const top = 18;
  const rows = tile.rows.filter((r) => r.value !== null);
  const max = niceMax(Math.max(...rows.map((r) => r.value ?? 0)));
  const plotH = H - top - bottom;
  const slot = (W - left - 8) / Math.max(rows.length, 1);
  const bar = Math.min(56, slot * 0.5);
  const mixed = new Set(rows.map((r) => r.currency).filter(Boolean)).size > 1;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={tile.title} className="h-auto w-full">
      {ticks.map((t) => {
        const y = top + plotH - (t / max) * plotH;
        return (
          <g key={t}>
            <line x1={left} x2={W - 8} y1={y} y2={y} stroke={GRID} strokeWidth={1} />
            <text x={left - 6} y={y + 3.5} textAnchor="end" fontSize={10} fill={AXIS}>
              {tick(t, tile.unit)}
            </text>
          </g>
        );
      })}
      {rows.map((r, i) => {
        const h = ((r.value ?? 0) / max) * plotH;
        const x = left + slot * i + (slot - bar) / 2;
        const y = top + plotH - h;
        const rad = Math.min(4, h / 2);
        const label = name(r);
        return (
          <g key={`${r.member}-${i}`}>
            <path
              d={`M${x},${top + plotH} V${y + rad} Q${x},${y} ${x + rad},${y} H${x + bar - rad} Q${x + bar},${y} ${x + bar},${y + rad} V${top + plotH} Z`}
              fill={SERIES[0]}
            />
            <text x={x + bar / 2} y={y - 5} textAnchor="middle" fontSize={10.5} fill="#1f2937" fontWeight={600}>
              {value(r.value, tile.unit, r.currency)}
            </text>
            <text x={left + slot * i + slot / 2} y={H - bottom + 16} textAnchor="middle" fontSize={10.5} fill={AXIS}>
              {label.length > 24 ? `${label.slice(0, 23)}…` : label}
              {mixed && r.currency ? (
                <tspan x={left + slot * i + slot / 2} dy={13}>
                  in {r.currency}
                </tspan>
              ) : null}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Lines({ tile }: { tile: DemoTile }) {
  const W = 320;
  const H = 190;
  const left = 46;
  const bottom = 26;
  const top = 12;
  const periods = [...new Set(tile.rows.map((r) => r.period ?? ""))].sort();
  const members = [...new Set(tile.rows.map((r) => r.member ?? ""))].sort();
  const max = niceMax(Math.max(...tile.rows.map((r) => r.value ?? 0)));
  const plotH = H - top - bottom;
  const step = (W - left - 10) / Math.max(periods.length - 1, 1);
  const px = (p: string) => left + periods.indexOf(p) * step;
  const py = (v: number) => top + plotH - (v / max) * plotH;
  const month = (p: string) =>
    new Date(Number(p.slice(0, 4)), Number(p.slice(5, 7)) - 1, 1).toLocaleString("en-US", { month: "short" });
  const ticks = [0, 0.5, 1].map((f) => f * max);
  return (
    <div className="grid gap-2">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={tile.title} className="h-auto w-full">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={left} x2={W - 10} y1={py(t)} y2={py(t)} stroke={GRID} strokeWidth={1} />
            <text x={left - 6} y={py(t) + 3.5} textAnchor="end" fontSize={10} fill={AXIS}>
              {tick(t, tile.unit)}
            </text>
          </g>
        ))}
        {periods.map((p, i) =>
          i % 3 === 1 ? (
            <text key={p} x={px(p)} y={H - 8} textAnchor="middle" fontSize={10} fill={AXIS}>
              {`${month(p)} ${p.slice(2, 4)}`}
            </text>
          ) : null,
        )}
        {members.map((m, i) => {
          const pts = tile.rows
            .filter((r) => r.member === m && r.period && r.value !== null)
            .sort((a, b) => (a.period ?? "").localeCompare(b.period ?? ""));
          const d = pts.map((r, j) => `${j ? "L" : "M"}${px(r.period ?? "")},${py(r.value ?? 0)}`).join(" ");
          const end = pts[pts.length - 1];
          return (
            <g key={m}>
              <path d={d} fill="none" stroke={SERIES[i % SERIES.length]} strokeWidth={2} strokeLinejoin="round" />
              {end && <circle cx={px(end.period ?? "")} cy={py(end.value ?? 0)} r={3.5} fill={SERIES[i % SERIES.length]} stroke="#fff" strokeWidth={1.5} />}
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        {members.map((m, i) => {
          const r = tile.rows.find((x) => x.member === m);
          return (
            <span key={m} className="inline-flex items-center gap-1.5">
              <span aria-hidden className="inline-block h-0.5 w-4" style={{ background: SERIES[i % SERIES.length] }} />
              {r ? `${name(r)}${r.currency ? ` (${r.currency})` : ""}` : m}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function DemoTileCard({ tile }: { tile: DemoTile }) {
  return (
    <figure className="flex min-w-0 flex-col gap-2 rounded-xl border border-line bg-white p-4">
      <figcaption className="grid gap-0.5">
        <span className="text-sm font-semibold text-ink">{tile.title}</span>
        <span className="text-xs text-muted">{tile.period}</span>
      </figcaption>
      {tile.kind === "line" ? <Lines tile={tile} /> : <Bars tile={tile} />}
      {tile.caveat && <p className="text-xs leading-snug text-amber-800">{tile.caveat}</p>}
    </figure>
  );
}

// The product's own top bar and as-of banner, so the still reads as a screen of VERUS and says what day it is.
export function AppFrame({
  who,
  asOf,
  title,
  children,
}: {
  who: string;
  asOf: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#f7f8fa] shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-white px-4 py-2.5">
        <span className="text-sm font-bold tracking-wide text-ink">VERUS</span>
        <span className="text-xs text-muted">{who}</span>
      </div>
      <div className="border-b border-[#f1e7c8] bg-[#fffbeb] px-4 py-1.5 text-xs text-[#6b5310]">
        Running as of {asOf}. Every answer, agent and brief treats that day as today.
      </div>
      <div className="grid gap-4 p-4">
        <p className="text-base font-semibold text-ink">{title}</p>
        {children}
      </div>
    </div>
  );
}
