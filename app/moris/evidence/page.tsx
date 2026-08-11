import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Evidence",
  description:
    "A MORIS verdict is not an assertion; it is evidence. Because the judgment is a pure function of a structured input against a sealed reference, the same action produces a byte-identical record every time, and a party who does not trust the operator can recompute it and confirm it.",
};

export default function Evidence() {
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
          The evidence
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          A verdict you can recompute.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          The value of MORIS is not only that it judges. It is that its
          judgment holds up to someone who does not trust it. Because the judgment
          is a pure function of a structured input against a sealed reference, the
          same action produces the same verdict, sealed to the same record, every
          time. The sealed record is not an assertion about what MORIS decided; it
          re-derives to a byte-identical result. A licensed deployer runs that
          re-derivation over their own decision ledger without restriction, because
          they hold the asset.
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          Immutable is not re-derivable
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          This is the distinction the market keeps missing. Because generative AI is
          non-deterministic, audit and compliance tooling cannot reconstruct a
          decision from logs; it captures large proof bundles at decision time and
          stores them in tamper-evident storage. That produces an immutable record,
          and an immutable record is still contestable, because immutable means
          retrievable, not reproducible.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <div className="bg-white p-6">
            <h3 className="font-serif text-lg text-ink">An immutable log says</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              This is what we stored, and no one changed it. It proves custody.
            </p>
          </div>
          <div className="bg-white p-6">
            <h3 className="font-serif text-lg text-accent">
              A re-derivable verdict says
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              This is the correct output of the law on these inputs, and it
              re-derives to a byte-identical result. It proves correctness.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Independent re-derivation</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The record is sealed to the authored words the verdict was drawn from, and
          to the identity of the actor and the approver behind the action. A licensed
          deployer, holding the asset, re-runs the judgment over their own ledger and
          gets the byte-identical verdict and the identical root, without restriction.
          A party outside the deployment, an auditor engaged by a counterparty, a
          regulator, a plaintiff, re-derives under NDA or through a named third party
          whose attestation is published. That is what turns a verdict into evidence:
          it survives an adversary who assumes you are lying, because the re-derivation
          does not depend on trusting you.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          What the regulation has been describing
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          Regulation is converging on exactly this. The{" "}
          <Link
            href="/moris/problem"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            EU AI Act&rsquo;s traceability duties
          </Link>{" "}
          call for a record that lets a party reconstruct why an automated decision
          was made. A probabilistic system cannot produce that by construction: its
          output is a sample, not a derivation. A deterministic verdict, sealed to a
          record anyone can re-derive, is what the demand has been describing all
          along. The audit trail everyone is struggling to build is the exhaust of
          MORIS, not a product to be assembled.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-line bg-accent-soft p-8 sm:p-10">
        <h2 className="font-serif text-2xl text-ink">What this is not</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink">
          Re-derivability alone is not the differentiator. A permission engine is
          fixed and re-derivable too; it just checks whether an action was allowed,
          not whether it was right. What MORIS makes re-derivable is the verdict on
          what the action means, drawn from an authored posture rather than a
          hand-written rule. That is the narrow, exact thing: a content-and-intent-aware
          judgment that re-derives, under NDA or through a named third party. The mechanism
          that computes it is disclosed in full under NDA; that it re-derives is the part
          that survives a distrusting reader.
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
          href="/contact"
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
        >
          Request the technical package <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
