import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { share } from "@/lib/share";
import { leadershipBooks, RETURN_NOTIFY } from "@/lib/leadership";

// LEADERSHIP, 2026-11-04 (the approved build map). Its own menu item, because working leaders are the
// largest readership and The Return is the next book out. Four books, each drawn from one trilogy of
// A Living Philosophy, each shown with its cover and its line, in the volume pages' shape: the cover
// first, then the line, then where it comes from and the way onward.
//
// THE ONE ACTION is "Know when it lands", the mailto from app/the-return/page.tsx, for The Return. The
// other three say only that they are in preparation: no dates, and no promise beyond that.

export const metadata: Metadata = share("/leadership", {
  title: "Leadership",
  description:
    "Four books for working leaders by C. T. Herndon, each drawn from one trilogy of A Living Philosophy: The Return, The Transformation, The Hourglass and The Lamp. The Return is nearly ready.",
});

export default function Leadership() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-16 pb-10 sm:pt-20">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Leadership
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Four books for working leaders.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl font-light leading-relaxed text-ink">
          Each takes one trilogy of{" "}
          <Link
            href="/resonance"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            A Living Philosophy
          </Link>
          {" "}out of the study and onto the floor: written for leaders in the thick of the work, and
          made to be practiced, not just understood. The Return is nearly ready. The other three are in
          preparation.
        </p>
      </section>

      <div className="space-y-px overflow-hidden rounded-2xl border border-line bg-line">
        {leadershipBooks.map((b) => (
          <section
            key={b.slug}
            id={b.slug}
            className="grid scroll-mt-8 gap-8 bg-white p-6 sm:grid-cols-[180px_1fr] sm:gap-10 sm:p-8"
          >
            <div className="mx-auto w-40 sm:mx-0 sm:w-[180px]">
              <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line shadow-md">
                <Image
                  src={b.cover}
                  alt={`Cover of ${b.title}: ${b.tagline} By C. T. Herndon`}
                  fill
                  sizes="(max-width: 640px) 160px, 180px"
                  className="object-cover"
                  priority={b.ready}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {b.ready ? "Nearly ready" : "In preparation"}
              </p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-ink">{b.title}</h2>
              <p className="mt-3 font-serif text-xl font-light italic leading-relaxed text-ink">
                {b.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Drawn from{" "}
                <Link
                  href={`/resonance/trilogy/${b.trilogySlug}`}
                  className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
                >
                  the {b.trilogyName.replace(/^The /, "")} trilogy
                </Link>
                , {b.books} of A Living Philosophy.
              </p>
              {b.ready && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={b.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    About the book <span aria-hidden>&rarr;</span>
                  </Link>
                  <a
                    href={RETURN_NOTIFY}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
                  >
                    Know when it lands <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12 border-t border-line pt-10">
        <p className="max-w-2xl leading-relaxed text-muted">
          The twelve volumes behind them are on{" "}
          <Link
            href="/resonance"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            the philosophy&rsquo;s own pages
          </Link>
          , with a passage from each, quoted word for word.
        </p>
      </section>
    </div>
  );
}
