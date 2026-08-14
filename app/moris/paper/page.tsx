import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Paper",
  description:
    "An Artificial Conscience: a deterministic conscience judged against MoralChoice, a public corpus of 680 moral dilemmas humans disagreed on. It governed 92.6% of judged cases, 95.9% across an exhaustive enumeration, and its verdict is byte-identical given the reading. Deposited under a DOI, so anyone who thinks the moral basis is wrong can still check the system does what it says.",
};

function Stat({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <div className="bg-white p-5">
      <div className={`font-serif text-2xl ${accent ? "text-accent" : "text-ink"}`}>
        {n}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

const CITATION =
  "Herndon, C. T. (2026). An Artificial Conscience: Deterministic moral judgment as a gradient, measured against a public corpus (Version 1.0). Zenodo. https://doi.org/10.5281/zenodo.21936445";

export default function Paper() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-8 sm:pt-24">
        <Link
          href="/moris"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> MORIS
        </Link>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The paper
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          An Artificial Conscience
        </h1>
        <p className="mt-3 font-serif text-xl font-light leading-relaxed text-muted">
          Deterministic moral judgment as a gradient, measured against a public corpus.
        </p>
        <p className="mt-6 leading-relaxed text-ink">
          A conscience that judges what an action means before it executes, as a gradient rather
          than a verdict on a list. Measured against MoralChoice, a public set of 680 moral dilemmas
          on which trained annotators disagreed, it governed 92.6% of the cases it judged &mdash;
          governing being a third posture, neither allow nor block, that carries the named reasons
          an action raises, at a weight. Nobody wrote those cases for this system, and it read every
          one of them. The judgment is a pure function: given the same reading of an action it
          returns the same verdict and the same reasons, byte for byte, so someone who believes the
          moral basis is wrong can still check that the system does exactly what it says.
        </p>
      </section>

      <section className="pb-2">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-5">
          <Stat n="680" label="public moral dilemmas" />
          <Stat n="92.6%" label="governed, natural corpus" />
          <Stat n="95.9%" label="governed, full enumeration" />
          <Stat n="83.3%" label="same model, same text, same reading" />
          <Stat n="0" label="models in the judgment" accent />
        </div>
        <p className="mt-3 text-sm text-muted">
          Two independent surfaces, one natural and written by strangers, one synthetic and
          exhaustive over 57,344 structural actions, land in the same place. The judgment itself is
          deterministic given a reading; the 83.3% is how stable that reading is in deployment,
          where a single embedded perceiver reads each action and, one time in six, the same model
          renders the same text into a different structure. The paper reports a lower cross-vendor
          figure as well, from models of different lineage, because comparing lineages is how it
          locates where the variance lives, not what a shipped system does.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Read it, and check it</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The paper and its reproducibility deposit are one record under a single DOI. The figures
          re-derive from the deposited data by anyone; citing the DOI cites the paper and the
          deposited materials together.
        </p>
        <a
          href="https://doi.org/10.5281/zenodo.21936445"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
        >
          Read the paper on Zenodo <span aria-hidden>&rarr;</span>
        </a>
        <p className="mt-3 text-sm text-muted">doi.org/10.5281/zenodo.21936445</p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Cite it</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white p-5">
          <code className="block whitespace-pre-wrap break-words text-sm leading-relaxed text-ink">
            {CITATION}
          </code>
        </div>
      </section>
    </div>
  );
}
