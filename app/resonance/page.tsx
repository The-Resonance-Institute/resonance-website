import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { share } from "@/lib/share";
import { books as canonBooks, trilogies as canonTrilogies } from "@/lib/canon";

// ONE PAGE, 2026-10-07. This was two: /resonance stated the series line, listed the four trilogies
// as cards and carried a "first volume" callout, and /resonance/series stated the series line
// again, listed the same four trilogies with their art and covers, and carried a second "Book One
// comes first" callout. A visitor met the same claim twice and the header offered two doors into
// one body of work. The operator merged them.
//
// WHAT MOVED HERE AND WHY IT MATTERS: every link into a book lived on the Manuscripts page, inside
// the cover grids. So the trilogy-and-covers block came across whole rather than being rebuilt,
// and test_the_philosophy_is_one_page_and_manuscripts_is_gone asserts all twelve books are linked
// from this page (since 2026-10-17 as titles under the four trilogy volumes, not as covers). If a
// trilogy is ever dropped, its three books stop being reachable.
//
// /resonance/series forwards here rather than going dark; it was indexed and in the sitemap.

export const metadata: Metadata = share("/resonance", {
  title: "The Philosophy",
  description:
    "The Resonance series. A Living Philosophy. Four trilogies, twelve volumes, approximately one million words. Complete. Each theme is carried from the self to the community to the world.",
});

const bookSlug = (n: number) => canonBooks.find((b) => b.n === n)?.slug;
const trilogySlug = (name: string) =>
  canonTrilogies.find((t) => t.name === name)?.slug;

type Book = {
  n: number;
  title: string;
  scale?: string;
};

type Trilogy = {
  numeral: string;
  name: string;
  line: string;
  art: string;
  books: Book[];
};

const trilogies: Trilogy[] = [
  {
    numeral: "I",
    name: "Tuning",
    line: "How a leader comes into tune: with themselves, with the people around them, and with those not yet born.",
    art: "/trilogies/tuning.jpg",
    books: [
      { n: 1, title: "Echoes of the Unseen", scale: "The self" },
      { n: 2, title: "The Fields of Belonging", scale: "The community" },
      { n: 3, title: "The Covenant of the Future", scale: "The world" },
    ],
  },
  {
    numeral: "II",
    name: "Transformation",
    line: "How anything truly changes. Fracture, grief, and silence giving way to fire, emergence, and rhythm.",
    art: "/trilogies/transformation.jpg",
    books: [
      { n: 4, title: "The Threshold of Return", scale: "The self" },
      { n: 5, title: "The Rhythm of Trust", scale: "The community" },
      { n: 6, title: "The Weather of Becoming", scale: "The world" },
    ],
  },
  {
    numeral: "III",
    name: "Time",
    line: "Leading inside something we cannot stop: attention, patience, memory, and bequest across three timescales.",
    art: "/trilogies/time.jpg",
    books: [
      { n: 7, title: "The Sands of Life", scale: "The self" },
      { n: 8, title: "The Two Clocks", scale: "The community" },
      { n: 9, title: "The Eras of Civilization", scale: "The world" },
    ],
  },
  {
    numeral: "IV",
    name: "The Sacred",
    line: "What is owed to the depth of things. Reverence as a capacity.",
    art: "/trilogies/sacred.jpg",
    books: [
      { n: 10, title: "The Art of Nearness", scale: "The self" },
      { n: 11, title: "The Light We Tend Together", scale: "The community" },
      { n: 12, title: "The Mercy of Illumination", scale: "The world" },
    ],
  },
];


