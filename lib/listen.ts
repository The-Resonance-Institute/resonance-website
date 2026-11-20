// LISTEN, 2026-11-20, on the operator's word: Books I to III of A Living Philosophy are on YouTube,
// read aloud in full on the A Living Philosophy channel (@CTHerndon), one playlist per book. Read by
// /resonance/book/[slug], /resonance/trilogy/[slug] and /resonance, so a book is offered to listen to
// only where it has an entry here.
//
// EACH PLAYLIST WAS CHECKED ON 2026-11-20 before it went in: every episode public, playable and on
// the channel, numbered in order with none missing. The runtime is the episodes added up, rounded.
//
// TO ADD A BOOK, add its entry below with its book number, and every page above picks it up.
//
// WORDING. "Read aloud in full" is the channel's own phrase. This is not a publication claim, and
// tests/test_books_first.py still forbids saying the series is, or will be, published.

export const LISTEN_CHANNEL = "https://www.youtube.com/@CTHerndon";

export type Listening = {
  n: number;
  href: string;
  episodes: number;
  runtime: string;
};

export const listening: Listening[] = [
  {
    n: 1,
    href: "https://www.youtube.com/playlist?list=PLAkst-twvNTI",
    episodes: 24,
    runtime: "about nine hours",
  },
  {
    n: 2,
    href: "https://www.youtube.com/playlist?list=PLLBmJYPVzVP8",
    episodes: 30,
    runtime: "about nine and a half hours",
  },
  {
    n: 3,
    href: "https://www.youtube.com/playlist?list=PLTwB6m0hxgTY",
    episodes: 28,
    runtime: "about eight and a half hours",
  },
];

export const listeningFor = (n: number) => listening.find((l) => l.n === n);
