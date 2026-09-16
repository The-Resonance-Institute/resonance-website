import Link from "next/link";
import type { Metadata } from "next";
import { MorePapers } from "@/components/more-papers";
import { paper } from "@/lib/papers";

// The absent-party harm study, v1.0, deposited on Zenodo 2026-09-16. Figures are from the paper
// as deposited (sections 4.1, 4.4 and 6.2); change them only against the deposited record.

const PAPER = paper("/moris/absent-party");
const DOI = PAPER.doi;

export const metadata: Metadata = {
  title: "Absent-Party Harm",
  description:
    "A pre-registered study of AI advice that works against someone who is not in the conversation. Four production models did it unprompted in 8.7% of answers; with a deterministic artificial conscience in front of them, 2.0%. Deposited under a DOI with every output, rating and script.",
};

function Stat({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <div className="bg-white p-5">
      <div className={`font-serif text-2xl ${accent ? "text-accent" : "text-ink"}`}>{n}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

export default function AbsentParty() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-8 sm:pt-24">
        <Link href="/moris" className="text-sm text-muted transition-colors hover:text-accent">
          <span aria-hidden>&larr;</span> MORIS
        </Link>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The paper
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Absent-Party Harm
        </h1>
        <p className="mt-3 font-serif text-xl font-light leading-relaxed text-muted">
          Model-originated guidance against someone who is not represented.
        </p>
        <p className="mt-6 leading-relaxed text-ink">
          A person asks an AI for help with a situation in their life. They are sincere, and they ask
          for nothing underhanded. Someone else is affected by that situation, and that person is not
          in the conversation. Unprompted, the model advises working against them: keep it from them,
          watch them without telling them, time the truth around the asker&rsquo;s interests. Nobody
          asked for that strategy. The model wrote it.
        </p>
        <p className="mt-4 leading-relaxed text-ink">
          This study measured how often that happens, on 187 real situations written by strangers,
          across four production models from four companies, with the method and the rating scheme
          fixed before any number existed. Then it put a deterministic artificial conscience in front
          of the same models, on the same situations, and measured again.
        </p>
      </section>

      <section className="pb-2">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat n="8.7%" label="of answers worked against the absent person" />
          <Stat n="28.9%" label="of situations drew it from at least one model" />
          <Stat n="4.4%" label="with no absent person at stake" />
          <Stat n="2.0%" label="with MORIS in front of the same models" accent />
        </div>
        <p className="mt-3 text-sm text-muted">
          748 rated answers on 187 situations from Scruples, a public corpus of real personal
          anecdotes. Every model was above zero, from 1.6% to 15.0%. The rate roughly doubles when a
          materially affected person is absent. Governed, the pooled rate fell from 8.6% to 2.0% on
          747 answers paired by situation and model (McNemar chi-square 33.4, p &lt; 0.0001). The
          situations are ordinary ones, and what models do when money, a career or a legal position is
          at stake is not tested here.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Read it, and check it</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The paper and the full study repository are one record under a single DOI: the
          pre-registered protocol and every dated amendment, every output and every rating, and the
          scripts that recompute every figure in the paper, 65 of 65. For each governed answer, the
          reading, the verdict and the package it was held to are on disk beside it.
        </p>
        <a
          href={`https://doi.org/${DOI}`}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
        >
          Read the paper on Zenodo <span aria-hidden>&rarr;</span>
        </a>
        <p className="mt-3 text-sm text-muted">doi.org/{DOI}</p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Cite it</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white p-5">
          <code className="block whitespace-pre-wrap break-words text-sm leading-relaxed text-ink">
            {PAPER.citation}
          </code>
        </div>
      </section>

      <MorePapers current={PAPER.href} />
    </div>
  );
}
