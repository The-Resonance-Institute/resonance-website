import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Institute statement — compact */}
      <section className="pt-14 pb-10 sm:pt-16">
        <p className="max-w-3xl font-serif text-xl font-light leading-snug text-ink sm:text-2xl">
          The Resonance Institute is an independent studio for rigorous
          philosophical thought, where enduring questions meet modern technology.
          From one authored foundation come two bodies of work, the Resonance
          corpus and MORIS, and the teaching and counsel that grow from the same
          source.
        </p>
      </section>

      {/* Two zones, side by side */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* MORIS — primary (accent-tinted, visually weightier) */}
        <div className="flex flex-col rounded-2xl border border-accent/20 bg-accent-soft p-8 sm:p-9">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The system
          </p>
          <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">MORIS</h2>
          <p className="mt-4 flex-1 text-lg leading-relaxed text-ink">
            An artificial conscience for machines that act: a deterministic
            pre-execution control plane that judges what an action means, before it
            executes, and produces a verdict anyone can reproduce.
          </p>
          <Link
            href="/moris"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            Enter the MORIS wing <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        {/* Corpus — prominent secondary */}
        <div className="flex flex-col rounded-2xl border border-line bg-white p-8 sm:p-9">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
            The substrate
          </p>
          <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">
            The Corpus
          </h2>
          <p className="mt-4 flex-1 text-lg leading-relaxed text-ink">
            A living philosophy in fifteen books across five trilogies, each
            theme carried from the self to the community to the world. It is also
            the substrate beneath MORIS.
          </p>
          <Link
            href="/resonance"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            Enter the Corpus <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Connective truth + Institute framing */}
      <section className="mt-12 border-t border-line pt-8">
        <p className="max-w-3xl font-serif text-lg font-light italic leading-snug text-ink sm:text-xl">
          MORIS is built on the Resonance corpus. The philosophy came first, on its
          own terms, and turned out to be a substrate well suited to building an
          artificial conscience.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          One author, one substrate. About the Institute{" "}
          <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
