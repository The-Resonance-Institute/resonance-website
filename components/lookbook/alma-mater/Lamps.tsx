// The Pit at night: a hillside bowl of miner's headlamps under two light towers.
// Server-rendered SVG; the lamps switch on in waves with CSS (nothing moves under
// prefers-reduced-motion, where they are simply on).

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

const W = 1600;
const H = 560;
const WAVES = 6;

export default function Lamps() {
  const rand = rng(1948);
  // Each lamp is a zero-length segment with a round cap: tiny markup for ~1,700 lights.
  const groups: string[][] = Array.from({ length: WAVES * 2 }, () => []);
  const rows = 22;
  for (let r = 0; r < rows; r++) {
    const t = r / (rows - 1); // 0 = front row (bottom), 1 = top of the bowl
    const yBase = H - 18 - r * 15 - r * r * 0.18;
    const perRow = Math.round(70 + r * 3);
    for (let k = 0; k < perRow; k++) {
      if (rand() < 0.22) continue; // empty seats
      const x = (k + 0.5 + (rand() - 0.5) * 0.8) * (W / perRow);
      const dx = (x - W / 2) / (W / 2);
      const y = yBase - dx * dx * (60 + t * 70) + (rand() - 0.5) * 6;
      if (y < 40) continue;
      const big = rand() > 0.55 + t * 0.3 ? 1 : 0;
      const wave = Math.min(WAVES - 1, Math.floor(rand() * WAVES));
      groups[wave * 2 + big].push(`M${Math.round(x)} ${Math.round(y)}h0`);
    }
  }

  const tower = (x: number, y: number) => {
    const cells: string[] = [];
    for (let c = 0; c < 6; c++) for (let r = 0; r < 4; r++) cells.push(`M${x + c * 13} ${y + r * 11}h9v7h-9z`);
    return cells.join("");
  };

  return (
    <svg className="alma-mater-lamps" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden>
      <defs>
        <linearGradient id="alma-mater-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3d6" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="alma-mater-halo" cx="50%" cy="100%" r="70%">
          <stop offset="0" stopColor="#f2b134" stopOpacity="0.28" />
          <stop offset="1" stopColor="#f2b134" stopOpacity="0" />
        </radialGradient>
        <filter id="alma-mater-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x="0" y={H * 0.25} width={W} height={H * 0.75} fill="url(#alma-mater-halo)" />
      <path d="M1262 60 L1000 560 L1560 560 Z" fill="url(#alma-mater-beam)" className="alma-mater-beam" />
      <path d="M1372 40 L1200 560 L1640 560 Z" fill="url(#alma-mater-beam)" className="alma-mater-beam" />
      <g className="alma-mater-towers" filter="url(#alma-mater-bloom)">
        <path d={tower(1226, 40)} />
        <path d={tower(1336, 22)} />
      </g>
      <g filter="url(#alma-mater-bloom)">
        {groups.map((d, k) => (
          <path
            key={k}
            d={d.join("")}
            strokeWidth={k % 2 ? 4.4 : 2.8}
            className={`alma-mater-lamp-wave alma-mater-lamp-w${Math.floor(k / 2)}`}
          />
        ))}
      </g>
    </svg>
  );
}
