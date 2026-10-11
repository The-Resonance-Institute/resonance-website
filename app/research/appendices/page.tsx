import Link from "next/link";
import type { Metadata } from "next";
import { fragment, meta, PDF_PATH } from "@/lib/research";
import "../../research.css";

// THE APPENDICES, 2026-10-10. Research report v1.1, source commit 7b5e62b. Version 1.0 was withdrawn the same day: it
// stated an intended royalty-free patent pledge and a code license carrying a patent grant, neither
// of which the operator authorized. The patent stays proprietary; the information is open source.
//
// Appendices A to E, rendered verbatim from content/research/appendices.html: the 93 primitives,
// the evidence ledger, the evaluation item sets, the chronology and decision log, and the history
// of claims.
//
// APPENDIX A IS FIFTEEN COLUMNS WIDE and will not fit a phone at any font size. Every table here
// is wrapped in a scrolling container by lib/research.ts, so the table scrolls and the page does
// not. That wrapping is the only thing done to the fragment, and it changes no character of it.
//
// THIS PAGE CARRIES THE PRIMITIVE NAMES AND IDS, which the mechanism guard otherwise forbids
// anywhere in this repository. The exemption is the research zone and the reason is the operator's
// 2026-10-10 ruling that the project is open source, the books excepted, which voided every earlier
// disclosure ruling.
//
// THE CARD-MARKER CHECKS ARE UNTOUCHED and still apply to this file and to the edition, which both
// pass them. Those markers are deliberately not named here: the first draft of this comment listed
// all three to say they were absent, and tripped the guard on itself. A comment asserting that a
// string does not appear is still an occurrence of the string. See the marker list in
// tests/test_no_mechanism_here.py. What that guard exists to stop, the engine or the card files
// leaving the private repository, is exactly as guarded as it was.

const m = meta();

export const metadata: Metadata = {
  title: "Appendices: An Operational Artificial Conscience",
  description:
    "Appendices to the MORIS research report from The Resonance Institute: the full primitive index, the evidence ledger, the evaluation item sets, the chronology and decision log, and the history of claims.",
};

export default function Appendices() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20">
      {/* NO h1 HERE, DELIBERATELY. appendices.html opens with its own h1, "Appendices", so a heading
          in this chrome printed the word twice, once as site furniture and once as the document's
          own title. The fragment's heading leads instead and this block is reduced to what it is:
          a way back, the parent document's name, and the two sibling links. The paper's fragment
          starts at h2 and does need an h1 from its page, which is why the two differ. */}
      <header className="pt-16 sm:pt-20">
        <Link
          href="/research"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> Research
        </Link>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {m.title}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link
            href="/research/paper"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            Read the paper
          </Link>
          <a
            href={PDF_PATH}
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            Download the PDF
          </a>
        </div>
      </header>

      <article
        className="research-prose mt-10"
        dangerouslySetInnerHTML={{ __html: fragment("appendices") }}
      />
    </div>
  );
}
