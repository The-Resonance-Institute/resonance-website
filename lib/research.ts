import fs from "node:fs";
import path from "node:path";

// THE RESEARCH EDITION IS GENERATED, NEVER AUTHORED HERE. 2026-10-10.
//
// content/research/ holds four files copied byte-for-byte out of the research repository's build:
// letter.html, paper.html, appendices.html and meta.json. They are the published edition of record,
// version 1.2, source commit 598afd6.
//
// NOTHING IN THIS REPOSITORY MAY EDIT THEM. A wrong word is fixed in the source of record, the
// edition is rebuilt there, and the files are copied again. Fixing a typo here would make the site
// and the PDF disagree while both claimed to be the same version, and the PDF is checksummed.
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
// THE PAGE COUNT IS NOT IN meta.json, so it is stated here once and guarded. It went stale on the
// 1.0 to 1.1 rebuild, when 69 pages became 70 and the download block on /research still said 69.
// tests/test_books_first.py reads the count out of the PDF's own page tree and fails if this number
// disagrees, so the next rebuild cannot leave it wrong quietly.
// THE CONCEPT DOI, deposited 2026-10-11. Zenodo issues two: one for the specific version and one
// for all versions. This is the ALL-VERSIONS doi, which always resolves to the newest deposit, so a
// citation made today still reaches the current paper after the next version replaces this one. The
// version DOI, 10.5281/zenodo.23302504, is deliberately not used anywhere on the site: it goes stale
// the moment a new version is deposited, and a stale citation is worse than none.
//
// Verified before it was published here: both DOIs resolve, and the file Zenodo serves is
// byte-identical to the PDF in public/research/.
export const DOI = "10.5281/zenodo.23302503";
export const DOI_URL = "https://doi.org/10.5281/zenodo.23302503";

export const PDF_PAGES = 70;
export const PDF_PATH = "/research/MORIS_Research_Report.pdf";
