import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

// THE RETURN, 2026-10-07. The one book that is actually publishing, and the only page on this site
// that invites a reader to be told when something lands.
//
// WHY IT IS NOT UNDER /resonance. It is one trade book drawn from the first three volumes, not
// volume thirteen. Nesting it in the series would file it as one of the twelve, which it is not.
//
// WHY THIS DOES NOT REOPEN THE PUBLICATION FRAME. Every promise of publication came off the site
// earlier today, because the twelve volumes are complete and there is no plan to publish them.
// That stands. This page concerns a different object, and it carries exactly one of the retired
// phrases, the notify link, under the named exemption in tests/test_books_first.py.
//
// NO DATE, BY OPERATOR RULING, and a test enforces it. The book is some way off and the timing does
// not need saying. A page that invites someone to be told is honest in a way that a page guessing
// at a month is not, and it cannot go stale on a schedule nobody controls.
//
// THE COPY IS THE BOOK'S OWN. The thesis and the line about manuals are lifted from its
// introduction rather than written as marketing. Source of record for the manuscript is the
// separate book repository; this page quotes it and does not restate it.

export const metadata: Metadata = {
  title: "The Return",
  description:
    "The Return: Every Leader Drifts. Coming Back Is the Work. A book on leadership by C.T. Herndon, drawn from the first three volumes of A Living Philosophy.",
  openGraph: {
    title: "The Return: Every Leader Drifts. Coming Back Is the Work.",
    description:
      "A book on leadership by C.T. Herndon. Not an infallible leader, but a real one, honest enough to name their own drift in plain sight and disciplined enough to return.",
    type: "book",
  },
};

export default function TheReturn() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="grid items-center gap-10 pt-16 pb-12 sm:grid-cols-[1fr_280px] sm:pt-20">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            A new book
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            The Return
          </h1>
          <p className="mt-4 font-serif text-xl font-light leading-relaxed text-ink sm:text-2xl">
            Every leader drifts. Coming back is the work.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            A book about what a team is actually watching: whether you turn up when
            you said you would, where the correction happens and where the credit
            goes, and what you do on the day you get it wrong in front of everyone.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Know when it lands <span aria-hidden>&rarr;</span>
          </Link>
        </div>
        <div className="mx-auto w-56 sm:w-full">
          <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-line shadow-md">
            <Image
              src="/the-return/cover.jpg"
              alt="Cover of The Return: Every Leader Drifts. Coming Back Is the Work., by C.T. Herndon"
              fill
              sizes="(max-width: 640px) 224px, 280px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">What it argues</h2>
        <p className="mt-4 max-w-2xl font-serif text-xl font-light leading-relaxed text-ink">
          Good leadership is a whole person meeting a whole team, in small, real
          acts carried daily. Not an infallible leader, but a real one, honest
          enough to name their own drift in plain sight and disciplined enough to
          return.
        </p>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Fourteen chapters move from the compass a leader steers by to what they
          leave behind: the word you keep, listening that costs something, the use
          of power, trust and the open ledger, courage and conflict, cadence,
          repair, and bequest. The cases are real and sourced. The scenes that open
          the chapters are composites.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">What it is not</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          There are plenty of books that tell a leader what to do: five steps, seven
          habits, a framework for every kind of meeting. They share a weakness.
          Anyone can perform them, and a team can tell. Manuals describe what to do.
          This book asks who you are while you are doing it. It has no numbered
          methods and no checklists.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Where it comes from</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          The Return is drawn from the first three volumes of{" "}
          <Link
            href="/resonance"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            A Living Philosophy
          </Link>
          , and written in a plainer voice that moves at the pace of a working day.
        </p>
      </section>

      {/* No author paragraph here. /about already carries it, and repeating it on the one page a
          reader is most likely to act on puts biography between them and the only thing to do. */}
      <section className="mt-14 border-t border-line pt-10 pb-6">
        {/* The same button as the hero, not a bare text link. A 14px inline link renders about 20
            pixels tall on a phone, which is the exact defect this repo found in the header in
            September and the footer later that month. This is the page's one action; it should be
            as easy to hit at the bottom as at the top. */}
        <Link
          href="/contact"
          className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          Know when it lands <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
