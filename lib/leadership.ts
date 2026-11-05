// THE FOUR LEADERSHIP BOOKS, 2026-11-04 (the build map, approved by the operator). Each is drawn from
// one trilogy of A Living Philosophy and written for working leaders. The taglines are the books' own,
// as they are set on the covers. The Return is nearly ready and has its own page at /the-return; the
// other three are in preparation and are anchored on /leadership until they have pages of their own.
//
// The covers in public/leadership/ are the front art with the respaced "C. T. HERNDON" byline,
// resized for the web. public/the-return/cover.jpg is the same image as the-return.jpg here.

export type LeadershipBook = {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  trilogySlug: string;
  trilogyName: string;
  books: string;
  ready: boolean;
  href: string;
};

export const leadershipBooks: LeadershipBook[] = [
  {
    slug: "the-return",
    title: "The Return",
    tagline: "Every leader drifts. Coming back is the work.",
    cover: "/leadership/the-return.jpg",
    trilogySlug: "tuning",
    trilogyName: "Tuning",
    books: "Books I to III",
    ready: true,
    href: "/the-return",
  },
  {
    slug: "the-transformation",
    title: "The Transformation",
    tagline: "Change is not managed. It must be embodied.",
    cover: "/leadership/the-transformation.jpg",
    trilogySlug: "transformation",
    trilogyName: "Transformation",
    books: "Books IV to VI",
    ready: false,
    href: "/leadership#the-transformation",
  },
  {
    slug: "the-hourglass",
    title: "The Hourglass",
    tagline: "Time is not spent. It is kept.",
    cover: "/leadership/the-hourglass.jpg",
    trilogySlug: "time",
    trilogyName: "Time",
    books: "Books VII to IX",
    ready: false,
    href: "/leadership#the-hourglass",
  },
  {
    slug: "the-lamp",
    title: "The Lamp",
    tagline: "Light does not perform. It reveals.",
    cover: "/leadership/the-lamp.jpg",
    trilogySlug: "sacred",
    trilogyName: "The Sacred",
    books: "Books X to XII",
    ready: false,
    href: "/leadership#the-lamp",
  },
];

export function leadershipBookForTrilogy(trilogySlug: string): LeadershipBook | undefined {
  return leadershipBooks.find((b) => b.trilogySlug === trilogySlug);
}

// The notify mailto, the pattern from app/the-return/page.tsx: a prefilled subject so the visitor
// does not compose the request from a standing start, and no form (the 2026-09-25 ruling).
export const RETURN_NOTIFY =
  "mailto:contact@resonanceinstitutellc.com" +
  "?subject=" + encodeURIComponent("The Return: tell me when it lands");
