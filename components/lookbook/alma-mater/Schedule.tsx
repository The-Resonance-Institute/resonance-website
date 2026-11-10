"use client";

// Season one, game by game: a results strip from 0-1 to 4-8 that climbs a step with
// every win. Select a game for what happened and which episode it's in.
import { useState } from "react";
import type { Game } from "@/content/lookbook/alma-mater";

type Coda = { label: string; head: string; note: string; ep: string };

export default function Schedule({
  games,
  coda,
  titles,
}: {
  games: Game[];
  coda: Coda;
  titles: Record<string, string>;
}) {
  const [sel, setSel] = useState<number>(12);
  let wins = 0;
  const steps = games.map((g) => {
    if (g.res === "W") wins += 1;
    return wins;
  });
  const game = games.find((g) => g.week === sel);

  return (
    <div className="alma-mater-sched">
      <ol className="alma-mater-sched-strip" aria-label="Season one results">
        {games.map((g, i) => {
          const on = sel === g.week;
          return (
            <li key={g.week} style={{ ["--step" as string]: steps[i] }}>
              <button
                className={`alma-mater-tile ${g.res === "W" ? "is-w" : "is-l"} ${g.opp === "Arkansas" ? "is-rival" : ""} ${on ? "is-on" : ""}`}
                aria-pressed={on}
                aria-label={`Week ${g.week}, ${g.site === "home" ? "versus" : "at"} ${g.opp}: ${g.res === "W" ? "won" : "lost"} ${g.us} to ${g.them}, record ${g.record}`}
                onClick={() => setSel(g.week)}
              >
                <span className="alma-mater-tile-wk mono">Wk {g.week}</span>
                <span className="alma-mater-tile-res">{g.res}</span>
                <span className="alma-mater-tile-score mono">
                  {g.us}-{g.them}
                </span>
                <span className="alma-mater-tile-rec mono">{g.record}</span>
              </button>
            </li>
          );
        })}
        <li style={{ ["--step" as string]: 4 }}>
          <button
            className={`alma-mater-tile is-coda ${sel === 13 ? "is-on" : ""}`}
            aria-pressed={sel === 13}
            aria-label="December coda: the conference vote"
            onClick={() => setSel(13)}
          >
            <span className="alma-mater-tile-wk mono">{coda.label}</span>
            <span className="alma-mater-tile-res">&#9670;</span>
            <span className="alma-mater-tile-score mono">Vote</span>
            <span className="alma-mater-tile-rec mono">&nbsp;</span>
          </button>
        </li>
      </ol>

      <div className="alma-mater-sched-panel" aria-live="polite">
        {game ? (
          <>
            <p className="eyebrow">
              Week {game.week} · {game.site === "home" ? "Home, at The Pit" : "On the road"}
            </p>
            <div className="alma-mater-sched-head">
              <h3 className="h3">
                {game.site === "home" ? "vs" : "at"} {game.opp}
              </h3>
              <p className={`alma-mater-sched-score ${game.res === "W" ? "is-w" : ""}`}>
                <span>{game.res}</span> {game.us}-{game.them}
                <span className="alma-mater-sched-rec mono">{game.record}</span>
              </p>
            </div>
            <p className="alma-mater-sched-type mono">{game.type}</p>
            <p className="body">{game.note}</p>
            <p className="alma-mater-sched-links mono">
              <a href={`#ep-${game.ep}`}>
                Episode {game.ep} · {titles[game.ep]} &rarr;
              </a>
              {game.hits !== undefined && (
                <a href="#screen" className="alma-mater-sched-hits">
                  Helmet 089: {game.hits} hits &rarr;
                </a>
              )}
            </p>
          </>
        ) : (
          <>
            <p className="eyebrow">December</p>
            <h3 className="h3">{coda.head}</h3>
            <p className="body">{coda.note}</p>
            <p className="alma-mater-sched-links mono">
              <a href={`#ep-${coda.ep}`}>
                Episode {coda.ep} · {titles[coda.ep]} &rarr;
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
