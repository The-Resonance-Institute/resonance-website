import fs from "node:fs";
import path from "node:path";

// THE RESEARCH EDITION IS GENERATED, NEVER AUTHORED HERE. 2026-10-10.
//
// content/research/ holds four files copied byte-for-byte out of the research repository's build:
// letter.html, paper.html, appendices.html and meta.json. They are the published edition of record,
// version 1.0, source commit 032735a.
//
// NOTHING IN THIS REPOSITORY MAY EDIT THEM. A wrong word is fixed in the source of record, the
// edition is rebuilt there, and the files are copied again. Fixing a typo here would make the site
// and the PDF disagree while both claimed to be version 1.0, and the PDF is checksummed.
//
// The fragments carry no html, head or body wrapper and no classes of their own. They are rendered
// inside .research-prose, whose styles live in app/research.css.

const DIR = path.join(process.cwd(), "content", "research");

export type ResearchMeta = {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  pdf: { file: string; bytes: number; sha256: string };
};

export function meta(): ResearchMeta {
  return JSON.parse(fs.readFileSync(path.join(DIR, "meta.json"), "utf8"));
}

// THE ONE TRANSFORM, AND WHY IT IS NOT AN EDIT. Every table is wrapped in a scrolling container so
// that a wide table takes the horizontal scroll instead of the page. Appendix A is fifteen columns
// and will not fit a phone at any font size.
//
// This wraps, it does not rewrite: no character inside the table changes, and the fragment on disk
// is untouched. The alternative, display:block on the table itself, breaks column alignment in
// every browser, which would be a real change to how the record reads.
export function fragment(name: "letter" | "paper" | "appendices"): string {
  const html = fs.readFileSync(path.join(DIR, `${name}.html`), "utf8");
  return html
    .replace(/<table(?=[\s>])/g, '<div class="research-scroll"><table')
    .replace(/<\/table>/g, "</table></div>");
}

// The PDF is served from public/research/ and is byte-identical to the research repository's
// committed edition. tests/test_books_first.py recomputes its sha256 against meta.json, so a
// re-export that changed a single byte without the edition changing would fail the suite.
export const PDF_PATH = "/research/MORIS_Research_Report.pdf";
