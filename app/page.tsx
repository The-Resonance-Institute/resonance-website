import Link from "next/link";
import { books, trilogies } from "@/lib/canon";

// BOOKS-FIRST PIVOT, 2026-09-19. This page led with an open letter and then gave MORIS and the
// series equal cards, with MORIS carrying the accent and the heavier border. The site is now a books
// site. The series is the whole front door; there is no second body of work on it.
//
// Ask MORIS survives as the last thing on the page, framed as what it now is: a novelty, a way to
// put a question to a language model through the lens of the series. No mechanism, no claims, no
// category. Everything removed is under archive/site-2026-09-19/ and the tag
// pre-books-pivot-2026-09-19.

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-14 pb-10 sm:pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The Resonance Institute
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
          A living philosophy, in fifteen manuscripts.
        </h1>
        <p className="mt-6 max-w-3xl font-serif text-xl font-light leading-relaxed text-ink">
          The Resonance series carries one question through five trilogies: how a
          person holds together, how a community holds together, and how the world
          does. Each theme travels from the self outward, and each book can be read
          on its own.
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
            All {books.length} manuscripts <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">The five trilogies</h2>
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

      {/* The novelty, last and deliberately small. */}
      <section className="mt-2 mb-4 rounded-2xl border border-line bg-white p-7">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          A curiosity
        </p>
        <h2 className="mt-3 font-serif text-2xl text-ink">Ask MORIS</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          An experiment: put something you are weighing to a language model that has
          been given the series to read first, and see what it makes of it. It is a
          way to hear the books answer a question they were never asked directly.
        </p>
        <Link
          href="/moris/chat"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
        >
          Try it <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
