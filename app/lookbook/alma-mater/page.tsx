import type { Metadata } from "next";
import { share } from "@/lib/share";
import Link from "next/link";
import {
  alma,
  arc,
  center,
  creator,
  episodes,
  football,
  groupName,
  groups,
  links,
  people,
  premise,
  schedule,
  screen,
  whyNow,
  world,
} from "@/content/lookbook/alma-mater";
import Nav from "@/components/lookbook/Nav";
import CharacterWeb from "@/components/lookbook/alma-mater/CharacterWeb";
import Episodes from "@/components/lookbook/alma-mater/Episodes";
import ImpactMap from "@/components/lookbook/alma-mater/ImpactMap";
import Lamps from "@/components/lookbook/alma-mater/Lamps";
import Schedule from "@/components/lookbook/alma-mater/Schedule";
import "./alma-mater.css";

export const metadata: Metadata = {
  ...share("/lookbook/alma-mater", { title: "Alma Mater: lookbook", description: "A private lookbook. Available on request." }),
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { id: "premise", label: "Premise" },
  { id: "screen", label: "June's screen" },
  { id: "world", label: "Fort Smith" },
  { id: "people", label: "People" },
  { id: "season", label: "Season one" },
  { id: "arc", label: "Four years" },
  { id: "football", label: "The football" },
  { id: "now", label: "Why now" },
  { id: "creator", label: "Creator" },
];

