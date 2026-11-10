import type { Metadata } from "next";
import { share } from "@/lib/share";
import Link from "next/link";
import {
  aegis,
  books,
  comps,
  creator,
  engine,
  episodes,
  franchise,
  links,
  newYork,
  people,
  places,
  premise,
  production,
  silence,
  strand,
  theList,
  world,
} from "@/content/lookbook/aegis";
import { buildMap } from "@/lib/lookbook/geo";
import CharacterWeb from "@/components/lookbook/CharacterWeb";
import RouteMap, { type MapPin } from "@/components/lookbook/RouteMap";
import Episodes from "@/components/lookbook/Episodes";
import Shelf from "@/components/lookbook/Shelf";
import Silence from "@/components/lookbook/Silence";
import Nav from "@/components/lookbook/Nav";

export const metadata: Metadata = {
  ...share("/lookbook/aegis", { title: "AEGIS: lookbook", description: "The lookbook for AEGIS, an original project by C. T. Herndon." }),
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { id: "premise", label: "Premise" },
  { id: "silence", label: "Silence" },
  { id: "world", label: "World" },
  { id: "people", label: "People" },
  { id: "map", label: "Map" },
  { id: "season", label: "Season one" },
  { id: "franchise", label: "Franchise" },
  { id: "tone", label: "Tone" },
  { id: "creator", label: "Creator" },
];

// Order of the season-one journey drawn on the map.
const ROUTE = ["vienna", "prague", "odessa", "varna", "istanbul", "blacksea", "sile", "erzurum"];

export default function AegisPage() {
  const map = buildMap(1000, 800, { west: 3, east: 43, south: 29, north: 62.5 });
  const epsAt = (id: string) => episodes.filter((e) => e.places.includes(id)).map((e) => ({ n: e.n, title: e.title }));
  const pins: MapPin[] = places.map((p) => {
    const [x, y] = map.project(p.lon, p.lat);
    return { id: p.id, name: p.name, x, y, layer: p.layer, note: p.note, labelSide: p.labelSide, episodes: epsAt(p.id) };
  });

  return (
    <div className="aegis" id="top">
      <Nav items={SECTIONS} title="AEGIS" />

      <header className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lookbook/aegis/hero-mask.jpg" alt="" className="hero-art" />
        <div className="hero-veil" />
        <div className="hero-inner">
          <p className="eyebrow">{aegis.kicker}</p>
          <h1 className="hero-title">{aegis.title}</h1>
          <p className="hero-tag">{aegis.tagline}</p>
          <p className="hero-log">{aegis.logline}</p>
          <dl className="hero-facts">
            {aegis.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="hero-credit mono">{aegis.credit}</p>
        </div>
      </header>

      <div>
        <section id="premise" className="sec">
          <div className="wrap narrow">
            <p className="eyebrow">Premise</p>
            {premise.map((p, i) => (
              <p key={i} className={i === 0 ? "lede" : "body"}>
                {p}
              </p>
            ))}
            <div className="argument">
              <span>{engine.argument.left}</span>
              <span className="argument-vs mono">against</span>
              <span>{engine.argument.right}</span>
            </div>
            <p className="pull">{engine.line}</p>
            {engine.body.map((p, i) => (
              <p key={i} className="body">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section id="silence" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The hook nobody else owns</p>
            <h2 className="h2">{silence.head}</h2>
            <Silence />
            <div className="cols">
              {silence.body.map((p, i) => (
                <p key={i} className="body">
                  {p}
                </p>
              ))}
            </div>
            <p className="pull">{silence.kicker}</p>
          </div>
        </section>

        <section id="world" className="sec">
          <div className="wrap narrow">
            <p className="eyebrow">The world</p>
            <h2 className="h2">The Mask of Arsenius</h2>
            {world.relic.map((p, i) => (
              <p key={i} className="body">
                {p}
              </p>
            ))}
            <div className="rule">
              <p>{world.rule.chosen}</p>
              <p className="rule-taken">{world.rule.taken}</p>
            </div>
            <p className="body ledger">{world.burrow}</p>
          </div>
        </section>

        <section id="people" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The people</p>
            <h2 className="h2">One family, one unit, one argument</h2>
            <p className="body narrow-p">Select anyone to see who they are and what binds them to the others.</p>
            <CharacterWeb people={people} links={links} />
          </div>
        </section>

        <section id="map" className="sec">
          <div className="wrap">
            <p className="eyebrow">Season one, on the ground</p>
            <h2 className="h2">Seven cities. They lose it at every stop.</h2>
            <p className="body narrow-p">
              Each episode is a recovery in a new place. Select a location for what happens there.
            </p>
            <RouteMap
              width={map.width}
              height={map.height}
              land={map.land}
              borders={map.borders}
              graticule={map.graticule}
              pins={pins}
              route={ROUTE}
              inset={{ ...newYork, episodes: epsAt("newyork") }}
            />
          </div>
        </section>

        <section id="season" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">Season one · all ten written</p>
            <h2 className="h2">The episodes</h2>
            <Episodes episodes={episodes} />
          </div>
          <div className="wrap strand-wrap">
            <p className="eyebrow">The second timeline</p>
            <h3 className="h3">Marta Voss, 1942 to 1998</h3>
            <p className="body narrow-p">{strand.intro}</p>
            <ol className="strand">
              {strand.beats.map((b) => (
                <li key={b.year}>
                  <span className="strand-year mono">{b.year}</span>
                  <span className="strand-text">{b.text}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="wrap narrow list-wrap">
            <p className="eyebrow ink">The List</p>
            <p className="list-count">
              <span className="ink">{theList.count}</span> names
            </p>
            {theList.body.map((p, i) => (
              <p key={i} className="body">
                {p}
              </p>
            ))}
            <p className="pull ink">{theList.pull}</p>
          </div>
        </section>

        <section id="franchise" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The franchise</p>
            <h2 className="h2">{franchise.head}</h2>
            <p className="body narrow-p">{franchise.body}</p>
            <div className="shape">
              {franchise.shape.map((s) => (
                <div key={s.label} className="shape-card">
                  <p className="mono shape-books">{s.books}</p>
                  <h3 className="h3">{s.label}</h3>
                  <p className="body">{s.text}</p>
                </div>
              ))}
            </div>
            <Shelf books={books} />
          </div>
        </section>

        <section id="tone" className="sec">
          <div className="wrap">
            <p className="eyebrow">Tone and comps</p>
            <h2 className="h2">Slow Horses, with an artifact played straight</h2>
            <div className="comps">
              {comps.register.map((c) => (
                <div key={c.title} className="comp">
                  <h3 className="h3">{c.title}</h3>
                  <p className="body">{c.why}</p>
                </div>
              ))}
              <div className="comp">
                <h3 className="h3">Franchise scale</h3>
                <p className="body">{comps.franchise.join(" · ")}</p>
              </div>
            </div>
            <ul className="tone">
              {comps.tone.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
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
            <h2 className="h2">{aegis.contact.name}</h2>
            {creator.body.map((p, i) => (
              <p key={i} className="body">
                {p}
              </p>
            ))}
            <p className="pull">{creator.position}</p>
            <p className="contact">
              <a className="btn btn-gold" href={`mailto:${aegis.contact.email}?subject=AEGIS`}>
                {aegis.contact.email}
              </a>
            </p>
          </div>
        </section>
      </div>

      <footer className="foot">
        <p className="mono">AEGIS © C. T. Herndon. All rights reserved.</p>
        <Link href="/screen">All Film &amp; TV projects</Link>
      </footer>
    </div>
  );
}
