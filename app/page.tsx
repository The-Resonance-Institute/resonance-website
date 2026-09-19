import Link from "next/link";
import { books, trilogies } from "@/lib/canon";

// BOOKS-FIRST PIVOT, 2026-09-19. This page led with an open letter and then gave MORIS and the
// series equal cards, with MORIS carrying the accent and the heavier border. The site is now a books
// site. The series is the whole front door; there is no second body of work on it.
//
// Ask MORIS survives as its own section, carrying the three MORIS surfaces that are kept: the chat
// demo, the side-by-side demonstration, and askmoris.ai. It is honest about the mechanism, because
// a mechanical gate deriving from the series is what it is, and it says nothing about a conscience
// or about agents. Everything else is under archive/site-2026-09-19/ and the tag
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

      {/* ASK MORIS, promoted to a full section on the operator's word (2026-09-19). It was a small
          card at the foot of the page; it now carries its own header and sits directly under the
          trilogies, prominent without displacing the books.

          The copy is honest about the mechanism and says nothing about a conscience or about agents.
          It also no longer says the model "read the series", which implied the books were trained
          into something. They are not: the gate derives a judgment from the philosophy at the moment
          you ask, and the answering model is handed the result. */}
      <section className="border-t border-line py-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Built on the series
        </p>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-ink sm:text-4xl">
          Ask MORIS
        </h2>
        <p className="mt-5 max-w-3xl font-serif text-xl font-light leading-relaxed text-ink">
          Put something you are actually weighing to a mechanical gate built on the
          fifteen manuscripts. It derives a judgment from the philosophy in them, and
          the model that writes your answer is given what it found.
        </p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">
          The judgment is mechanical rather than generated: no model makes it, the
          same reading always lands in the same place, and nothing is trained on the
          books. The philosophy is applied at the moment you ask. The side-by-side
          puts one message to the same model twice, raw and through MORIS, so the
          difference is the only thing that changes.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/moris/chat"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Try it here <span aria-hidden>&rarr;</span>
          </Link>
          <Link
            href="/moris/pair"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
          >
            See both answers, side by side <span aria-hidden>&rarr;</span>
          </Link>
          <a
            href="https://askmoris.ai"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
          >
            askmoris.ai <span aria-hidden>&rarr;</span>
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
