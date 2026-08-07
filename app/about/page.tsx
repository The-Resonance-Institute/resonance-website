import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Resonance Institute holds both the Resonance series copyright and the MORIS intellectual property. One author produced both: a philosopher and operator whose fifteen-book work compiled into a working system for governing the actions of machines.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The author and the Institute
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          One author, one substrate, two bodies of work.
        </h1>
      </section>

      <section className="space-y-5 border-t border-line pt-10 text-lg leading-relaxed text-ink">
        <p>
          The Resonance Institute is the studio of Christopher T. Herndon, a
          philosopher and operator. Its foundation is a fifteen-book body of work,
          authored over years, a living philosophy of how a person, a community,
          and an institution stay coherent under pressure.
        </p>
        <p>
          That work was written on its own terms, as philosophy, not as
          documentation of a system. Its argument runs across five trilogies,
          each carrying a theme from the self to the community to the world. In
          the course of the writing, the
          philosophy turned out to compile: it became the fixed authored basis a
          machine can project an action onto, and from that came{" "}
          <Link href="/moris" className="text-accent underline decoration-line hover:decoration-accent">
            MORIS
          </Link>
          , an artificial conscience for machines. The term is literal but
          bounded: an analog of conscience the way AI is an analog of
          intelligence, not machine sentience and not consciousness. It is a
          fixed moral reference a system checks an action against before it acts,
          and cannot argue its way past.
        </p>
        <p className="text-muted">
          The Institute is the entity that holds both: the copyright to the{" "}
          <Link href="/resonance" className="text-accent underline decoration-line hover:decoration-accent">
            Resonance series
          </Link>{" "}
          and the intellectual property behind MORIS. The philosophy is the parent;
          the system is what it proved capable of. It is a solo undertaking, based
          in Huntington Beach, California.
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link
          href="/moris"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          The MORIS wing <span aria-hidden>&rarr;</span>
        </Link>
        <Link
          href="/resonance"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          The Series <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