export default function Philosophy() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* THE COMPOSITE VOLUME, REPLACED 2026-09-22. The previous artwork had "FIVE TRILOGIES" and
          "FIFTEEN BOOKS" set into the image, and its five objects stood for the five trilogies: the
          seven-knot cord was the Grammar of God trilogy's own instrument, from Book XV. No caption
          could have rescued that, so the column was pulled and the art regenerated with four
          objects and corrected type. The retired image is in archive/site-2026-09-22-grammar-of-god/. */}
      <section className="grid items-center gap-10 pt-16 pb-10 sm:grid-cols-[1fr_260px] sm:pt-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            The Philosophy
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            A Living Philosophy.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl font-light leading-relaxed text-ink">
            Four trilogies, twelve volumes, approximately one million words.
            Complete. A philosophy of leadership worked at three scales, self,
            community and world, across four domains. Every volume stands alone;
            together they make one patient argument.
          </p>
        </div>
        <div className="mx-auto w-52 sm:w-full">
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line shadow-md">
            <Image
              src="/trilogies/all.jpg"
              alt="A Living Philosophy: Four Trilogies, Twelve Volumes"
              fill
              sizes="(max-width: 640px) 208px, 260px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The shape of it</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          Each trilogy takes a single theme and carries it across three scales:
          the self, then the community, then the largest frame of civilization
          and world. Four themes, three scales each.
        </p>
      </section>

      {/* FOUR VOLUMES, NOT SIXTEEN COVERS (2026-10-17, on the operator's word: "maybe I should just show
          the four trilogies, each trilogy as one book"). The page had shown the composite, four trilogy
          volumes and all twelve book covers, a wall of books before a visitor knew what the work was.
          Now each trilogy is one volume in a single row, with its three books beneath as titles. Every
          book is still linked from here, and each trilogy's own page shows its three covers. */}
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-10 pb-8 lg:grid-cols-4">
        {trilogies.map((t) => (
          <section key={t.numeral}>
            <Link href={`/resonance/trilogy/${trilogySlug(t.name) ?? ""}`} className="group block">
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line shadow-md transition-transform group-hover:-translate-y-0.5 group-hover:shadow-lg">
                <Image
                  src={t.art}
                  alt={`Cover of the ${t.name} trilogy`}
                  fill
                  sizes="(max-width: 1024px) 45vw, 240px"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-xl leading-none text-accent">{t.numeral}</span>
                <h2 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
                  {t.name}
                </h2>
              </div>
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.line}</p>
            <ol className="mt-3 space-y-1">
              {t.books.map((b) => (
                <li key={b.n} className="text-xs leading-snug">
                  <Link
                    href={`/resonance/book/${bookSlug(b.n) ?? ""}`}
                    className="text-ink underline decoration-line underline-offset-2 hover:text-accent hover:decoration-accent"
                  >
                    {b.title}
                  </Link>
                  <span className="text-muted"> · Book {b.n}</span>
                </li>
              ))}
            </ol>
            <Link
              href={`/resonance/trilogy/${trilogySlug(t.name) ?? ""}`}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-ink"
            >
              Explore the trilogy <span aria-hidden>&rarr;</span>
            </Link>
          </section>
        ))}
      </div>

      {/* THE "first volume" CALLOUT CAME OUT, 2026-10-07. It singled out Book One as the one that
          opens the series, which is a release order, and there is no release. The trilogy sections
          above already present all twelve in order with their numbers, so a reader who wants to
          start at the beginning can see where the beginning is without being told to wait for it. */}

      <section className="mt-12 border-t border-line pt-10">
        <p className="max-w-2xl leading-relaxed text-muted">
          The work was written for anyone who
          knows that leadership and relationship are more than a seven-step program
          or a handful of hacks, that they are the long work of connecting at every
          level and tending the relationships around you.
        </p>
      </section>

      {/* THE CLOSING QUOTE, REPLACED 2026-10-08 BECAUSE IT WAS NOT IN THE BOOKS. This blockquote
          read "To lead is to promise what you touch will not collapse when you are gone," in
          quotation marks, attributed to the author. That sentence appears in none of the fifteen
          manuscripts, and neither does any fragment of it: "will not collapse" occurs three times
          in other sentences, "what you touch" twice, "when you are gone" twice, never together. It
          arrived in 351953a, the conscience-first rebuild, and survived every pivot since because
          nothing checks prose against the source.

          WHAT REPLACES IT IS VERIFIED, from Book VIII, The Two Clocks, in the archive passage that
          closes on authority: "Authority is not our volume. It is the shape of our leaving ... The
          deepest leadership is how a place behaves when we are not there." It carries the same
          meaning the invented line was reaching for, what outlasts the person, and a reader who
          goes looking will now find it.

          THE ATTRIBUTION NAMES THE BOOK, not just the author, so the next person can check it in
          one step rather than searching a million words. Any quotation added to this site should
          be checked against the manuscripts in Canon Books Up To Date 082426/Ground truth/Final
          Manuscripts 092926 and should name its volume. A digest is not a source: several lines
          listed as verified in the 2026-09-16 series synthesis do not appear verbatim in the
          092926 manuscripts at all. */}
      <section className="mt-14 border-t border-line pt-10 pb-4">
        <blockquote className="max-w-2xl font-serif text-2xl font-light italic leading-snug text-ink">
          &ldquo;The deepest leadership is how a place behaves when we are not
          there.&rdquo;
        </blockquote>
        <p className="mt-3 text-sm text-muted">
          The Two Clocks, Book VIII
        </p>
      </section>
    </div>
  );
}
