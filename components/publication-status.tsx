import Link from "next/link";

// The publication status of the Resonance series, stated in one place so every
// surface says the same thing. The work is finished; publication is the part
// that has not happened. Word count is measured from the manuscripts:
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
        All fifteen books are finished: five trilogies, over 1.2 million words,
        written over years. None of them has been published yet. The first
        volume,{" "}
        <span className="italic text-ink">Echoes of the Unseen</span>, will be
        published in 2026. A date has not been set.
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
      books are finished; none has been published. The first volume,{" "}
      <span className="italic">Echoes of the Unseen</span>, will be published in
      2026. A date has not been set.
    </p>
  );
}
