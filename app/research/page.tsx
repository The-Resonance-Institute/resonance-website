import Link from "next/link";
import type { Metadata } from "next";
import { share } from "@/lib/share";
import { DOI, fragment, meta, PDF_PAGES, PDF_PATH } from "@/lib/research";
import "../research.css";

// THE THREE PAPERS ON ZENODO (2026-10-17, on the operator's word: "there are actually three zenodo papers and
// I think we only link 1"). The report above was the only one linked; the two earlier papers were only in its
// reference list. Kept here, in the research zone, because the papers' own titles use words the
// front-door vocabulary guard keeps out of the rest of the site. Each is listed by its ALL-VERSIONS concept DOI, for the reason given above. Titles,
// versions and dates were read from Zenodo's own records on 2026-10-17, and every DOI resolved.
const PAPERS = [
  {
    title:
      "An Operational Artificial Conscience: Compiling a Human-Authored Moral Ontology into a Deterministic Runtime: Results and Limits of MORIS",
    line: "The full report on MORIS: what it does, how it was built, and where it falls short. The paper on this page.",
    edition: "Version 1.2, October 2026",
    doi: DOI,
  },
  {
    title: "An Artificial Conscience: Deterministic Moral Judgment as a Gradient, Measured Against a Public Corpus",
    line: "The first paper: what an action means, judged by a fixed function with no model inside it, measured against 680 public moral dilemmas.",
    edition: "Version 1.1, August 2026",
    doi: "10.5281/zenodo.21936444",
  },
  {
    title: "Absent-Party Harm: Model-Originated Guidance Against Someone Who Is Not Represented",
    line: "A pre-registered study of AI advice that works against someone who is not in the conversation, across four models, with and without MORIS in front.",
    edition: "Version 1.0, September 2026",
    doi: "10.5281/zenodo.22801949",
  },
] as const;

// THE RESEARCH SECTION, 2026-10-10. Replaces the open letter in the header.
//
// Research report v1.2, source commit 598afd6. Version 1.0 was withdrawn the same day: it
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

export const metadata: Metadata = share("/research", {
  title: "Research",
  description:
    "A Conscience Can Be Chosen: the research behind MORIS from The Resonance Institute, with the full paper and every appendix.",
});

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

        {/* ARCHIVED ON ZENODO, 2026-10-11. The deposit is what makes this citable and what keeps it
            reachable if this site ever stops serving it, so it sits under the contents rather than
            inside a card: it is not a fourth destination, it is where the three above are kept.
            The link is the ALL-VERSIONS concept DOI, held once in lib/research.ts so this and the
            citation line on the paper cannot drift apart. */}
        <div className="mt-8">
          <h2 className="font-serif text-xl text-ink">The three papers, archived on Zenodo</h2>
          <ol className="mt-4 space-y-5">
            {PAPERS.map((p) => (
              <li key={p.doi} className="text-sm leading-relaxed">
                <a
                  href={`https://doi.org/${p.doi}`}
                  className="font-serif text-base text-ink underline decoration-line underline-offset-2 hover:text-accent hover:decoration-accent"
                >
                  {p.title}
                </a>
                <p className="mt-1 text-muted">{p.line}</p>
                <p className="mt-0.5 text-xs text-faint">
                  {p.edition} · doi.org/{p.doi}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
