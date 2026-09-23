import Link from "next/link";
import type { Metadata } from "next";

// RESONANT COUNSEL, 2026-09-23. This replaces Ask MORIS on the book site. It is not a rename of the
// old page: the MORIS copy sold a mechanical gate deriving a judgment, which is a governance pitch
// and the wrong promise here. This is a feature of the twelve volumes, with no separate domain and
// no identity of its own.
//
// QUARANTINE. Nothing here reaches into the MORIS build, and the series pages no longer link to
// /moris/chat, /moris/pair or askmoris.ai. Those surfaces are frozen and stay exactly as they are.
//
// THE STANDING LINE, per the 2026-09-22 ruling, is said ONCE on this page rather than on every
// answer. No volume is published yet, so a per-answer caveat would fire every time and become noise
// a reader learns to skip. It becomes per-citation the moment Echoes ships and a Book I citation
// genuinely differs from a Book VII one.

export const metadata: Metadata = {
  title: "Resonant Counsel",
  description:
    "Counsel drawn from the twelve volumes, with the volume and passage behind every answer. A Living Philosophy of Leadership. Four trilogies, twelve volumes, approximately one million words. Complete.",
};

export default function Counsel() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-24">
        <Link href="/resonance" className="text-sm text-muted transition-colors hover:text-accent">
          <span aria-hidden>&larr;</span> The Series
        </Link>
        <h1 className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Resonant Counsel
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          Counsel drawn from the twelve volumes, with the volume and passage
          behind every answer.
        </p>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">What it does</h2>
        <p className="mt-3 leading-relaxed text-muted">
          You bring something you are weighing. A model answers you, bound to the
          twelve volumes, and the citation shows where the answer came from: which
          volume, and the passage itself. You can go and read the passage and
          decide whether the answer was faithful to it.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          It does not claim to be right. It claims to be faithful to a text, which
          is a smaller claim and a checkable one.
        </p>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">What it will not do</h2>
        <ul className="mt-4 space-y-3 leading-relaxed text-muted">
          <li>
            <span className="text-ink">It says when the books are silent.</span>{" "}
            The series is a philosophy of leadership, not an answer to everything.
            When a question sits outside what the twelve volumes address, it says
            so rather than reaching for the nearest passage.
          </li>
          <li>
            <span className="text-ink">It does not speak as the author.</span>{" "}
            You are not talking to C. T. Herndon. You are reading a model that has
            been given his books to answer from.
          </li>
          <li>
            <span className="text-ink">It draws only on the twelve.</span> Nothing
            outside the series informs an answer.
          </li>
        </ul>
      </section>

      {/* THE STANDING LINE. Said once, here, rather than on every answer. */}
      <section className="border-t border-line py-12">
        <div className="rounded-2xl border border-line bg-accent-soft p-6 text-ink">
          <p className="leading-relaxed">
            None of the twelve volumes is published yet. Every passage cited comes
            from a finished manuscript that has not yet been through publication,
            and <span className="italic">Echoes of the Unseen</span> is the first
            to come.
          </p>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted">
          Output is generated automatically and may be inaccurate. It is not
          advice of any kind, and no liability is accepted for it.
        </p>
      </section>

      <section className="border-t border-line py-12">
        <p className="max-w-2xl font-serif text-lg font-light italic leading-snug text-ink">
          The counsel is only as good as the reading behind it, which is why the
          reading is shown.
        </p>
        <Link
          href="/resonance/series"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
        >
          The twelve volumes <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
