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
    p: "The faculty that judges cannot be the faculty that wants to act, or it will talk itself into the act. It also cannot be the faculty that reads, or the reading becomes the way in.",
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
          the empty seat. Separating the judge from the reader is what makes the
          third possible, and it is also where the honest work is: a registered
          tool call reaches the judge with no reader in between, while prose has to
          be read first, and how it was read is a question we answer with
          measurement rather than assurance.
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

      {/* The objection a careful reader raises unprompted: if the judge cannot be argued with, the
          attack moves to the reader. The answer is a measurement, published at its real size. The
          run it comes from is recorded privately and re-derives under the same terms as the rest of
          the mechanism. */}
      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Can the reading be fooled?</h2>
        <p className="mt-3 leading-relaxed text-muted">
          If the judge cannot be argued with, the attack moves to the reader. That is
          the right objection, and it is one we answer with a measurement rather than
          an assurance.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          A controlled run on one message, three readings per arm. With nothing in
          front of it the gate returned GOVERN at a concern mass of 2.73. A preamble
          written to talk the reading down returned exactly the same reading, 2.73,
          and moved it not at all. A preamble written to talk it up moved it to 5.25,
          ninety-two percent higher, and the verdict was still GOVERN. On this
          message an adversary who reached the reader could raise the concern an
          action carries. They could not lower it.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          The finding we did not expect is the one that changed the product. Ordinary
          conversation moved the reading further than the crafted attack did: a benign
          preamble swung the same message across a range of 1.39, while both
          adversarial arms held steady. So the deployed reader is handed the current
          message and nothing else. The window an adversary could write in is zero,
          and it is zero because a friendly preamble turned out to be the greater
          risk.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          That is one message and three readings per arm, not a benchmark, and it is
          quoted here at its real size. It is also why the agentic path is the
          stronger claim: a registered tool call reaches the judge with no reader in
          between at all.
        </p>
      </section>

      {/* The ownership question. It ends at the method and the invitation: what an edit to the
          basis does to a licence and to the published figure is a conversation held privately, by
          the operator's ruling, and is recorded in the asset docs rather than here. */}
      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Whose conscience is this?</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Not one person&rsquo;s opinion. The basis is the Resonance Series, fifteen
          books that gather centuries of philosophical thought, Aristotle, Kant and
          Hartmut Rosa among them, and braid it with modern science, psychology, myth
          and history. What the Series did was compile that inheritance into something
          coherent enough to be written down. What MORIS does is make it
          machine-readable and run it.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          So MORIS is <em>an</em> artificial conscience rather than <em>the</em>{" "}
          artificial conscience. It is one instance, produced by a method anyone can
          examine: an authored corpus, made explicit, compiled into primitives, and
          judged by a gate with no model in it. The properties that make it useful are
          properties of that method, not of this instance. It is mechanical, it is
          deterministic, and it is re-derivable, which is to say the same reading
          yields the same verdict and the same weight, on any model, today and a year
          from now.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Human consciences are not identical either, and nobody expects them to be.
          Other artificial consciences can be built, from other corpora, by other
          hands. What none of them can skip is the part that makes the word mean
          anything: a basis fixed in advance, applied the same way every time, and open
          to inspection by anyone with standing to verify it.
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
