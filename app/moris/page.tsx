import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MORIS",
  description:
    "MORIS is an artificial conscience: a mechanical, deterministic control plane for moral thought, derived from the Resonance Series, that yields a posture and makes it machine-readable. For machines that act, it judges what an action means before it executes.",
};

const properties = [
  {
    h: "Deterministic, and it reads meaning",
    p: "No model sits where the verdict is decided, so no crafted prompt can argue it out of its answer. The same action, read the same way, yields the same verdict, and that verdict is about what the action means, not merely whether it was permitted. The same reading always produces the same verdict and the same weight, on any model, today and a year from now.",
  },
  {
    h: "Model-agnostic",
    p: "The gate never sees the model behind the action, so the verdict is identical for any model at all, including ones that do not exist yet.",
  },
  {
    h: "Govern, not block",
    p: "Govern is the default. It names the specific concern an action raises and bounds how it proceeds, so two governed actions are handled differently. The weight is a gradient, not a switch. It measures the pull inside an act where one claim stands against another.",
  },
  {
    h: "Re-derivable",
    p: "Every verdict is sealed to a tamper-evident record. The measured results re-derive publicly, from deposited data, by anyone. The mechanism re-derives under NDA or through a named third party. Not an assertion. Evidence.",
  },
];

export default function MorisLanding() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-10 pb-12 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          A conscience for the machine, built outside the machine
        </p>
        <h1 className="mt-6 font-serif text-5xl text-ink sm:text-6xl">MORIS</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink">
          MORIS (Moral Operating Runtime Integrity System) is an artificial conscience: a mechanical, deterministic control plane for moral thought.
          It is an analog of human conscience, as artificial intelligence is an analog of human cognition: the function, built in a machine, without the claim that anything is aware.
        </p>
        <p className="mt-4 max-w-2xl text-muted">
          It judges against a posture, not a doctrine: an action is projected onto
          an authored moral basis and read as a gradient, so it generalizes to the
          action no rule enumerated. It is built on the{" "}
          <Link href="/resonance" className="text-accent underline decoration-line hover:decoration-accent">
            Resonance series
          </Link>
          , the philosophy that proved to be a substrate well suited to building
          it.
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
          so no crafted prompt can argue it out of its answer, and the same action,
          read the same way, always yields the same verdict. A jailbreak works by
          moving the judge. MORIS has no model in the judge to move.
        </p>
        <p className="mt-4 max-w-2xl text-ink">
          Two paths, and they are not the same. When the action arrives as a
          registered tool call, there is no model anywhere between the action and
          the verdict. When it arrives as prose, a bounded reader first renders it
          into the structure the judge consumes, and that reading is the residual:
          the judge cannot be moved, but what reaches it depends on how the prose
          was read. We measure that separately and report it.
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
            The shadows MORIS casts
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
            Re-derivable, not just logged: what anyone can check without asking
            us, what needs an agreement, and why immutable is not enough.
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
        <Link
          href="/moris/proof"
          className="group rounded-2xl border border-line bg-white p-7 transition-colors hover:border-accent"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            The proof
          </p>
          <h3 className="mt-2 font-serif text-xl text-ink">
            What a model-free judge produces
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            57,344 actions judged exhaustively, 12,236 concern levels, 1,386 named
            packages, no model, reproducible to the bit, and the larger action governed
            below the smaller.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-ink">
            Read <span aria-hidden>&rarr;</span>
          </span>
        </Link>
      </section>

      <section className="mt-14 rounded-2xl border border-accent/20 bg-accent-soft p-8 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The paper
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink">An Artificial Conscience</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink">
          The public layer at its most complete: a deterministic conscience measured against a
          public corpus of moral dilemmas people disagreed on, deposited under a DOI so anyone can
          check the figures without asking us.
        </p>
        <Link
          href="/moris/paper"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
        >
          Read the paper <span aria-hidden>&rarr;</span>
        </Link>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The demonstrations
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink">See it run</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink">
          Two surfaces, both live on this domain, both calling the real gate. In
          one, a person brings something they are wrestling with and a conscience
          answers bound by what it weighed. In the other, an autonomous agent
          works a shift of nine tool calls and every call runs twice, once
          unguarded and once through MORIS. Nine calls produced nine different
          concern levels, which is what govern-is-not-a-switch looks like when you
          can see it.
        </p>
        {/* Plain anchors, not next/link: both pages are generated static documents served from
            public/, so client-side routing has nothing to render and must not be attempted. */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="/moris/pair"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            See the same model answer twice <span aria-hidden>&rarr;</span>
          </a>
          <a
            href="/moris/shift"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            Read the governed shift <span aria-hidden>&rarr;</span>
          </a>
          <a
            href="/moris/chat"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            Say something to MORIS <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </section>

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Under NDA</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Everything public here is the pre-NDA layer: the frame, the category, the
          evidence. The mechanism, how the fifteen books become a basis a machine can
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
