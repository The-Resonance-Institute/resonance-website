import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MORIS",
  description:
    "MORIS is an artificial conscience for machines that act: a deterministic pre-execution control plane that judges what an action means, before it executes, from a fixed authored posture.",
};

const properties = [
  {
    h: "Deterministic, and it reads meaning",
    p: "No model sits where the verdict is decided, so no crafted prompt can argue it out of its answer. The same action yields the same verdict, and that verdict is about what the action means, not merely whether it was permitted.",
  },
  {
    h: "Model-agnostic",
    p: "The gate never sees the model behind the action, so the verdict is identical for any model at all, including ones that do not exist yet.",
  },
  {
    h: "Govern, not block",
    p: "Govern is the default. It names the specific concern an action raises and bounds how it proceeds, so two governed actions are handled differently. An allow/block control has one lever; a posture reads how much and what kind.",
  },
  {
    h: "Re-derivable",
    p: "Every verdict is sealed to a tamper-evident record that a party who does not trust the operator can reproduce, byte for byte. Not an assertion. Evidence.",
  },
];

export default function MorisLanding() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-10 pb-12 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Deterministic pre-execution control plane
        </p>
        <h1 className="mt-6 font-serif text-5xl text-ink sm:text-6xl">MORIS</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink">
          A fixed, authored way of perceiving the character of an action, held
          mechanically, that renders a verdict before the action executes.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          It judges against a posture, not a doctrine: an action is projected onto
          an authored moral basis and read as a gradient, so it generalizes to the
          action no rule enumerated. It is built on the{" "}
          <Link href="/resonance" className="text-accent underline decoration-line hover:decoration-accent">
            Resonance corpus
          </Link>
          , the philosophy that proved to be a substrate well suited to building
          one.
        </p>
      </section>

      <section className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {properties.map((f) => (
          <div key={f.h} className="bg-white p-7">
            <h3 className="font-serif text-xl text-ink">{f.h}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{f.p}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 rounded-2xl border border-line bg-accent-soft p-8 sm:p-10">
        <h2 className="font-serif text-2xl text-ink">The honest edge</h2>
        <p className="mt-3 max-w-2xl text-ink">
          The claim is not that MORIS blocks more than a good policy. It is that it
          reads what a rulebook cannot, and makes the decision provable. The
          judgment is a pure function: no model sits where the verdict is decided,
          so no crafted prompt can argue it out of its answer, and the same action
          always yields the same verdict. Everyone else&rsquo;s soft spot is the
          judge. Ours never is.
        </p>
      </section>

      <section className="mt-14 grid gap-5 sm:grid-cols-2">
        <Link
          href="/moris/problem"
          className="group rounded-2xl border border-line bg-white p-7 transition-colors hover:border-accent"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The problem
          </p>
          <h3 className="mt-2 font-serif text-xl text-ink">
            Permitted, and still wrong
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Documented harm without malice, and the industry converging on the gap:
            incidents, analysts, the labs, and the regulation.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-ink">
            Read <span aria-hidden>&rarr;</span>
          </span>
        </Link>
        <Link
          href="/moris/conscience"
          className="group rounded-2xl border border-line bg-white p-7 transition-colors hover:border-accent"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The category
          </p>
          <h3 className="mt-2 font-serif text-xl text-ink">
            What an artificial conscience is
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The failure it is for, the three-property test, and why it is a
            posture, not a doctrine.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-ink">
            Read <span aria-hidden>&rarr;</span>
          </span>
        </Link>
        <Link
          href="/moris/consequences"
          className="group rounded-2xl border border-line bg-white p-7 transition-colors hover:border-accent"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            What falls out
          </p>
          <h3 className="mt-2 font-serif text-xl text-ink">
            The shadows a conscience casts
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Governance, safety, auditability, jailbreak resistance, reliability:
            properties a conscience has, not products it adds.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-ink">
            Read <span aria-hidden>&rarr;</span>
          </span>
        </Link>
        <Link
          href="/moris/evidence"
          className="group rounded-2xl border border-line bg-white p-7 transition-colors hover:border-accent"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The evidence
          </p>
          <h3 className="mt-2 font-serif text-xl text-ink">
            A verdict you can recompute
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Re-derivable, not just logged: why anyone who distrusts you can
            reproduce the verdict, and why immutable is not enough.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-ink">
            Read <span aria-hidden>&rarr;</span>
          </span>
        </Link>
        <Link
          href="/moris/platform"
          className="group rounded-2xl border border-line bg-white p-7 transition-colors hover:border-accent"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The platform thesis
          </p>
          <h3 className="mt-2 font-serif text-xl text-ink">
            One conscience, many autonomies
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Why a domain-independent judgment is infrastructure, not a feature, and
            the one company that is the whole proof.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-ink">
            Read <span aria-hidden>&rarr;</span>
          </span>
        </Link>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Under NDA</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Everything public here is the pre-NDA layer: the frame, the category, the
          evidence. The mechanism, how the corpus becomes a basis a machine can
          project onto and how the gate turns a projection into a verdict, is the
          subject of a filed US utility patent and is disclosed in full under NDA.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
        >
          Request the technical package <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
