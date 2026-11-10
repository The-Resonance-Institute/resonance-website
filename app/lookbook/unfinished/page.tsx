import type { Metadata } from "next";
import { share } from "@/lib/share";
import Link from "next/link";
import {
  acts,
  adaptation,
  beats,
  books,
  comps,
  creator,
  film,
  groups,
  images,
  links,
  motifFilters,
  people,
  production,
  question,
  softening,
  world,
} from "@/content/lookbook/unfinished";
import Nav from "@/components/lookbook/Nav";
import CharacterWeb from "@/components/lookbook/unfinished/CharacterWeb";
import Softening from "@/components/lookbook/unfinished/Softening";
import Structure from "@/components/lookbook/unfinished/Structure";
import Watch from "@/components/lookbook/unfinished/Watch";
import "./unfinished.css";

export const metadata: Metadata = {
  ...share("/lookbook/unfinished", { title: "The Unfinished: lookbook", description: "The lookbook for The Unfinished, an original project by C. T. Herndon." }),
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { id: "question", label: "The question" },
  { id: "world", label: "World" },
  { id: "softening", label: "Softening" },
  { id: "people", label: "People" },
  { id: "structure", label: "Structure" },
  { id: "images", label: "Images" },
  { id: "books", label: "Books" },
  { id: "tone", label: "Tone" },
  { id: "creator", label: "Creator" },
];

