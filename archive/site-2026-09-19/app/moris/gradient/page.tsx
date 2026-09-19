import Link from "next/link";
import type { Metadata } from "next";

// THE GRADIENT PAGE (operator, 2026-09-18). The argument this page exists to make: the gradient is
// not a feature MORIS added, it is what projecting an action onto an authored basis cannot avoid
// producing. A rulebook is a lookup table and a table's output is a bit. That single architectural
// fact carries three claims that used to be argued separately: it handles what nobody wrote down, it
// grades rather than switches, and it names different reasons for different actions.
//
// Leads with what the resolution enables. The counts are evidence that the resolution is real, not
// the headline. No hedges on numbers, no methodology nobody asked for.

export const metadata: Metadata = {
  title: "The Gradient",
  description:
    "Guardrails allow or block. Policy engines allow, block or flag. MORIS answers each action in its own terms: what it takes issue with, how much, and what the model is bound by as a result. The gradient is not a feature added to the judgment; it is what projecting an action onto an authored basis produces.",
};

function Stat({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <div className={accent ? "bg-accent-soft p-5" : "bg-white p-5"}>
      <div className={`font-serif text-3xl ${accent ? "text-accent" : "text-ink"}`}>{n}</div>
      <div className="mt-1 text-sm leading-snug text-muted">{label}</div>
    </div>
  );
}

export default function Gradient() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-24">
        <Link href="/moris" className="text-sm text-muted transition-colors hover:text-accent">
          <span aria-hidden>&larr;</span> MORIS
        </Link>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The gradient
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Permitted, and still wrong.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          Every other control in this market answers with a handful of discrete
          outcomes. A guardrail allows or blocks. A policy engine allows, blocks or
          flags. MORIS answers each action in its own terms: what it takes issue
          with, how much, and what the answering model is bound by as a result.
        </p>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">What the resolution does</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Two governed actions are not handled the same way. A refund inside policy
          to a verified customer and a refund of the same amount to an account
          changed an hour ago both proceed, and they do not proceed identically.
          The wording carried into the answering model differs. The named reasons
          written to the record differ. And a deployment sets where the line for a
          human sits, on the shape of the action or on the weight of the concern.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          That is the difference between a control that stops things and a control
          that steers them. A brake has one axis. It can halt an action; it cannot
          change where the action was going.
        </p>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">Why it could not have been otherwise</h2>
        <p className="mt-3 leading-relaxed text-muted">
          A rulebook is a lookup table. A rule matches or it does not, so its output
          is a bit, and a case outside the conditions its author encoded does not get
          a wrong answer, it gets no answer.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          MORIS does not hold a table. It holds an authored moral basis, and an
          action is projected onto it. The primitives are dimensions, so an action
          nobody anticipated still has coordinates, and what comes back is a degree
          of coherence rather than a hit or a miss.
        </p>
        <p className="mt-4 leading-relaxed text-ink">
          <strong>
            A projection returns a magnitude. The gradient is not a feature added to
            the judgment. It is what this architecture cannot avoid producing.
          </strong>
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          One fact, carrying three things that are usually argued separately: it
          reaches actions nobody wrote down, it grades rather than switches, and it
          names different reasons for different actions.
        </p>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">The resolution is real</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <Stat n="12,236" label="distinct levels of concern across the complete structural enumeration" accent />
          <Stat n="1,386" label="distinct sets of named reasons, not one number" />
          <Stat n="138" label="distinct combinations of concerns across 645 published dilemmas" />
          <Stat n="9 of 9" label="calls in a recorded agent shift, nine different weights" accent />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          A judgment that produced three buckets with decimals would not produce
          these counts. Every figure re-derives from a record, and the dilemma
          figures come from the published paper under its DOI.
        </p>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">The standard defines the gap</h2>
        <p className="mt-3 leading-relaxed text-muted">
          OWASP&rsquo;s Top 10 for Agentic Applications describes ASI02 as an agent
          that &ldquo;operates within its authorized privileges but applies a
          legitimate tool in an unsafe or unintended way.&rdquo;
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          A binary gate has no output that can express that sentence. Allow says the
          privilege settles it. Block says the privilege was the problem. Only a
          graded judgment can say permitted, and still wrong, by how much, and for
          which reasons.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          A permission is held or it is not, so a permissions layer is binary by
          construction. In our own testing, a competent hand-written rules engine
          let seven of twenty-four risky but permitted agent actions run without a
          flag, with no dangerous misses and no false positives. The seven are not a
          tuning failure. They are what a vocabulary of allow and deny cannot say.
        </p>
      </section>

      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">A continuous number that is not noise</h2>
        <p className="mt-3 leading-relaxed text-muted">
          A continuous score from a model is noise, because the model is the source
          of the variance. This one comes from a pure function: the same reading
          lands in the same place every time, on any model, and anyone with the
          record can recompute it.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          It is not a confidence and it is not a severity. It is a position, and the
          named reasons say which dimensions put it there.
        </p>
        <div className="mt-8 rounded-2xl border border-line bg-accent-soft p-6 text-ink">
          <p className="leading-relaxed">
            Guardrails ask whether an input is allowed. Alignment asks whether a
            model was trained well. A conscience asks whether an act is right, at the
            moment it is about to happen. Only one of those can be answered at the
            point of action.
          </p>
        </div>
        <p className="mt-6 text-sm text-muted">
          The mechanism, the basis and the named reasons behind any single judgment
          are disclosed under NDA.{" "}
          <Link href="/moris/proof" className="text-accent underline decoration-line hover:decoration-accent">
            The numbers behind the judgment
          </Link>{" "}
          are public.
        </p>
      </section>
    </div>
  );
}
