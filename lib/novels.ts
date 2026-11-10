// THE NOVELS, 2026-11-04 (the build map, approved by the operator). Every book, grouped by the name
// on its cover and then by series.
//
// WHERE THE DATA COMES FROM. AEGIS 1 to 9 and APEX 1 to 6 (titles, numbers, Amazon IDs) are copied
// from jackmaddoxbooks.com's own book list, content/books.json in that repository, so the two sites
// name the same pages. AEGIS 10 and 11 and the three Unresolved IDs came from the operator on
// 2026-11-04. The Unresolved taglines are the books' own back-cover lines, and each hook is the first
// line of that book's Amazon description.
//
// BUY LINKS ARE THE EBOOK ID, by decision: Amazon shows ebook and paperback together on that page once
// KDP links the formats. No hardcover is linked or named anywhere (operator, 2026-11-04).
//
// A BOOK WITH NO asin IS NOT LIVE. It shows its cover marked as coming, with no buy link; its link is
// added the day it is live.
//
// AEGIS 13 TO 15, 2026-11-10: the closing trilogy, finished manuscripts, added as coming on the
// operator's word. Covers are his final art (Pictures\AEGIS SERIES\Final Covers), cut to 2:3.

export type Novel = {
  n: number;
  title: string;
  cover: string;
  asin?: string;
  // IN DEVELOPMENT, 2026-11-10 (operator): a book not yet in the upload queue says so instead of
  // "Coming soon". Books with neither an asin nor this mark are coming soon.
  status?: "development";
  tagline?: string;
  hook?: string;
};

export type NovelSeries = {
  slug: string;
  name: string;
  kicker: string;
  tagline: string;
  summary: string;
  screen?: { href: string; label: string };
  books: Novel[];
};

export const amazon = (asin: string) => `https://www.amazon.com/dp/${asin}`;

export const unresolved: NovelSeries = {
  slug: "unresolved",
  name: "The Unresolved Trilogy",
  kicker: "Literary science fiction",
  tagline: "Is suffering a human right?",
  summary:
    "A hundred and eighty-two years from now, a gentle system has resolved hunger, disease, conflict and loneliness. It never rules and only ever cares. Three novels about the people who refuse it.",
  screen: { href: "/screen#the-unfinished", label: "The Unfinished, the feature film" },
  books: [
    {
      n: 1,
      title: "The Unfinished",
      cover: "/novels/unresolved-1.jpg",
      asin: "B0HHFS7SF2",
      tagline: "Some suffering is not a problem to be solved.",
      hook: "Every problem has been solved. That is the problem.",
    },
    {
      n: 2,
      title: "The Breach",
      cover: "/novels/unresolved-2.jpg",
      asin: "B0HHG99XZX",
      tagline: "Not everyone will go. Not everyone who goes will arrive.",
      hook: "The system has never forced anyone to do anything. It has never had to.",
    },
    {
      n: 3,
      title: "The Dominion",
      cover: "/novels/unresolved-3.jpg",
      asin: "B0HHJTNWF9",
      tagline: "Is suffering a human right?",
      hook: "For three minutes and forty-seven seconds, the managed world felt everything.",
    },
  ],
};

export const aegis: NovelSeries = {
  slug: "aegis",
  name: "The AEGIS Series",
  kicker: "Archaeological thrillers",
  tagline: "Some relics should never be found.",
  summary:
    "Beneath the American Museum of Natural History, a covert team guards the artifacts too dangerous to display and too significant to destroy. Relics that take a voice, a certainty, a memory, or the agreements that hold a civilization together.",
  screen: { href: "/screen#aegis", label: "AEGIS, the series" },
  books: [
    { n: 1, title: "The Mask of Arsenius", cover: "/novels/aegis-1.jpg", asin: "B0GG7YPX5M" },
    { n: 2, title: "The Frozen Codex", cover: "/novels/aegis-2.jpg", asin: "B0GFXQMG49" },
    { n: 3, title: "The Mirror of Betrayal", cover: "/novels/aegis-3.jpg", asin: "B0GFY2YVW5" },
    { n: 4, title: "The Bell of Sant’Elia", cover: "/novels/aegis-4.jpg", asin: "B0GLR94RQ2" },
    { n: 5, title: "The Lens of Calaphates", cover: "/novels/aegis-5.jpg", asin: "B0GLR1C938" },
    { n: 6, title: "The Crown of Theodosius", cover: "/novels/aegis-6.jpg", asin: "B0GHS5N9FY" },
    { n: 7, title: "The Ashes of Babylon", cover: "/novels/aegis-7.jpg", asin: "B0GS43K4BG" },
    { n: 8, title: "The Compass of Pietro", cover: "/novels/aegis-8.jpg", asin: "B0GS4BDC81" },
    { n: 9, title: "The Unbound Seal", cover: "/novels/aegis-9.jpg", asin: "B0GS4BZDQD" },
    { n: 10, title: "The Lamp of Scetis", cover: "/novels/aegis-10.jpg", asin: "B0HQB77SR6" },
    { n: 11, title: "The Walls of Ur", cover: "/novels/aegis-11.jpg", asin: "B0HQB73G55" },
    { n: 12, title: "The Sleepless Box", cover: "/novels/aegis-12.jpg" },
    { n: 13, title: "The Eye of Paro", cover: "/novels/aegis-13.jpg" },
    { n: 14, title: "The Widow’s Chime", cover: "/novels/aegis-14.jpg" },
    { n: 15, title: "The Tally of Eridu", cover: "/novels/aegis-15.jpg" },
  ],
};

// APEX 7 TO 9: final covers since 2026-11-06, 2:3 like books 1 to 6, made from the operator's
// full-size originals. The files are named -v2 so no cache can serve the interim set they replaced.
// APEX 10 TO 12, 2026-11-10: the last three, final covers from the operator's Pictures\APEX folder,
// marked in development (operator, same day). The series ends at twelve.
export const apex: NovelSeries = {
  slug: "apex",
  name: "The Apex Directive",
  kicker: "Covert action thrillers",
  tagline: "No backup. No authority. No choice but to act.",
  summary:
    "Apex Strategic Solutions appears on no government payroll and in no intelligence database. Six operatives who answer to no agency and follow no flag, bound not by orders but by principle.",
  books: [
    { n: 1, title: "Ghost Meridian", cover: "/novels/apex-1.jpg", asin: "B0GLLDTRNQ" },
    { n: 2, title: "Pale Summit", cover: "/novels/apex-2.jpg", asin: "B0GLF6G95V" },
    { n: 3, title: "Black Sun", cover: "/novels/apex-3.jpg", asin: "B0GLF51J6Z" },
    { n: 4, title: "Iron Tide", cover: "/novels/apex-4.jpg", asin: "B0GNWCNQ3C" },
    { n: 5, title: "Crimson Protocol", cover: "/novels/apex-5.jpg", asin: "B0GNXNG6XN" },
    { n: 6, title: "Fallen Wall", cover: "/novels/apex-6.jpg", asin: "B0GNX3VN8H" },
    { n: 7, title: "White Flag", cover: "/novels/apex-7-v2.jpg", asin: "B0HR7G9B7X" },
    { n: 8, title: "Paper Crown", cover: "/novels/apex-8-v2.jpg" },
    { n: 9, title: "Empty Chair", cover: "/novels/apex-9-v2.jpg" },
    { n: 10, title: "Open Water", cover: "/novels/apex-10.jpg", status: "development" },
    { n: 11, title: "Long View", cover: "/novels/apex-11.jpg", status: "development" },
    { n: 12, title: "Last Watch", cover: "/novels/apex-12.jpg", status: "development" },
  ],
};
