import Link from "next/link";
import type { Metadata } from "next";
import { fragment, meta, PDF_PAGES, PDF_PATH } from "@/lib/research";
import "../research.css";

// THE RESEARCH SECTION, 2026-10-10. Replaces the open letter in the header.
//
// Research report v1.1, source commit 7b5e62b. Version 1.0 was withdrawn the same day: it
// stated an intended royalty-free patent pledge and a code license carrying a patent grant, neither
// of which the operator authorized. The patent stays proprietary; the information is open source.
//
// WHAT THIS PAGE IS. The letter that opens the research, A Conscience Can Be Chosen, rendered from
// the edition's own letter.html, followed by a contents block into the paper, the appendices and
// the PDF. The letter is signed, so it is shown as it is signed and nothing is added to it.
//
// THE SECTION CAN GROW. A further research page joins it the same way: a source of record in the
// research repository, generated there, copied here, never retyped.
//
// WHY THE OPEN LETTER CAME OFF. The letter was a single signed argument. The research is the
// evidence behind that argument, and it supersedes it. Every old letter URL forwards here, so the
// outreach already sent lands on the fuller thing rather than on a redirect to nothing.

export const metadata: Metadata = {
  title: "Research",
  description:
    "A Conscience Can Be Chosen: the research behind MORIS from The Resonance Institute, with the full paper and every appendix.",
};

export default function Research() {
  const m = meta();
  const mb = (m.pdf.bytes / 1_000_000).toFixed(1);

  return (
    <div className="mx-auto max-w-3xl px-6 pb-20">
      <article
        className="research-prose pt-16 sm:pt-20"
        dangerouslySetInnerHTML={{ __html: fragment("letter") }}
      />

      {/* THE CONTENTS BLOCK is this site's, not the edition's: it is navigation, so it is built
          from meta.json rather than pasted in, and the byte count below comes from the same file
          that pins the checksum. */}
      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The research</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          <Link
            href="/research/paper"
            className="group bg-white p-6 transition-colors hover:bg-accent-soft"
          >
            <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
              Read the paper
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {m.title}: {m.subtitle}
            </p>
          </Link>

          <Link
            href="/research/appendices"
            className="group bg-white p-6 transition-colors hover:bg-accent-soft"
          >
            <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
              The appendices
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The 93 primitives, the evidence ledger, the evaluation item sets,
              the chronology and decision log, and the history of claims.
            </p>
          </Link>

          <a
            href={PDF_PATH}
            className="group bg-white p-6 transition-colors hover:bg-accent-soft"
          >
            <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
              Download the PDF
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The whole report in one file. {PDF_PAGES} pages, {mb} MB.
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
