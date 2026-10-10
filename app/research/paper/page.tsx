import Link from "next/link";
import type { Metadata } from "next";
import { fragment, meta, PDF_PATH } from "@/lib/research";
import "../../research.css";

// THE PAPER, 2026-10-10. Research report v1.0, source commit 032735a.
//
// Rendered verbatim from content/research/paper.html. The title block above it is built from
// meta.json rather than written here, so the page cannot drift from the edition it serves.
//
// FIGURE 1 is referenced by the fragment at the absolute path /research/figures/two_paths.svg and
// is served from public/research/figures/. The fragment's own href decides that path, which is why
// the file sits where it does rather than anywhere more convenient.
//
// THE CITATION LINE carries no DOI. There is not one yet; it is added when the Zenodo deposit is
// made, and it is added here only after it exists.

const m = meta();

export const metadata: Metadata = {
  title: "An Operational Artificial Conscience",
  description:
    "A research report from The Resonance Institute showing that a human-authored moral philosophy can be compiled into a deterministic runtime that performs the judgment of an artificial conscience, and locating what stands between that judgment and a complete one.",
};

export default function Paper() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-20">
      <header className="pt-16 sm:pt-20">
        <Link
          href="/research"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> Research
        </Link>
        <h1 className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          {m.title}
        </h1>
        <p className="mt-4 font-serif text-xl font-light leading-relaxed text-ink">
          {m.subtitle}
        </p>
        <p className="mt-5 text-sm text-muted">{m.author}</p>
        <p className="mt-1 text-sm text-muted">{m.date}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a
            href={PDF_PATH}
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            Download the PDF
          </a>
          <Link
            href="/research/appendices"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            Appendices
          </Link>
        </div>
      </header>

      <article
        className="research-prose mt-12"
        dangerouslySetInnerHTML={{ __html: fragment("paper") }}
      />

      <section className="mt-14 border-t border-line pt-8">
        <h2 className="font-serif text-lg text-ink">How to cite</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Herndon, Christopher T. 2026. <em>{m.title}: {m.subtitle}.</em>{" "}
          Research report, version 1.0. The Resonance Institute LLC.
        </p>
      </section>
    </div>
  );
}
