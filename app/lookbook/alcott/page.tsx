import type { Metadata } from "next";
import { share } from "@/lib/share";
import Link from "next/link";
import {
  alcott,
  building,
  comps,
  creator,
  episodes,
  holdsBack,
  links,
  people,
  premise,
  production,
  rule,
  season,
  spaces,
  whyNow,
} from "@/content/lookbook/alcott";
import Nav from "@/components/lookbook/Nav";
import Building from "@/components/lookbook/alcott/Building";
import Web from "@/components/lookbook/alcott/Web";
import Episodes from "@/components/lookbook/alcott/Episodes";
import "./alcott.css";

export const metadata: Metadata = {
  ...share("/lookbook/alcott", { title: "The Alcott: lookbook", description: "The lookbook for The Alcott, an original project by C. T. Herndon." }),
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { id: "premise", label: "Premise" },
  { id: "building", label: "The building" },
  { id: "people", label: "People" },
  { id: "season", label: "Season one" },
  { id: "longgame", label: "Long game" },
  { id: "tone", label: "Why now" },
  { id: "creator", label: "Creator" },
];

export default function AlcottPage() {
  const epTitles = Object.fromEntries(episodes.map((e) => [e.n, e.title]));

  return (
    <div className="lb-alcott" id="top">
      <Nav items={SECTIONS} title="THE ALCOTT" />

      <header className="hero alcott-hero">
        <div className="alcott-hero-paper" aria-hidden />
        <div className="alcott-plate" aria-hidden>
          <span>4A</span>
        </div>
        <div className="hero-inner">
          <p className="eyebrow">{alcott.kicker}</p>
          <h1 className="hero-title">{alcott.title}</h1>
          <div className="alcott-banner" aria-hidden>
            <span className="alcott-banner-tie" />
            <span className="alcott-banner-text">A Founder Community</span>
          </div>
          <p className="hero-tag">{alcott.tagline}</p>
          <p className="hero-log">{alcott.logline}</p>
          <dl className="hero-facts">
            {alcott.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="hero-credit mono">{alcott.credit}</p>
          <a className="btn btn-gold alcott-hero-cta" href="#building">
            Take the tour &darr;
          </a>
        </div>
      </header>

      <div>
        <section id="premise" className="sec">
          <div className="wrap narrow">
            <p className="eyebrow">The show</p>
            <h2 className="h2">{premise.head}</h2>
            {premise.body.map((p, i) => (
              <p key={i} className={i === 0 ? "lede" : "body"}>
                {p}
              </p>
            ))}
            <h3 className="h3 alcott-sub">{premise.centerHead}</h3>
            <div className="alcott-pair">
              {premise.center.map((c) => (
                <div key={c.name} className="alcott-pair-card">
                  <p className="mono alcott-pair-role">{c.role}</p>
                  <h4 className="alcott-pair-name">{c.name}</h4>
                  <p className="body">{c.text}</p>
                </div>
              ))}
            </div>
            <p className="pull">{premise.hinge}</p>
          </div>
        </section>

        <section className="alcott-rule" aria-label="The governing rule">
          <div className="wrap">
            <p className="eyebrow">The governing rule</p>
            <p className="alcott-rule-a">{rule.costume}</p>
            <p className="alcott-rule-b">{rule.wound}</p>
            <p className="alcott-rule-body">{rule.body}</p>
          </div>
        </section>

        <section id="building" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The building</p>
            <h2 className="h2">{building.head}</h2>
            <p className="body narrow-p">{building.intro}</p>
            <p className="body narrow-p alcott-hint mono">{building.hint}</p>
            <Building spaces={spaces} epTitles={epTitles} />
          </div>
        </section>

        <section id="people" className="sec">
          <div className="wrap">
            <p className="eyebrow">The people, and their companies</p>
            <h2 className="h2">Nobody here is only what they look like.</h2>
            <p className="body narrow-p">
              Six regulars, an orbit ready to graduate, and two kinds of will-they-won&rsquo;t-they: people and companies. Each can wreck
              or rescue the other. Select anyone, or anything.
            </p>
            <Web people={people} links={links} />
          </div>
        </section>

        <section id="season" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">Season one · the pilot written, nine episodes mapped</p>
            <h2 className="h2">{season.head}</h2>
            <p className="lede narrow-p">{season.oneLine}</p>
            <ul className="alcott-rules">
              {season.rules.map((r) => {
                const [head, ...rest] = r.split(". ");
                return (
                  <li key={r}>
                    <strong>{head}.</strong> {rest.join(". ")}
                  </li>
                );
              })}
            </ul>
            <p className="pull">{season.engineRule}</p>
            <Episodes episodes={episodes} />
          </div>
        </section>

        <section id="longgame" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The long game</p>
            <h2 className="h2">{holdsBack.head}</h2>
            <p className="body narrow-p">{holdsBack.intro}</p>
            <ol className="alcott-keys">
              {holdsBack.keys.map((k, i) => (
                <li key={k} className="alcott-key">
                  <span className="alcott-key-tag mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="alcott-key-text">{k}</span>
                </li>
              ))}
            </ol>
            <div className="alcott-ahead">
              {holdsBack.ahead.map((a) => (
                <div key={a.label} className="comp">
                  <h3 className="h3">{a.label}</h3>
                  <p className="body">{a.text}</p>
                </div>
              ))}
            </div>
            <p className="pull">{holdsBack.pull}</p>
          </div>
        </section>

        <section id="tone" className="sec">
          <div className="wrap">
            <p className="eyebrow">Tone and comps</p>
            <h2 className="h2">{comps.head}</h2>
            <div className="comps">
              {comps.register.map((c) => (
                <div key={c.title} className="comp">
                  <h3 className="h3">{c.title}</h3>
                  <p className="body">{c.why}</p>
                </div>
              ))}
            </div>
            <ul className="tone">
              {comps.tone.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="narrow alcott-why">
              <h3 className="h3">Why now</h3>
              {whyNow.body.map((p, i) => (
                <p key={i} className="body">
                  {p}
                </p>
              ))}
              <p className="pull">{whyNow.pull}</p>
            </div>
            <h3 className="h3 prod-head">Built to be made</h3>
            <div className="prod">
              {production.map((p) => (
                <div key={p.head}>
                  <p className="prod-h">{p.head}</p>
                  <p className="body">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="creator" className="sec sec-dark">
          <div className="wrap narrow">
            <p className="eyebrow">The creator</p>
            <h2 className="h2">{alcott.contact.name}</h2>
            {creator.body.map((p, i) => (
              <p key={i} className="body">
                {p}
              </p>
            ))}
            <p className="pull">{creator.position}</p>
            <p className="eyebrow alcott-ready-head">Ready now</p>
            <ul className="tone alcott-ready">
              {creator.ready.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="contact">
              <a className="btn btn-gold" href={`mailto:${alcott.contact.email}?subject=The%20Alcott`}>
                {alcott.contact.email}
              </a>
            </p>
          </div>
        </section>
      </div>

      <footer className="foot">
        <p className="mono">The Alcott © C. T. Herndon. All rights reserved.</p>
        <Link href="/screen">All Film &amp; TV projects</Link>
      </footer>
    </div>
  );
}
