import Link from "next/link";
import { books, trilogies } from "@/lib/canon";

// BOOKS-FIRST PIVOT, 2026-09-19. This page led with an open letter and then gave MORIS and the
// series equal cards, with MORIS carrying the accent and the heavier border. The site is now a books
// site. The series is the whole front door; there is no second body of work on it.
//
// Resonant Counsel is the one companion section, and it is a feature of the twelve volumes rather
// than a product with an identity of its own. The MORIS demos are frozen and no longer linked
// from any series page. Everything removed is under archive/site-2026-09-19/ and the tag
// pre-books-pivot-2026-09-19.

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-14 pb-10 sm:pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The Resonance Institute
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
          A Living Philosophy of Leadership.
        </h1>
        <p className="mt-6 max-w-3xl font-serif text-xl font-light leading-relaxed text-ink">
          Four trilogies, twelve volumes, approximately one million words.
          Complete. A philosophy of leadership worked at three scales, self,
          community and world, across four domains. Each volume can be read on its
          own.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/resonance"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Enter the Series <span aria-hidden>&rarr;</span>
          </Link>
          <Link
            href="/resonance/series"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
          >
            All {books.length} volumes <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">The four trilogies</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {trilogies.map((t) => (
            <Link
              key={t.slug}
              href={`/resonance/trilogy/${t.slug}`}
              className="group bg-white p-6 transition-colors hover:bg-accent-soft"
            >
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {t.numeral}
              </p>
              <h3 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-accent">
                {t.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t.governingQuestion}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* RESONANT COUNSEL, 2026-09-23. This is a rewrite, not a relabel. The section here sold a
          mechanical gate that derives a judgment, which is the MORIS pitch and the wrong promise on
          a book site. What it describes now is what the thing is: a reader brings something they are
          weighing, a model answers bound to the twelve volumes, and the citation shows where the
          answer came from.

          The links to /moris/chat, /moris/pair and askmoris.ai are gone. Those surfaces are frozen
          and keep the old series title and volume count; the series pages simply stop pointing at
          them. */}
      <section className="border-t border-line py-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          A feature of the twelve volumes
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          Resonant Counsel
        </h2>
        <p className="mt-5 max-w-3xl font-serif text-xl font-light leading-relaxed text-ink">
          Counsel drawn from the twelve volumes, with the volume and passage
          behind every answer.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          Bring something you are weighing. A model answers you bound to the
          series, and the citation shows which volume and which passage it drew
          on, so you can read the passage yourself and judge whether the answer
          was faithful to it. When the books do not address a question, it says
          so.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/resonance/counsel"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Resonant Counsel <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>
      <section className="border-t border-line py-12">
        <p className="max-w-3xl font-serif text-lg font-light italic leading-snug text-ink sm:text-xl">
          One author, one substrate. The series is written as a single body of
          thought rather than a shelf of separate titles.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          About the Institute <span aria-hidden>&rarr;</span>
        </Link>
      </section>

    </div>
  );
}
