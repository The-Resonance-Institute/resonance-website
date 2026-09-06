import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PublicationStatus } from "@/components/publication-status";

export const metadata: Metadata = {
  title: "The Series",
  description:
    "The Resonance series is a living philosophy in fifteen manuscripts across five trilogies, each theme carried from the self to the community to the world. All fifteen are written; none is published yet. It is also the substrate beneath MORIS.",
};

const trilogies = [
  {
    n: "I",
    name: "Resonance",
    line: "Presence as the ground of leadership: what leadership is before a word is spoken.",
  },
  {
    n: "II",
    name: "Transformation",
    line: "How anything truly changes. Fracture, grief, and silence giving way to fire, emergence, and rhythm.",
  },
  {
    n: "III",
    name: "Time",
    line: "Leading inside something we cannot stop: attention, patience, memory, and bequest across three timescales.",
  },
  {
    n: "IV",
    name: "The Sacred",
    line: "What is owed to the depth of things. Reverence as a capacity.",
  },
  {
    n: "V",
    name: "The Grammar of God",
    line: "The capstone. The whole work re-read as language, the parts of speech by which a life is composed.",
  },
];

export default function ResonanceLanding() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          The Series
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          A living philosophy, learned by tuning.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          Leadership is resonance: the sound a whole life makes when it meets a
          whole people, learned not by technique but by tuning. Every book stands
          alone; together they make one patient argument across the self, the
          community, and time itself.
        </p>
      </section>

      <div className="pb-10">
        <PublicationStatus />
      </div>

      <Link href="/resonance/series" className="group block border-t border-line pt-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl text-ink">The fifteen books</h2>
          <span className="shrink-0 text-sm font-medium text-accent transition-colors group-hover:text-ink">
            Open the series <span aria-hidden>&rarr;</span>
          </span>
        </div>
        <div className="mt-5 flex gap-2.5 sm:gap-3">
          {[
            ["resonance", "Resonance"],
            ["transformation", "Transformation"],
            ["time", "Time"],
            ["sacred", "The Sacred"],
            ["grammar", "The Grammar of God"],
          ].map(([slug, name]) => (
            <div
              key={slug}
              className="relative aspect-[2/3] flex-1 overflow-hidden rounded-md border border-line shadow-sm transition-transform group-hover:-translate-y-0.5"
            >
              <Image
                src={`/trilogies/${slug}.jpg`}
                alt={`${name} trilogy cover`}
                fill
                sizes="(max-width: 640px) 20vw, 130px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Link>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The shape of it</h2>
        <p className="mt-3 leading-relaxed text-muted">
          One work, fifteen books, five trilogies. Each trilogy takes a single
          theme and carries it across three scales: the self, then the community,
          then the largest frame of civilization and world. Five themes, three
          scales each. The fifth trilogy is the capstone, which re-reads the whole
          as language.
        </p>
      </section>

      <section className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {trilogies.map((t) => (
          <div key={t.n} className="flex gap-5 bg-white p-6">
            <span className="font-serif text-2xl leading-none text-accent">
              {t.n}
            </span>
            <div>
              <h3 className="font-serif text-lg text-ink">{t.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{t.line}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-8">
        <Link
          href="/resonance/series"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
        >
          See all fifteen books, with covers <span aria-hidden>&rarr;</span>
        </Link>
      </div>

      <section className="mt-12 border-t border-line pt-10">
        <p className="leading-relaxed text-muted">
          The work was written for anyone who
          knows that leadership and relationship are more than a seven-step program
          or a handful of hacks, that they are the long work of connecting at every
          level and tending the relationships around you. It is also the substrate
          beneath{" "}
          <Link href="/moris" className="text-accent underline decoration-line hover:decoration-accent">
            MORIS
          </Link>
          , the same philosophy compiled into a fixed basis a machine can project
          an action onto. The philosophy is the parent; the system is what it
          proved capable of.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-line bg-white p-8 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          First to land
        </p>
        <h2 className="mt-3 font-serif text-2xl text-ink">The first volume</h2>
        <p className="mt-3 leading-relaxed text-muted">
          <span className="italic text-ink">
            Book One &middot; Tuning &middot; Echoes of the Unseen
          </span>{" "}
          (Resonance and the Self). Presence as the ground of leadership: the
          tuning of the inner instrument. It is the volume the series opens with,
          and the one being published first.
        </p>
        <Link
          href="/resonance/book/echoes-of-the-unseen"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
        >
          Read about Book One <span aria-hidden>&rarr;</span>
        </Link>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <blockquote className="font-serif text-2xl font-light italic leading-snug text-ink">
          &ldquo;To lead is to promise what you touch will not collapse when you
          are gone.&rdquo;
        </blockquote>
        <p className="mt-3 text-sm text-muted">&mdash; C.T. Herndon</p>
      </section>
    </div>
  );
}
