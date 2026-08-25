import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { books, getBook, trilogyOfBook, booksInTrilogy } from "@/lib/canon";
import { PublicationNote } from "@/components/publication-status";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Not found" };
  const desc = book.description[0] ?? book.pullQuote;
  return {
    title: `${book.title} · Book ${book.n}`,
    description: desc,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const trilogy = trilogyOfBook(book);
  const bareTrilogy = trilogy ? trilogy.name.replace(/^The /, "") : "";
  const siblings = trilogy ? booksInTrilogy(trilogy) : [];
  const idx = siblings.findIndex((b) => b.slug === book.slug);
  const prev = idx > 0 ? siblings[idx - 1] : undefined;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : undefined;

  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-16 pb-10 sm:pt-20">
        <Link
          href="/resonance/series"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> The fifteen books
        </Link>

        <div className="mt-6 grid gap-8 sm:grid-cols-[200px_1fr] sm:gap-10">
          {/* Artwork first */}
          <div className="mx-auto w-44 sm:mx-0 sm:w-[200px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line shadow-md">
              <Image
                src={book.cover}
                alt={`Cover of ${book.title}`}
                fill
                sizes="(max-width: 640px) 176px, 200px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Then the descriptions */}
          <div className="flex flex-col justify-center">
            {trilogy && (
              <Link
                href={`/resonance/trilogy/${trilogy.slug}`}
                className="text-xs font-medium uppercase tracking-[0.18em] text-accent transition-colors hover:text-ink"
              >
                Trilogy {trilogy.numeral} · {trilogy.name}
              </Link>
            )}
            <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              {book.title}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.12em] text-muted">
              Book {book.n}
              {book.subtitle ? ` · ${book.subtitle}` : ""}
            </p>
            {book.pullQuote && (
              <p className="mt-6 font-serif text-xl font-light italic leading-relaxed text-ink">
                {book.pullQuote}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-line pt-6">
        <PublicationNote />
      </section>

      {/* Book description (editorial) */}
      <section className="mt-10 border-t border-line pt-10">
        <div className="space-y-4 leading-relaxed text-muted">
          {book.description.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Central idea (editorial) */}
      {book.centralIdea.length > 0 && (
        <section className="mt-12 rounded-2xl border border-line bg-accent-soft p-8 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The central idea
          </p>
          <div className="mt-3 space-y-4 leading-relaxed text-ink">
            {book.centralIdea.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Representative passage (verbatim) */}
      {book.passage.quotes.length > 0 && (
        <section className="mt-12 border-t border-line pt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl text-ink">From the book</h2>
            <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              Verbatim
            </span>
          </div>
          <div className="mt-6 space-y-5 border-l-2 border-line pl-6">
            {book.passage.quotes.map((q, i) => (
              <p
                key={i}
                className="font-serif text-lg font-light leading-relaxed text-ink"
              >
                {q}
              </p>
            ))}
          </div>
          {book.passage.source && (
            <p className="mt-4 pl-6 text-sm text-muted">— {book.passage.source}</p>
          )}
        </section>
      )}

      {/* Relationship to the trilogy (editorial) */}
      {book.relationship.length > 0 && (
        <section className="mt-12 border-t border-line pt-10">
          <h2 className="font-serif text-2xl text-ink">
            {trilogy ? `Place in the ${bareTrilogy} trilogy` : "Place in the trilogy"}
          </h2>
          <div className="mt-3 space-y-4 leading-relaxed text-muted">
            {book.relationship.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Prev / next within the trilogy */}
      <nav className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/resonance/book/${prev.slug}`}
            className="group rounded-2xl border border-line bg-white p-5 transition-colors hover:border-accent"
          >
            <span className="text-xs uppercase tracking-wide text-muted">
              <span aria-hidden>&larr;</span> Book {prev.n}
            </span>
            <p className="mt-1 font-serif text-lg text-ink transition-colors group-hover:text-accent">
              {prev.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/resonance/book/${next.slug}`}
            className="group rounded-2xl border border-line bg-white p-5 text-right transition-colors hover:border-accent"
          >
            <span className="text-xs uppercase tracking-wide text-muted">
              Book {next.n} <span aria-hidden>&rarr;</span>
            </span>
            <p className="mt-1 font-serif text-lg text-ink transition-colors group-hover:text-accent">
              {next.title}
            </p>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <section className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/resonance/series"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          All fifteen books <span aria-hidden>&rarr;</span>
        </Link>
        {trilogy && (
          <Link
            href={`/resonance/trilogy/${trilogy.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
          >
            The {bareTrilogy} trilogy <span aria-hidden>&rarr;</span>
          </Link>
        )}
      </section>
    </div>
  );
}
