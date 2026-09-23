import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { books as canonBooks, trilogies as canonTrilogies } from "@/lib/canon";
import { PublicationStatus } from "@/components/publication-status";

const bookSlug = (n: number) => canonBooks.find((b) => b.n === n)?.slug;
const trilogySlug = (name: string) =>
  canonTrilogies.find((t) => t.name === name)?.slug;

export const metadata: Metadata = {
  title: "The Twelve Volumes",
  description:
    "The Resonance series in full. A Living Philosophy of Leadership. Four trilogies, twelve volumes, approximately one million words. Complete. Each theme is carried from the self to the community to the world. All twelve are written; none is published yet.",
};

type Book = {
  n: number;
  title: string;
  scale?: string;
  cover: string;
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
    name: "Presence",
    line: "Presence as the ground of leadership: what leadership is before a word is spoken.",
    art: "/trilogies/presence.jpg",
    books: [
      { n: 1, title: "Echoes of the Unseen", scale: "The self", cover: "/covers/book1.jpg" },
      { n: 2, title: "The Fields of Belonging", scale: "The community", cover: "/covers/book2.jpg" },
      { n: 3, title: "The Covenant of the Future", scale: "The world", cover: "/covers/book3.jpg" },
    ],
  },
  {
    numeral: "II",
    name: "Transformation",
    line: "How anything truly changes. Fracture, grief, and silence giving way to fire, emergence, and rhythm.",
    art: "/trilogies/transformation.jpg",
    books: [
      { n: 4, title: "The Threshold of Return", scale: "The self", cover: "/covers/book4.jpg" },
      { n: 5, title: "The Rhythm of Trust", scale: "The community", cover: "/covers/book5.jpg" },
      { n: 6, title: "The Weather of Becoming", scale: "The world", cover: "/covers/book6.jpg" },
    ],
  },
  {
    numeral: "III",
    name: "Time",
    line: "Leading inside something we cannot stop: attention, patience, memory, and bequest across three timescales.",
    art: "/trilogies/time.jpg",
    books: [
      { n: 7, title: "The Sands of Life", scale: "The self", cover: "/covers/book7.jpg" },
      { n: 8, title: "The Two Clocks", scale: "The community", cover: "/covers/book8.jpg" },
      { n: 9, title: "The Eras of Civilization", scale: "The world", cover: "/covers/book9.jpg" },
    ],
  },
  {
    numeral: "IV",
    name: "The Sacred",
    line: "What is owed to the depth of things. Reverence as a capacity.",
    art: "/trilogies/sacred.jpg",
    books: [
      { n: 10, title: "The Art of Nearness", scale: "The self", cover: "/covers/book10.jpg" },
      { n: 11, title: "The Light We Tend Together", scale: "The community", cover: "/covers/book11.jpg" },
      { n: 12, title: "The Mercy of Illumination", scale: "The world", cover: "/covers/book12.jpg" },
    ],
  },
];

function Cover({ book }: { book: Book }) {
  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      <Image
        src={book.cover}
        alt={`Cover of ${book.title}`}
        fill
        sizes="(max-width: 640px) 30vw, 160px"
        className="object-cover"
      />
    </div>
  );
}

export default function Series() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* THE COMPOSITE VOLUME, REPLACED 2026-09-22. The previous artwork had "FIVE TRILOGIES" and
          "FIFTEEN BOOKS" set into the image, and its five objects stood for the five trilogies: the
          seven-knot cord was the Grammar of God trilogy's own instrument, from Book XV. No caption
          could have rescued that, so the column was pulled and the art regenerated with four
          objects and corrected type. The retired image is in archive/site-2026-09-22-grammar-of-god/. */}
      <section className="grid items-center gap-10 pt-16 pb-10 sm:grid-cols-[1fr_260px] sm:pt-20">
        <div>
          <Link
            href="/resonance"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            <span aria-hidden>&larr;</span> The Series
          </Link>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            The twelve volumes.
          </h1>
          <p className="mt-6 max-w-xl font-serif text-xl font-light leading-relaxed text-ink">
            Four trilogies, twelve volumes, approximately one million words,
            complete. Each trilogy carries a single theme across three scales, from
            the self to the community to the world.
          </p>
        </div>
        <div className="mx-auto w-52 sm:w-full">
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line shadow-md">
            <Image
              src="/trilogies/all.jpg"
              alt="A Living Philosophy of Leadership: Four Trilogies, Twelve Volumes"
              fill
              sizes="(max-width: 640px) 208px, 260px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <div className="pb-4">
        <PublicationStatus />
      </div>

      <div className="space-y-16 pb-8">
        {trilogies.map((t) => (
          <section key={t.numeral} className="border-t border-line pt-10">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-10">
              {/* The trilogy volume: the hero of the row, bigger and to the left */}
              <div className="w-44 shrink-0 sm:w-60">
                <Link
                  href={`/resonance/trilogy/${trilogySlug(t.name) ?? ""}`}
                  className="group block"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line shadow-md transition-transform group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    <Image
                      src={t.art}
                      alt={`Cover of the ${t.name} trilogy`}
                      fill
                      sizes="(max-width: 640px) 176px, 240px"
                      className="object-cover"
                    />
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent transition-colors group-hover:text-ink">
                    Explore the trilogy <span aria-hidden>&rarr;</span>
                  </span>
                </Link>
              </div>

              {/* The three volumes: smaller, to the right */}
              <div className="flex-1">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-3xl leading-none text-accent">
                    {t.numeral}
                  </span>
                  <h2 className="font-serif text-2xl text-ink">{t.name}</h2>
                </div>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted">{t.line}</p>

                <div className="mt-6 grid max-w-sm grid-cols-3 gap-3 sm:gap-4">
                  {t.books.map((b) => (
                    <Link
                      key={b.n}
                      href={`/resonance/book/${bookSlug(b.n) ?? ""}`}
                      className="group block"
                    >
                      <div className="transition-transform group-hover:-translate-y-0.5">
                        <Cover book={b} />
                      </div>
                      <div className="mt-2">
                        {b.scale && (
                          <p className="text-[0.55rem] uppercase tracking-[0.14em] text-muted">
                            {b.scale}
                          </p>
                        )}
                        <h3 className="mt-0.5 font-serif text-xs leading-snug text-ink transition-colors group-hover:text-accent">
                          {b.title}
                        </h3>
                        <p className="mt-0.5 text-[0.65rem] text-muted">Book {b.n}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-line bg-white p-8 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          First to land
        </p>
        <h2 className="mt-3 font-serif text-2xl text-ink">
          Book One comes first
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          <span className="italic text-ink">Echoes of the Unseen</span>, the
          opening volume of Presence, is coming soon. The rest of the
          series follows it.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
        >
          Know when it lands <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
