import Link from "next/link";

// The publication status of the Resonance series, stated in one place so every
// surface says the same thing. The manuscripts are written; the editorial work
// and publication have not happened. No year, no date, by the operator's word. Word count is measured from the manuscripts:
// 1,236,478 across the fifteen books.

export function PublicationStatus() {
  return (
    <section className="rounded-2xl border border-line bg-white p-7 sm:p-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
        Publication status
      </p>
      <h2 className="mt-3 font-serif text-2xl text-ink">
        Written. Not yet published.
      </h2>
      <p className="mt-3 leading-relaxed text-muted">
        All fifteen manuscripts are written: five trilogies, over 1.2 million
        words. None has been published yet. Book one,{" "}
        <span className="italic text-ink">Echoes of the Unseen</span>, is coming
        soon.
      </p>
      <Link
        href="/contact"
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
      >
        Know when it lands <span aria-hidden>&rarr;</span>
      </Link>
    </section>
  );
}

// The same fact in one line, for the book and trilogy pages, where the reader
// has already arrived at a specific volume.
export function PublicationNote() {
  return (
    <p className="text-sm leading-relaxed text-muted">
      <span className="text-ink">Written, not yet published.</span> All fifteen
      manuscripts are written, over 1.2 million words; none has been published
      yet. Book one, <span className="italic">Echoes of the Unseen</span>, is
      coming soon.
    </p>
  );
}
