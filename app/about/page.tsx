import Link from "next/link";
import type { Metadata } from "next";
import { share } from "@/lib/share";

// ABOUT, REWRITTEN 2026-11-04, on the operator's word (the approved build map).
//
// THE BIOGRAPHY carries no dollar figure: the operator found the division's size self-aggrandizing and
// chose this wording on 2026-11-04. The Institute paragraph is the one this page already carried, with
// the series called by its one name, A Living Philosophy. The list of what the Institute holds now
// names the novels, the screen work and Pivot Labs as well. The series line ("Four trilogies, twelve
// volumes...") is no longer here: by the same decision it appears on /resonance alone.
//
// Outside sites are linked only from the page about them, so Ask MORIS is reached from /research and
// is named here without a link. VERUS keeps its link: VERUS has no page on this site, so its own site
// is the page about it.

export const metadata: Metadata = share("/about", {
  title: "About",
  description:
    "C. T. Herndon has spent his career leading people in industrial manufacturing, and before that served in military intelligence with the U.S. Army. The Resonance Institute is his studio in Huntington Beach, California: A Living Philosophy and the leadership books drawn from it, the research behind MORIS, VERUS, novels, screen work and Pivot Labs. Not a lab, and no venture funding.",
});

const link = "text-accent underline decoration-line hover:decoration-accent";

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-28">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
          The author and the Institute
        </h1>
      </section>

      <section className="space-y-5 border-t border-line pt-10 text-lg leading-relaxed text-ink">
        <h2 className="font-serif text-2xl text-ink">C. T. Herndon</h2>
        <p>
          C. T. Herndon is the founder of The Resonance Institute. He has spent his career leading
          people in industrial manufacturing, most recently running a manufacturing division, and
          before that served in military intelligence with the U.S. Army, including Desert Storm.
        </p>
        <p>
          He is the author of A Living Philosophy and the leadership books drawn from it, and of the
          Unresolved trilogy. As Jack Maddox, he writes the AEGIS and APEX thrillers. He lives in
          Southern California.
        </p>
      </section>

      <section className="mt-12 space-y-5 border-t border-line pt-10 text-lg leading-relaxed text-ink">
        <h2 className="font-serif text-2xl text-ink">The Institute</h2>
        <p>
          The Resonance Institute is the studio of C. T. Herndon, based in
          Huntington Beach, California. It holds the copyright to{" "}
          <Link href="/resonance" className={link}>
            A Living Philosophy
          </Link>{" "}
          and licenses it.
        </p>
        <p>
          Philosophy as a posture rather than a method: the alignment of inner
          and outer, and how a person stands toward the world. Each theme is
          carried from the self to the community to the world, and each volume
          can be read on its own.
        </p>
        <p>The same standard runs through the rest of the work here:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <Link href="/leadership" className={link}>
              Four books for working leaders
            </Link>
            , each drawn from one trilogy.{" "}
            <Link href="/the-return" className={link}>
              The Return
            </Link>{" "}
            is nearly ready.
          </li>
          <li>
            <Link href="/research" className={link}>
              The research behind MORIS
            </Link>
            , published in full: the paper, every appendix, and the evidence behind each figure,
            including what did not hold. Ask MORIS is its demonstration.
          </li>
          <li>
            <Link href="/novels" className={link}>
              Novels
            </Link>
            : the Unresolved trilogy, and the AEGIS and APEX thrillers written as Jack Maddox.
          </li>
          <li>
            <Link href="/screen" className={link}>
              Original projects for film and television
            </Link>
            , four of them, each written.
          </li>
          <li>
            <Link href="/pivot-labs" className={link}>
              Pivot Labs
            </Link>
            , an animated mockumentary about a startup with thirty days of money left.
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
          <a href="mailto:contact@resonanceinstitutellc.com" className={link}>
            contact@resonanceinstitutellc.com
          </a>
          . Screen projects and pitch requests:{" "}
          <a href="mailto:chris@resonanceinstitutellc.com" className={link}>
            chris@resonanceinstitutellc.com
          </a>
          .
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        {/* The header's order (content/nav.json), About itself left out. VERUS is its own site, so it
            is a plain anchor; a Next Link would route inside this one. */}
        {[
          ["/resonance", "Philosophy"],
          ["/leadership", "Leadership"],
          ["/research", "Research"],
          ["/novels", "Novels"],
          ["/screen", "Film & TV"],
        ].map(([href, label]) => {
          const pill =
            "inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent";
          return href.startsWith("http") ? (
            <a key={href} href={href} className={pill}>
              {label} <span aria-hidden>&rarr;</span>
            </a>
          ) : (
            <Link key={href} href={href} className={pill}>
              {label} <span aria-hidden>&rarr;</span>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
