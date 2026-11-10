import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { share } from "@/lib/share";
import { amazon, aegis, apex, unresolved, type Novel, type NovelSeries } from "@/lib/novels";

// NOVELS, 2026-11-04 (the approved build map). Every book, grouped by the name on its cover: C. T.
// Herndon for the Unresolved trilogy, and Jack Maddox, named openly as his pen name for thrillers
// (the operator's decision of 2026-11-04), for AEGIS and APEX. The one action is buy on Amazon, and
// the Jack Maddox books link straight to Amazon too, so a buyer never has to go through another site.
//
// "COMING SOON" IS ALLOWED HERE AND ONLY HERE, by the same decision: AEGIS 12 to 15 and APEX 7 to 9 show
// their covers marked as coming, with no buy link until they are live. The phrase is exempted for
// this file by name in tests/test_books_first.py; the philosophy's own publication guard is unchanged.
//
// jackmaddoxbooks.com is linked once, under the Jack Maddox books, and from nowhere else on the site.

export const metadata: Metadata = share("/novels", {
  title: "Novels",
  description:
    "The Unresolved trilogy by C. T. Herndon, and the AEGIS and APEX thrillers by Jack Maddox, his pen name for thrillers. Every published book is on Amazon.",
});

const buy =
  "inline-flex items-center gap-1.5 py-1 text-sm font-medium text-accent transition-colors hover:text-ink";

function Cover({ book, series, size }: { book: Novel; series: NovelSeries; size: string }) {
  return (
    <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-line shadow-md">
      <Image
        src={book.cover}
        alt={`Cover of ${book.title}, book ${book.n} of ${series.name}`}
        fill
        sizes={size}
        className="object-cover"
      />
    </div>
  );
}

function SeriesHeader({ series }: { series: NovelSeries }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{series.kicker}</p>
      <h3 className="mt-2 font-serif text-2xl text-ink">{series.name}</h3>
      <p className="mt-2 font-serif text-lg font-light italic text-ink">{series.tagline}</p>
      <p className="mt-3 leading-relaxed text-muted">{series.summary}</p>
      {series.screen && (
        <Link href={series.screen.href} className={`${buy} mt-2`}>
          On screen: {series.screen.label} <span aria-hidden>&rarr;</span>
        </Link>
      )}
    </div>
  );
}

function Shelf({ series }: { series: NovelSeries }) {
  return (
    <section id={series.slug} className="mt-10 scroll-mt-8">
      <SeriesHeader series={series} />
      <ol className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-4 lg:grid-cols-6">
        {series.books.map((b) => (
          <li key={b.n} className="flex flex-col">
            <Cover book={b} series={series} size="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 150px" />
            <p className="mt-3 text-xs uppercase tracking-wide text-muted">Book {b.n}</p>
            <p className="mt-0.5 font-serif text-base leading-snug text-ink">{b.title}</p>
            {b.asin ? (
              <a href={amazon(b.asin)} target="_blank" rel="noopener noreferrer" className={buy}>
                Buy on Amazon <span aria-hidden>&rarr;</span>
              </a>
            ) : (
              // The mark sits under the cover, not across it: a band over the art hid the author's
              // name on the APEX covers.
              <p className="mt-1.5 self-start rounded-full bg-accent-soft px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-accent">
                Coming soon
              </p>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Novels() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-14 pb-10 sm:pt-16">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">Novels</h1>
        <p className="mt-5 max-w-2xl font-serif text-xl font-light leading-relaxed text-ink">
          Literary science fiction under C. T. Herndon, and thrillers under
          Jack Maddox. Every published book is on Amazon.
        </p>
      </section>

      {/* C. T. HERNDON: the Unresolved trilogy, in the books' own pattern: the cover, the line, what
          the book tells, and where to buy it. */}
      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-3xl text-ink">C. T. Herndon</h2>
        <section id={unresolved.slug} className="mt-6 scroll-mt-8">
          <SeriesHeader series={unresolved} />
          <ol className="mt-8 grid gap-10 sm:grid-cols-3 sm:gap-6">
            {unresolved.books.map((b) => (
              <li key={b.n} className="flex flex-col">
                <div className="mx-auto w-48 sm:mx-0 sm:w-full">
                  <Cover book={b} series={unresolved} size="(max-width: 640px) 192px, 300px" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-wide text-muted">Book {b.n}</p>
                <h4 className="mt-0.5 font-serif text-xl text-ink">{b.title}</h4>
                <p className="mt-2 font-serif text-lg font-light italic leading-snug text-ink">
                  {b.tagline}
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{b.hook}</p>
                {b.asin && (
                  <a href={amazon(b.asin)} target="_blank" rel="noopener noreferrer" className={`${buy} mt-3`}>
                    Buy on Amazon <span aria-hidden>&rarr;</span>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </section>
      </section>

      <section className="mt-16 border-t border-line pt-10">
        <h2 className="font-serif text-3xl text-ink">Jack Maddox</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
          Jack Maddox is C. T. Herndon&rsquo;s pen name for thrillers.
        </p>
        <Shelf series={aegis} />
        <Shelf series={apex} />
        <p className="mt-12 text-sm text-muted">
          More at{" "}
          <a
            href="https://www.jackmaddoxbooks.com"
            target="_blank"
            rel="noopener noreferrer"
            className="py-1 text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            jackmaddoxbooks.com
          </a>
        </p>
      </section>
    </div>
  );
}
