// A brass pocket watch, open, stopped at 3:47. Static on purpose: nothing in the film ever winds it.
const HOUR = (3 + 47 / 60) * 30; // 113.5 degrees
const MINUTE = 47 * 6; // 282 degrees

export default function Watch({ className = "", label = "A pocket watch stopped at 3:47" }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 200 230" className={`unf-watch ${className}`} role="img" aria-label={label}>
      <circle cx="100" cy="18" r="9" className="unf-watch-ring" />
      <rect x="93" y="24" width="14" height="10" rx="3" className="unf-watch-crown" />
      <circle cx="100" cy="130" r="90" className="unf-watch-case" />
      <circle cx="100" cy="130" r="80" className="unf-watch-face" />
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0;
        return (
          <line
            key={i}
            x1="100"
            y1={major ? 56 : 54}
            x2="100"
            y2={major ? 66 : 59}
            transform={`rotate(${i * 6} 100 130)`}
            className={major ? "unf-watch-tick is-major" : "unf-watch-tick"}
          />
        );
      })}
      <line x1="100" y1="138" x2="100" y2="92" transform={`rotate(${HOUR} 100 130)`} className="unf-watch-hand is-hour" />
      <line x1="100" y1="140" x2="100" y2="68" transform={`rotate(${MINUTE} 100 130)`} className="unf-watch-hand is-minute" />
      <circle cx="100" cy="130" r="4" className="unf-watch-pin" />
    </svg>
  );
}
