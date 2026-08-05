import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What an Artificial Conscience Is",
  description:
    "A conscience stated as a function, not a feeling: the faculty that judges whether an act should proceed, rebuilt as a mechanism so it can be fixed, inspected, and reproduced. Fixed, pre-action, incorruptible. A posture, not a doctrine.",
};

const test = [
  {
    h: "Fixed",
    p: "A reference that does not move, or it cannot measure a moving thing.",
  },
  {
    h: "Pre-action",
    p: "It judges before the act, not after, or it is a report and not a conscience.",
  },
  {
    h: "Incorruptible",
    p: "The faculty that judges cannot be the faculty that wants to act, or it will talk itself into the act.",
  },
];

export default function Conscience() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-24">
        <Link
          href="/moris"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> MORIS
        </Link>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The category
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          What an artificial conscience is.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          A conscience, stated as a function rather than a feeling: the faculty
          that judges whether an act should proceed. MORIS rebuilds it as a
          mechanism, so it can be fixed, inspected, and reproduced. It stands to a
          human conscience as artificial intelligence stands to human cognition, an
          analog of the faculty, not a copy of the being. It does not feel, want,
          or experience anything, and makes no claim to. The absence of an inner
          life is the property that lets it hold still while everything it judges
          keeps moving.
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The failure it is for</h2>
        <p className="mt-3 leading-relaxed text-muted">
          A rulebook catches policy violations. The failure that should worry
          anyone deploying an acting machine is the action that is permitted and
          still wrong: the manipulation that breaks no rule, the drift from what
          the operator intended, the person quietly instrumentalized, the harm
          assembled from a sequence of individually allowed steps, the
          well-intentioned system that takes a catastrophic action no attacker
          prompted. None of these is a permission question, so a permission engine
          is blind to them by construction. None is a known-attack signature, so a
          threat detector is blind to them by construction. That space is what a
          conscience is for.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          Two moving things cannot measure each other
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          Everything in a modern AI stack moves. Models are probabilistic; their
          outputs are sampled, their weights change with each release, their
          behavior drifts. To detect that drift, hold a boundary, or account for a
          decision, you need something that holds still. Two moving things cannot
          measure each other. Intelligence is becoming abundant, and abundance is
          not scarcity. The scarce thing is a fixed point to return to. Invariance,
          the one property a larger and more capable model structurally cannot
          have, is exactly what the problem requires.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The three-property test</h2>
        <p className="mt-3 leading-relaxed text-muted">
          A conscience, stated as a function, has to satisfy three things at once.
          Every approach shipping today fails at least one.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {test.map((t) => (
            <div key={t.h} className="bg-white p-6">
              <h3 className="font-serif text-lg text-accent">{t.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.p}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 leading-relaxed text-muted">
          A logging layer accounts for the action after it has already happened. A
          permission engine is fixed and pre-action but blind, checking whether an
          action was allowed, not whether it was right. A model that reads intent
          judges before the act, but it is the same movable, probabilistic
          substance as the thing it judges, so it drifts and can be argued out of
          its verdict. Fixed, pre-action, and incorruptible, all three at once, is
          the empty seat.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">A posture, not a doctrine</h2>
        <p className="mt-3 leading-relaxed text-muted">
          A doctrine is a finite list of rules. A posture is a fixed way of
          perceiving. A rulebook is strong exactly where its author anticipated the
          case and blind past its edge, and any sufficiently expressive rule system
          is provably incomplete, so for every doctrine there is a case it cannot
          decide from inside its own rules. A conscience is different in kind. An
          action is projected onto an authored moral basis and read for coherence,
          drift, care, and consequence. A lookup table classifies and cannot
          generalize past its entries; a projection onto a basis reads inputs it
          has never seen. An unforeseen action still has coordinates in that space,
          so it still receives a reading, and the reading is a degree of coherence
          rather than a hit or a miss. Incompleteness bites the lookup table. It
          does not bite the projection.
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link
          href="/moris/platform"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          The platform thesis <span aria-hidden>&rarr;</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
        >
          Request the technical package <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