export default function UnfinishedPage() {
  return (
    <div className="lb-unfinished" id="top">
      <Nav items={SECTIONS} title="THE UNFINISHED" />

      <header className="hero unf-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lookbook/unfinished/hero-bird.jpg" alt="" className="unf-hero-art" width={1300} height={1200} />
        <div className="unf-hero-glow" aria-hidden />
        <div className="hero-veil unf-hero-veil" />
        <div className="hero-inner">
          <p className="eyebrow">{film.kicker}</p>
          <h1 className="unf-hero-title">
            {film.title.slice(0, -1)}
            <span className="unf-rough">{film.title.slice(-1)}</span>
          </h1>
          <p className="hero-tag">{film.tagline}</p>
          <p className="hero-log">{film.logline}</p>
          <dl className="hero-facts unf-hero-facts">
            {film.facts.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="hero-credit mono">{film.credit}</p>
        </div>
      </header>

      <div>
        <section id="question" className="sec">
          <div className="wrap narrow">
            <p className="eyebrow">The question</p>
            <h2 className="unf-ask">{question.ask}</h2>
            {question.premise.map((p, i) => (
              <p key={i} className={i === 0 ? "lede" : "body"}>
                {p}
              </p>
            ))}
            <p className="pull">{question.pull}</p>
          </div>
          <div className="wrap unf-took-wrap">
            <p className="eyebrow">What the kindness took</p>
            <h3 className="unf-h3">{question.tookHead}</h3>
            <ul className="unf-took">
              {question.took.map((t) => (
                <li key={t.who}>
                  <span className="unf-took-who">{t.who}</span>
                  <span className="unf-took-what">{t.what}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="world" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The world</p>
            <h2 className="h2">{world.head}</h2>
            <p className="pull unf-pull-quiet">{world.intro}</p>
            <ol className="unf-rules">
              {world.rules.map((r) => (
                <li key={r.n} className={`unf-rule ${r.n === "05" ? "is-line" : ""}`}>
                  <span className="unf-rule-n mono">{r.n}</span>
                  <h3 className="unf-rule-name">{r.name}</h3>
                  <p className="unf-rule-text">{r.text}</p>
                  <p className={`unf-rule-quote ${r.system ? "is-system" : ""}`}>&ldquo;{r.quote}&rdquo;</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="softening" className="sec unf-soft-sec">
          <div className="wrap narrow">
            <p className="eyebrow">{softening.eyebrow}</p>
            <h2 className="h2">{softening.head}</h2>
            <p className="body">{softening.intro}</p>
            <Softening
              memory={softening.memory}
              offer={softening.offer}
              refusal={softening.refusal}
              which={softening.which}
              settled={softening.settled}
              pocketLine={softening.pocketLine}
              after={softening.after}
              birds={softening.birds}
            />
          </div>
        </section>

        <section id="people" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The people</p>
            <h2 className="h2">The ones who refused, and the ones who cared</h2>
            <p className="body narrow-p">Select anyone to see who they are and what binds them to the others. Nobody here is a villain.</p>
            <CharacterWeb people={people} links={links} groups={groups} />
          </div>
        </section>

        <section id="structure" className="sec">
          <div className="wrap">
            <p className="eyebrow">Structure · 97 pages</p>
            <h2 className="h2">A prologue, three acts, and years later</h2>
            <p className="body narrow-p">
              Each act takes its name from one of the novels. Pick an act for its set pieces, or follow a motif and watch where it comes back.
            </p>
            <Structure acts={acts} beats={beats} motifs={motifFilters} />
          </div>
        </section>

        <section id="images" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The images</p>
            <h2 className="h2">{images.head}</h2>
            <p className="body narrow-p">{images.intro}</p>
            <ul className="unf-images">
              {images.items.map((m, i) => (
                <li key={m.id} className={`unf-image ${i === 0 ? "is-watch" : ""}`}>
                  {i === 0 && <Watch className="unf-image-watch" />}
                  <h3 className="unf-image-name">{m.name}</h3>
                  <p className="unf-image-text">{m.text}</p>
                  <p className="unf-image-pages mono">{m.pages}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="books" className="sec sec-dark">
          <div className="wrap">
            <p className="eyebrow">The source</p>
            <h2 className="h2">{adaptation.head}</h2>
            <p className="body narrow-p">{adaptation.body}</p>
            <ul className="unf-books">
              {books.map((b) => (
                <li key={b.n} className="unf-book">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.cover} alt={`${b.title}, book ${b.n} of the Unresolved trilogy, cover`} width={640} height={960} loading="lazy" />
                  <p className="mono unf-book-n">
                    Book {b.n} · {b.inFilm}
                  </p>
                  <h3 className="unf-book-title">{b.title}</h3>
                  <p className="unf-book-tag">{b.tagline}</p>
                  <p className="unf-book-hook">{b.hook}</p>
                </li>
              ))}
            </ul>
            <h3 className="unf-h3 unf-changes-head">What the film does that the books don&rsquo;t</h3>
            <ul className="unf-changes">
              {adaptation.changes.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="tone" className="sec">
          <div className="wrap">
            <p className="eyebrow">Tone and comps</p>
            <h2 className="h2">{comps.head}</h2>
            <div className="comps">
              {comps.register.map((c) => (
                <div key={c.title} className="comp">
                  <h3 className="unf-comp-title">{c.title}</h3>
                  <p className="body">{c.why}</p>
                </div>
              ))}
            </div>
            <ul className="tone">
              {comps.tone.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="unf-now">
              <p className="eyebrow">Why now</p>
              <p className="pull">{comps.whyNow}</p>
            </div>
            <h3 className="unf-h3 prod-head">Built to be made</h3>
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
            <p className="eyebrow">The writer</p>
            <h2 className="h2">{film.contact.name}</h2>
            {creator.body.map((p, i) => (
              <p key={i} className="body">
                {p}
              </p>
            ))}
            <p className="pull">{creator.position}</p>
            <p className="contact">
              <a className="btn btn-gold" href={`mailto:${film.contact.email}?subject=The%20Unfinished`}>
                {film.contact.email}
              </a>
            </p>
          </div>
        </section>
      </div>

      <footer className="foot">
        <p className="mono">The Unfinished © C. T. Herndon. All rights reserved.</p>
        <Link href="/screen">All Film &amp; TV projects</Link>
      </footer>
    </div>
  );
}
