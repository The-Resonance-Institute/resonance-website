import canon from "@/content/canon.json";

// The book and trilogy content that drives /resonance/book/[slug] and
// /resonance/trilogy/[slug]. Source of record is
// content/canon/Resonance_Canon_Website_Copy_MASTER_15_Books.docx; canon.json is
// generated from it. Quoted passages are verbatim from the manuscript and are
// never edited; descriptions and arcs are editorial synthesis.

export type Passage = {
  quotes: string[];
  source: string | null;
};

export type Book = {
  n: number;
  slug: string;
  title: string;
  subtitle: string | null;
  scale: string | null;
  trilogySlug: string;
  trilogyName: string;
  cover: string;
  description: string[];
  centralIdea: string[];
  passage: Passage;
  pullQuote: string;
  relationship: string[];
};

export type ArcEntry = { label: string; body: string };

export type Trilogy = {
  numeral: string;
  slug: string;
  name: string;
  art: string;
  heading: string;
  summary: string[];
  governingQuestion: string;
  arc: ArcEntry[];
  passage: Passage;
  bookSlugs: string[];
};

export const books = canon.books as Book[];
export const trilogies = canon.trilogies as Trilogy[];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getTrilogy(slug: string): Trilogy | undefined {
  return trilogies.find((t) => t.slug === slug);
}

export function trilogyOfBook(book: Book): Trilogy | undefined {
  return getTrilogy(book.trilogySlug);
}

export function booksInTrilogy(trilogy: Trilogy): Book[] {
  return trilogy.bookSlugs
    .map((s) => getBook(s))
    .filter((b): b is Book => Boolean(b));
}
