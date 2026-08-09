import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Falls Out",
  description:
    "Governance, safety, auditability, jailbreak resistance, and reliability are not products MORIS adds. They are properties a conscience necessarily has, the shadows it cannot help but cast. The market builds each shadow directly; the conscience casts them all.",
};

const shadows = [
  {
    n: "Jailbreak resistance",
    because: "no model is in the judgment",
    body: "The market builds classifiers to catch adversarial prompts and stays in an arms race, because the thing detecting the attack is the same kind of thing being attacked. A conscience must be incorruptible, which forces the model out of the seat where the verdict is made. A model-free judgment cannot be jailbroken, not because it resists attacks well, but because there is no model in the decision for an attack to move.",
  },
  {
    n: "Reliability and reproducibility",
    because: "the posture is sealed and the gate is a pure function",
    body: "A whole discipline tries to make sampling-based models behave consistently, and loses at the root, because a generative model does not return the same output twice for the same input. A conscience must be fixed, which seals the posture and makes the gate a pure function with no model, no clock, and no randomness. The same action yields the identical verdict by definition, not by tuning.",
  },
  {
    n: "Auditability and Article 12",
    because: "the verdict is re-derivable",
    body: "Because AI is non-deterministic, audit tools cannot reconstruct a decision from logs, so they store large proof bundles in tamper-evident storage, and the record is still contestable. Immutable means retrievable, not reproducible. A conscience's verdict is a pure function of the input against a sealed law, so an auditor can re-run the gate and confirm the verdict recomputes. The audit trail everyone is struggling to build is the exhaust of the conscience.",
  },
  {
    n: "Governance",
    because: "the conscience renders the per-action verdict governance only documents",
    body: "The governance platforms document policy, monitor models, and at most enforce at the gateway; their own analysts call the category documentation in search of enforcement. Governance, stripped down, is one question: was this action permitted, and can we show it. The platforms answer the showing and delegate the judgment. A conscience is the judgment. Governance is its verdict, written down.",
  },
  {
    n: "Action-layer safety",
    because: "the conscience reads the character of the action",
    body: "AI safety in practice is content moderation: classifiers on the text going into and out of a model. But an agent takes actions, not just words, and no content filter governs a tool call. A conscience judges the character of an action, not the content of a message, so action-layer safety is not a capability added to it. It is the conscience, viewed from the safety lane.",
  },
];

export default function Consequences() {
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
          What falls out
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          The shadows a conscience casts.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          Governance, safety, auditability, jailbreak resistance, and reliability
          are not products MORIS adds. They are properties a conscience necessarily
          has. The market has been building each one directly, as a standalone
          product, without the conscience that produces it.
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          Why anything falls out at all
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          Every product lane in the market is a point solution that chases one
          property directly, and gets it partially, because it is pursuing a
          consequence without the cause that would produce it completely. A
          conscience is the cause: a single structure, a fixed authored posture
          judged by a deterministic gate with no model in it. Each market product
          corresponds to one property that structure necessarily has. The products
          are not features stacked onto the conscience. They are the shadows it
          cannot help but cast, and no assembly of the shadows reconstructs the
          object: you cannot assemble a caster of shadows out of shadows.
        </p>
      </section>

      <section className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {shadows.map((s, i) => (
          <div key={s.n} className="bg-white p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-lg leading-none text-accent">
                {i + 1}
              </span>
              <h3 className="font-serif text-xl text-ink">{s.n}</h3>
            </div>
            <p className="mt-1 pl-[1.6rem] text-xs uppercase tracking-[0.12em] text-muted">
              falls out because {s.because}
            </p>
            <p className="mt-3 pl-[1.6rem] text-sm leading-relaxed text-muted">
              {s.body}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The pattern across all five</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The conscience does not aim at any of them. It is a single structure with
          a set of necessary properties, incorruptible, fixed, self-answering,
          character-reading, and each market product is one of those properties
          seen from the outside. Remove the model from the judgment and jailbreak
          resistance is already there. Seal the posture and make the gate pure and
          reliability is already there. Make the verdict re-derivable and the audit
          trail is already there. Render the per-action verdict and governance is
          already there. Judge the character of the action and action-safety is
          already there. Five product lanes, one architecture, and the architecture
          is the parent, because the products are literally its properties, not its
          features.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-dashed border-line bg-accent-soft/40 p-8 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Held as a hypothesis, not a claim
        </p>
        <h2 className="mt-3 font-serif text-2xl text-ink">Multi-agent coherence</h2>
        <p className="mt-3 leading-relaxed text-muted">
          A sixth thing appears to fall out. It belongs apart from the proven five,
          because it is not proven and, at present, cannot be. Because the verdict is a gradient, it bounds the
          character of each individual action. If every agent in a population is
          bound to the same conscience, every action is held within the same
          bounded character, and the hypothesis is that a collective of
          individually-governed actions cannot compose into what a collective of
          ungoverned actions composes into: the swarm-level catastrophe, the flash
          crash, the emergent runaway, prevented not by any agent watching the
          swarm, but by each action being bounded where it is taken, so escalation
          has no ungoverned action to build from.
        </p>
        <p className="mt-3 leading-relaxed text-muted">
          This is structurally reasoned and mechanistically specific, and it is a
          hypothesis, not a result. It cannot presently be tested, because
          witnessing swarm coherence emerge or fail would require observing
          enormous numbers of interacting agents over trillions of interactions, at
          a scale no one can currently instrument. It is a hypothesis, held apart
          from the proven five, and it is not offered as a product.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <p className="leading-relaxed text-muted">
          The artificial conscience is not a governance product, or a safety
          product, or an audit product, that happens to be unusually good. It is the
          parent architecture from which each of those falls out as a necessary
          property. The market has spent years and fortunes building the shadows
          directly. The object that casts them is the thing that was missing.
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link
          href="/moris/conscience"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          What an artificial conscience is <span aria-hidden>&rarr;</span>
        </Link>
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
