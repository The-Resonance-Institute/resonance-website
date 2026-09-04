import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Resonance Institute is the studio of C. T. Herndon, based in Huntington Beach, California. It holds the copyright to the Resonance Series and the intellectual property behind MORIS, an artificial conscience: a mechanical, deterministic control plane for moral thought.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-28">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
          The author and the Institute
        </h1>
      </section>

      <section className="space-y-5 border-t border-line pt-10 text-lg leading-relaxed text-ink">
        <p>
          The Resonance Institute is the studio of C. T. Herndon, based in
          Huntington Beach, California. It holds the copyright to the{" "}
          <Link href="/resonance" className="text-accent underline decoration-line hover:decoration-accent">
            Resonance Series
          </Link>{" "}
          and the intellectual property behind MORIS.
        </p>
        <p>
          The Series came first: fifteen books on how a person, a community, and
          an institution stay coherent under pressure, written as philosophy and
          not as documentation of a system. From it came{" "}
          <Link href="/moris" className="text-accent underline decoration-line hover:decoration-accent">
            MORIS
          </Link>
          , an artificial conscience: a mechanical, deterministic control plane
          for moral thought.
        </p>
        <p>
          The philosophy is the parent. The system is what it proved capable of.
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
