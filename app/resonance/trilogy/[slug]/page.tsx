import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { trilogies, getTrilogy, booksInTrilogy } from "@/lib/canon";

export function generateStaticParams() {
  return trilogies.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trilogy = getTrilogy(slug);
  if (!trilogy) return { title: "Not found" };
  return {
    title: `${trilogy.name} Trilogy`,
    description: trilogy.summary[0] ?? trilogy.governingQuestion,
  };
}

export default async function TrilogyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trilogy = getTrilogy(slug);
  if (!trilogy) notFound();

  const books = booksInTrilogy(trilogy);

  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-16 pb-10 sm:pt-20">
        <Link
          href="/resonance/series"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> The fifteen books
        </Link>

        <div className="mt-6 grid gap-8 sm:grid-cols-[220px_1fr] sm:gap-10">
          {/* Artwork first */}
          <div className="mx-auto w-48 sm:mx-0 sm:w-[220px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line shadow-md">
              <Image
                src={trilogy.art}
                alt={`Cover of the ${trilogy.name} trilogy`}
                fill
                sizes="(max-width: 640px) 192px, 220px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Then the descriptions */}
          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Trilogy {trilogy.numeral}
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-ink sm:text-5xl">
              {trilogy.name}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.12em] text-muted">
              Books {books[0]?.n}&ndash;{books[books.length - 1]?.n}
            </p>
          </div>
        </div>
      </section>

      {/* Summary (editorial) */}
      <section className="border-t border-line pt-10">
        <div className="space-y-4 leading-relaxed text-muted">
          {trilogy.summary.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Governing question */}
      {trilogy.governingQuestion && (
        <section className="mt-12 rounded-2xl border border-line bg-accent-soft p-8 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The governing question
          </p>
          <p className="mt-3 font-serif text-2xl font-light leading-relaxed text-ink">
            {trilogy.governingQuestion}
          </p>
        </section>
      )}

      {/* Three-book arc, linking to each book */}
      {trilogy.arc.length > 0 && (
        <section className="mt-12 border-t border-line pt-10">
          <h2 className="font-serif text-2xl text-ink">The three-book arc</h2>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {trilogy.arc.map((a, i) => {
              const book = books[i];
              const inner = (
                <>
                  <div className="flex items-center gap-4">
                    {book && (
                      <div className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-md border border-line">
                        <Image
                          src={book.cover}
                          alt={`Cover of ${book.title}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-serif text-lg leading-none text-accent">
                        {a.label}
                      </p>
                      {book && (
                        <p className="mt-1 font-serif text-sm text-ink">
                          {book.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{a.body}</p>
                </>
              );
              return book ? (
                <Link
                  key={i}
                  href={`/resonance/book/${book.slug}`}
                  className="group bg-white p-6 transition-colors hover:bg-accent-soft/40"
                >
                  {inner}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
                    Read Book {book.n} <span aria-hidden>&rarr;</span>
                  </span>
                </Link>
              ) : (
                <div key={i} className="bg-white p-6">
                  {inner}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Representative passage (verbatim) */}
      {trilogy.passage.quotes.length > 0 && (
        <section className="mt-12 border-t border-line pt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl text-ink">From the trilogy</h2>
            <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              Verbatim
            </span>
          </div>
          <div className="mt-6 space-y-5 border-l-2 border-line pl-6">
            {trilogy.passage.quotes.map((q, i) => (
              <p
                key={i}
                className="font-serif text-lg font-light leading-relaxed text-ink"
              >
                {q}
              </p>
            ))}
          </div>
          {trilogy.passage.source && (
            <p className="mt-4 pl-6 text-sm text-muted">— {trilogy.passage.source}</p>
          )}
        </section>
      )}

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link
          href="/resonance/series"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          All fifteen books <span aria-hidden>&rarr;</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
        >
          Know when it lands <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