export default function AlmaMaterPage() {
  const titles = Object.fromEntries(episodes.map((e) => [e.n, e.title]));

  return (
    <div className="lb-alma-mater" id="top">
      <Nav items={SECTIONS} title="ALMA MATER" />

      <header className="hero alma-mater-hero">
        <Lamps />
        <div className="hero-veil alma-mater-veil" />
        <div className="hero-inner">
          <p className="eyebrow">{alma.kicker}</p>
          <h1 className="hero-title">{alma.title}</h1>
          <p className="hero-tag">{alma.tagline}</p>
          <p className="hero-log">{alma.logline}</p>
          <dl className="hero-facts">
            {alma.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="hero-credit mono">{alma.credit}</p>
        </div>
      </header>

      <div>
        <section id="premise" className="sec">
          <div className="wrap">
            <div className="narrow">
              <p className="eyebrow">Premise</p>
              <h2 className="h2">{premise.hook}</h2>
              <p className="lede">{premise.lede}</p>
            </div>
            <div className="alma-mater-ledger">
              {[premise.then, premise.now].map((col, k) => (
                <div key={col.year} className={`alma-mater-ledger-col ${k ? "is-now" : ""}`}>
                  <p className="alma-mater-ledger-year">{col.year}</p>
                  <dl>
                    {col.rows.map((r) => (
                      <div key={r.k} className="alma-mater-ledger-row">
                        <dt className="mono">{r.k}</dt>
                        <dd>{r.v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <div className="narrow">
              <p className="pull">{premise.question}</p>
              {premise.body.map((p, i) => (
                <p key={i} className="body">
                  {p}
                </p>
              ))}
              <figure className="alma-mater-loretta">
                <blockquote>&ldquo;{premise.loretta.line}&rdquo;</blockquote>
                <figcaption className="mono">{premise.loretta.who}</figcaption>
                <p className="body">{premise.loretta.answer}</p>
              </figure>
            </div>
          </div>
        </section>

        <section id="screen" className="sec sec-dark alma-mater-screen-sec">
          <div className="wrap">
            <p className="eyebrow">The device nobody else owns</p>
            <h2 className="h2">{screen.head}</h2>
            <p className="body narrow-p">{screen.intro}</p>
            <ImpactMap steps={screen.steps} helmet={screen.helmet} wearer={screen.wearer} colt={screen.colt} caption={screen.caption} />
            <p className="pull">{screen.kicker}</p>
          </div>
        </section>

        <section id="world" className="sec alma-mater-world">
          <div className="wrap">
            <div className="narrow">
              <p className="eyebrow">The world</p>
              <h2 className="h2">{world.head}</h2>
              {world.body.map((p, i) => (
                <p key={i} className="body">
                  {p}
                </p>
              ))}
            </div>
            <dl className="alma-mater-stats">
              {world.stats.map((s) => (
                <div key={s.n}>
                  <dt>{s.n}</dt>
                  <dd>{s.k}</dd>
                </div>
              ))}
            </dl>

            <h3 className="h3 alma-mater-sub">{world.junkHead}</h3>
            <p className="body narrow-p">{world.junkIntro}</p>
            <table className="alma-mater-junk">
              <thead>
                <tr>
                  <th scope="col" className="mono">
                    Everyone else
                  </th>
                  <th scope="col" className="mono">
                    Arkansas Valley
                  </th>
                </tr>
              </thead>
              <tbody>
                {world.junk.map((j) => (
                  <tr key={j.them}>
                    <th scope="row">{j.them}</th>
                    <td>{j.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ul className="alma-mater-trad">
              {world.traditions.map((t) => (
                <li key={t.name}>
                  <p className="alma-mater-trad-name">{t.name}</p>
                  <p className="body">{t.text}</p>
                </li>
              ))}
            </ul>
            <div className="alma-mater-vacated">
              <p className="alma-mater-vacated-card mono">Vacated</p>
              <p className="body">{world.vacated}</p>
            </div>
          </div>
        </section>

        <section id="people" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The people</p>
            <h2 className="h2">Nobody comes to Arkansas Valley on purpose.</h2>
            <div className="alma-mater-three">
              {center.map((c) => (
                <article key={c.id} className="alma-mater-card">
                  <p className="alma-mater-card-age" aria-label={`Age ${c.age}`}>
                    {c.age}
                  </p>
                  <h3 className="h3">{c.name}</h3>
                  <p className="alma-mater-card-role mono">{c.role}</p>
                  <p className="alma-mater-card-tag">{c.tag}</p>
                  <p className="body">{c.body}</p>
                  <p className="alma-mater-card-want">
                    <span className="mono">Wants</span> {c.want}
                  </p>
                </article>
              ))}
            </div>
            <h3 className="h3 alma-mater-sub">The staff, the players, the town and the money</h3>
            <p className="body narrow-p">
              Everyone at AVU is there because of a wound, some self-inflicted and some tragic. Select anyone to see who they are and what binds them to the others.
            </p>
            <CharacterWeb people={people} links={links} groups={groups} groupName={groupName} initial="cal" />
          </div>
        </section>

        <section id="season" className="sec">
          <div className="wrap">
            <p className="eyebrow">Season one · “The Bottom” · all ten written</p>
            <h2 className="h2">{schedule.head}</h2>
            <p className="body narrow-p">{schedule.intro}</p>
            <Schedule games={schedule.games} coda={schedule.coda} titles={titles} />
            <h3 className="h3 alma-mater-sub">The episodes</h3>
            <Episodes episodes={episodes} note="the pilot and nine more, all written" />
          </div>
        </section>

        <section id="arc" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The four-year arc</p>
            <h2 className="h2">{arc.head}</h2>
            <p className="body narrow-p">{arc.intro}</p>
            <ol className="alma-mater-arc">
              {arc.seasons.map((s) => (
                <li key={s.n} className={`alma-mater-arc-card ${s.n === 4 ? "is-last" : ""}`}>
                  <p className="alma-mater-arc-meta mono">
                    Season {s.n} · {s.year} · {s.class}
                  </p>
                  <p className="alma-mater-arc-rec">{s.record}</p>
                  <h3 className="h3">{s.title}</h3>
                  <p className="body">{s.engine}</p>
                </li>
              ))}
            </ol>
            <p className="pull">{arc.pull}</p>
          </div>
        </section>

        <section id="football" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The football</p>
            <h2 className="h2">{football.head}</h2>
            <p className="body narrow-p">{football.intro}</p>
            <div className="alma-mater-bvc">
              {football.three.map((t) => (
                <div key={t.head}>
                  <h3 className="h3">{t.head}</h3>
                  <p className="body">{t.text}</p>
                </div>
              ))}
            </div>
            <div className="alma-mater-schemes">
              {football.schemes.map((t) => (
                <div key={t.head}>
                  <p className="alma-mater-scheme-h mono">{t.head}</p>
                  <p className="body">{t.text}</p>
                </div>
              ))}
            </div>
            <h3 className="h3 alma-mater-sub">Built to be made</h3>
            <div className="prod">
              {football.made.map((p) => (
                <div key={p.head}>
                  <p className="prod-h">{p.head}</p>
                  <p className="body">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="now" className="sec">
          <div className="wrap">
            <div className="narrow">
              <p className="eyebrow">Why now</p>
              <h2 className="h2">{whyNow.head}</h2>
              {whyNow.body.map((p, i) => (
                <p key={i} className="lede">
                  {p}
                </p>
              ))}
            </div>
            <div className="comps">
              {whyNow.comps.map((c) => (
                <div key={c.title} className="comp">
                  <h3 className="h3">{c.title}</h3>
                  <p className="body">{c.why}</p>
                </div>
              ))}
            </div>
            <p className="pull narrow">{whyNow.rule}</p>
          </div>
        </section>

        <section id="creator" className="sec sec-dark">
          <div className="wrap narrow">
            <p className="eyebrow">The creator</p>
            <h2 className="h2">{alma.contact.name}</h2>
            {creator.body.map((p, i) => (
              <p key={i} className="body">
                {p}
              </p>
            ))}
            <p className="pull">{creator.position}</p>
            <p className="contact">
              <a className="btn btn-gold" href={`mailto:${alma.contact.email}?subject=Alma%20Mater`}>
                {alma.contact.email}
              </a>
            </p>
          </div>
        </section>
      </div>

      <footer className="foot">
        <p className="mono">Alma Mater © C. T. Herndon. Private and confidential. Not for distribution.</p>
        <Link href="/lookbook">All projects</Link>
      </footer>
    </div>
  );
}
