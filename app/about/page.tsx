import Link from "next/link";
import type { Metadata } from "next";
import { share } from "@/lib/share";

export const metadata: Metadata = share("/about", {
  title: "About",
  description:
    "The Resonance Institute is the studio of C. T. Herndon, based in Huntington Beach, California. It holds the Resonance Series. A Living Philosophy. Four trilogies, twelve volumes, approximately one million words. Complete. Also The Return, the research behind MORIS, and VERUS. Not a lab, no venture funding.",
});

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
          and licenses it.
        </p>
        <p>
          Four trilogies, twelve volumes, approximately one million words,
          complete. Philosophy as a posture rather than a method: the alignment
          of inner and outer, and how a person stands toward the world. Each
          theme is carried from the self to the community to the world, and each
          volume can be read on its own.
        </p>
        {/* THE REST OF THE WORK, 2026-10-16. A reader checking who stands behind VERUS landed here and
            found only the books: this page predated The Return, the research and VERUS. Each is
            named once, in the words its own page uses, so the Institute reads the same from here as
            from the front door. */}
        <p>
          The same standard runs through the rest of the work here:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <Link href="/the-return" className="text-accent underline decoration-line hover:decoration-accent">
              The Return
            </Link>
            , a book for working leaders, drawn from the first three volumes.
          </li>
          <li>
            <Link href="/research" className="text-accent underline decoration-line hover:decoration-accent">
              The research behind MORIS
            </Link>
            , published in full: the paper, every appendix, and the evidence behind each figure,
            including what did not hold.{" "}
            <a
              href="https://askmoris.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline decoration-line hover:decoration-accent"
            >
              Ask MORIS
            </a>{" "}
            is its demonstration.
          </li>
          <li>
            <Link href="/verus" className="text-accent underline decoration-line hover:decoration-accent">
              VERUS
            </Link>
            , software that watches an industrial company&rsquo;s systems all day and all night,
            read-only, and tells its leaders the truth about the operation. Its evidence page
            publishes what is not yet good enough.
          </li>
        </ul>
        <p>
          It is not a lab and takes no venture funding. It is a private
          institute, and its subject is
          resonance: what it takes to see a person, a community, or an institution
          whole rather than as a collection of parts, and to live accordingly. That
          question is the thesis, and the books are the work.
        </p>
        <p className="text-muted">
          Inquiries:{" "}
          <a
            href="mailto:contact@resonanceinstitutellc.com"
            className="text-accent underline decoration-line hover:decoration-accent"
          >
            contact@resonanceinstitutellc.com
          </a>
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        {[
          ["/the-return", "The Return"],
          ["/resonance", "The Philosophy"],
          ["/research", "MORIS Research"],
          ["/verus", "VERUS"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {label} <span aria-hidden>&rarr;</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
