import Link from "next/link";
import { books, trilogies } from "@/lib/canon";

// BOOKS-FIRST PIVOT, 2026-09-19. This page led with an open letter and then gave MORIS and the
// series equal cards, with MORIS carrying the accent and the heavier border. The site is now a books
// site. The series is the whole front door; there is no second body of work on it.
//
// 2026-09-23: Resonant Counsel came down and Ask MORIS became a single outbound link to
// askmoris.ai. The static MORIS demos that used to live under public/moris/ are archived and
// their clean URLs now forward there. Everything removed is under archive/ and the tag
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

      {/* ASK MORIS, 2026-09-23. Resonant Counsel is gone from this site and nothing replaces it
          here. The companion was evaluated on 09-23 and the retrieval it would have run could not
          tell a question the books answer from one they do not: the worst on-topic question scored
          below the best question about roasting a chicken. Rather than ship a weaker promise, the
          page came down. The index and the evaluation are kept as evidence.

          What sits here instead is a link OUT. Ask MORIS runs at askmoris.ai and there is no second
          instance of it in this repository. It is a demonstration that ends by pointing at a book,
          which is the only reason it is on a book site at all. The twelve volumes are the product. */}
      <section className="border-t border-line py-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          A demonstration
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          Ask MORIS
        </h2>
        <p className="mt-5 max-w-3xl font-serif text-xl font-light leading-relaxed text-ink">
          An AI bound to the Resonance philosophy.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          It answers from one body of thought, and it shows you which principles
          applied and where they came from in the books.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href="https://askmoris.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Ask MORIS at askmoris.ai <span aria-hidden>&rarr;</span>
          </a>
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
