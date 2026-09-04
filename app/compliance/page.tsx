import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "MORIS produces a judgment an auditor can recompute. EU AI Act Article 12 and Article 26 traceability, Colorado SB 26-189 adverse-outcome explanations, and why an immutable log is retrievable but not reproducible.",
};

// Every source on this page was fetched and returned 200 before it was linked, and the two dates a
// reader is most likely to check were verified against the primary sources: the AI Omnibus entered
// into force on 27 July 2026 with high-risk application moved to 2 December 2027 and 2 August 2028,
// and Colorado SB 26-189 was signed on 14 May 2026 with its obligations starting 1 January 2027.
const sources = [
  { label: "AI Act, Regulation (EU) 2024/1689", href: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" },
  {
    label: "European Commission, AI Act overview and timeline",
    href: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
  },
  { label: "AI Omnibus Regulation", href: "https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force" },
  {
    label: "Standardisation of the AI Act",
    href: "https://digital-strategy.ec.europa.eu/en/policies/standards-artificial-intelligence",
  },
  { label: "JTC 21", href: "https://www.cencenelec.eu/areas-of-work/cen-cenelec-topics/artificial-intelligence/" },
  { label: "Article 26", href: "https://artificialintelligenceact.eu/article/26/" },
  { label: "Colorado SB 26-189", href: "https://leg.colorado.gov/bills/sb26-189" },
];

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-line hover:decoration-accent"
    >
      {children}
    </a>
  );
}

export default function Compliance() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-10 pb-10 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Compliance
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          A judgment an auditor can recompute
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          Every AI rule now in force asks the same thing: when an automated system
          does something to a person, someone must
          be able to say afterward what it did and why. Because generative systems
          do not return the same output twice, no log answers that. MORIS does,
          because the judgment is mechanical: an auditor can re-run the gate on the
          recorded reading and confirm the verdict recomputes, on any model, a year
          later.
        </p>
        <p className="mt-5 leading-relaxed text-muted">
          What follows is the obligation as written, the gap in the current answer,
          what a re-derivable verdict does against each requirement, and what MORIS
          does not do.
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">What the law asks for</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The EU AI Act, Regulation (EU) 2024/1689, entered into force on 1 August
          2024 and became applicable on 2 August 2026. Prohibited practices and the
          AI literacy obligation applied from 2 February 2025, and the obligations
          for general-purpose AI models from 2 August 2025. The rules for high-risk
          systems moved: use cases in sensitive areas listed in Annex III apply from
          2 December 2027, and systems embedded in regulated products from 2 August
          2028, following the AI Omnibus, adopted on 19 November 2025, agreed on 7
          May 2026, and in force since 27 July 2026. The stated reason for the move
          is that the rules should apply once companies have the support tools,
          meaning standards. The requirements themselves did not change. Only the
          date on which they bite.
        </p>
        <p className="mt-4 leading-relaxed text-muted">Two articles carry the reconstruction demand.</p>
        <p className="mt-4 leading-relaxed text-muted">
          <strong className="text-ink">Article 12</strong> requires that high-risk
          AI systems technically allow for the automatic recording of events over
          the lifetime of the system, for three purposes: identifying risk
          situations under Article 79, supporting post-market monitoring under
          Article 72, and tracking operational performance under Article 26(5).
          Manual recording does not count. The system itself must generate the
          records. For remote biometric identification the list of what to record is
          specific. For every other high-risk system there is no closed list, and the
          standard is whether the logs allow full reconstruction of algorithmic
          decisions.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          <strong className="text-ink">Article 26</strong> puts the mirror duty on
          whoever runs the system. Deployers must use the system according to its
          instructions, assign human oversight to people with the competence,
          training and authority to exercise it, monitor its operation, keep the logs
          for at least six months, inform providers and authorities of risks and
          incidents, and inform the individuals subject to AI-assisted decisions.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          The exposure is not theoretical. Failing the record-keeping obligations
          carries penalties of up to fifteen million euro or three percent of global
          annual turnover, the second of three tiers under Article 99. And supplying
          incomplete or unverifiable logs to a market surveillance authority is itself
          a separate violation, even where the underlying system is otherwise
          compliant.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The United States, as it stands</h2>
        <p className="mt-3 leading-relaxed text-muted">
          There is no equivalent federal statute. As of mid-2026 there is still no
          comprehensive federal AI law and no enacted federal preemption of state AI
          laws; the preemption effort remains an executive-order strategy and a
          legislative proposal. The state picture moved sharply this year. Colorado,
          which passed the first comprehensive state AI law in 2024, repealed and
          replaced it: Senate Bill 26-189 was signed on 14 May 2026 and takes effect
          on 1 January 2027, departing from the original act&rsquo;s algorithmic
          discrimination and duty of care framework.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          What replaced it is worth reading closely, because the rollback did not
          remove the reconstruction demand. It concentrated it. The risk management
          programs and impact assessments are gone. The new obligations center on
          pre-use consumer notices, 30-day adverse-outcome explanations, meaningful
          human review, and developer documentation duties.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          A thirty-day adverse-outcome explanation is a legal deadline to say why a
          specific decision went the way it did, for one named person, after the
          fact. Meaningful human review is a person being able to look at that
          decision and disagree with it on the merits. Both require the same thing
          Article 12 requires. Both survived a repeal designed to reduce burden,
          which is the clearest available signal about which obligations are
          structural rather than fashionable.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The gap</h2>
        <p className="mt-3 leading-relaxed text-muted">
          An audit trail is supposed to answer the question &ldquo;why did the system
          do that.&rdquo; A log answers a smaller question: &ldquo;what did the system
          emit, and has the record been altered since.&rdquo;
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          That distinction is not academic. Because generative systems do not return
          the same output twice for the same input, a decision cannot be reconstructed
          from a record of it. So the market has converged on integrity instead. The
          state of the art is to acquire each event at source, apply a qualified
          timestamp, and make it immutable through a third party independent of both
          provider and deployer, on the reasoning that a log file can otherwise be
          modified or deleted without leaving a trace.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          That work is sound and it solves a real problem. It does not solve this one.
          A certified log proves that nobody altered the record of a decision no one
          can reproduce. Immutable means retrievable. It does not mean reproducible.
          When an auditor asks why, the honest answer from a tamper-evident log is
          that the system said so, here is proof that it said so, and here is proof
          that nobody changed it afterward.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          What a re-derivable verdict does instead
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          MORIS is an artificial conscience: a mechanical, deterministic control plane
          for moral thought. A model reads what was said or proposed and fills a fixed
          set of fields. A gate with no model in it weighs those fields against moral
          primitives drawn from an authored corpus and returns a verdict and a weight.
          The model that acts is bound by that verdict and never sees the reading.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Because no model sits where the verdict is decided, the judgment is a pure
          function. The same reading produces the same verdict and the same weight, on
          any model, today and a year from now. That single property is what turns a
          record into an answer.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          <strong className="text-ink">Against Article 12.</strong> The trace holds the
          fields that were read, the primitives that engaged, the verdict, the weight,
          the bound the acting model was given, and what it did under that bound, in
          order, as it happened. An auditor does not have to trust the record. They can
          re-run the gate on the recorded reading and confirm the verdict recomputes.
          Reconstruction is not an aspiration of the storage layer. It is a property of
          the judgment.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          <strong className="text-ink">Against Article 26(5) and human oversight.</strong>{" "}
          Oversight requires something a person can oversee. A verdict with a named
          concern and a weight is reviewable by a human being who was not present when
          it happened, in the time a human being actually has. A confidence score is
          not.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          <strong className="text-ink">Against Article 26(6) and retention.</strong> The
          artifact is small and structured rather than a proof bundle, and it stays
          meaningful for as long as it is kept, because its meaning does not depend on
          reproducing the model that produced it.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          <strong className="text-ink">
            Against Colorado&rsquo;s adverse-outcome explanation.
          </strong>{" "}
          The thirty-day explanation asks for the reason a particular decision affected
          a particular person. The trace holds a named concern rather than a score, and
          the same named concern for the next person in the same situation.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          <strong className="text-ink">Against consistency across a workforce.</strong>{" "}
          Thousands of employees using AI daily generate thousands of unlogged
          judgments. A conscience makes each one a record traceable to a fixed corpus,
          and the same judgment applies across employees, across departments, and
          across models.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">What MORIS is not</h2>
        <p className="mt-3 leading-relaxed text-muted">
          MORIS is not a conformity assessment, not a certification, and not legal
          advice. It does not make any system compliant, and no vendor can.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          It addresses one obligation family: the traceability and explainability of a
          judgment applied to an action. It does not address dataset governance,
          accuracy, robustness, cybersecurity, or quality management, which are
          separate requirements with their own standards work underway.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          The gate is exact. The reading is not. When an action arrives as a registered
          tool call, no model sits anywhere between the action and the verdict. When it
          arrives as prose, a bounded reader first renders it into the structure the
          gate consumes, and that reading is the residual: the judge cannot be moved,
          but what reaches it depends on how the prose was read. We measure that
          separately and publish the number with the corpus it was measured on.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          And MORIS judges the moral character of an action. It does not judge whether a
          model is correct. A system can be governed and still be wrong about the facts.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Anyone who tells you their product delivers compliance is selling something.
          What is offered here is narrower and, we think, more useful: a decision that
          recomputes.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">An open invitation</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The Commission has asked CEN and CENELEC to develop harmonised standards in
          ten areas, among them record keeping, transparency, and human oversight,
          through their joint technical committee JTC 21. The first of these, prEN
          18286 on quality management systems, entered public enquiry on 30 October
          2025. A further standard, prEN ISO/IEC 24970 on AI system event logging, will
          define implementation-level requirements for log format, granularity, and
          storage.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          That standard is being written now, about precisely this artifact.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          One point is worth stating plainly, because it is often misread. The
          application of harmonised standards is voluntary. Providers may choose any
          other framework to demonstrate compliance. What a harmonised standard confers
          is legal certainty: companies that apply one are presumed compliant. A
          deterministic, re-derivable judgment record is therefore not waiting on a
          standard to be useful. It is one way of doing the thing the standard will
          describe.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          If you are working on record keeping, transparency, or human oversight for the
          AI Act, on the logging standard, on a state framework, or inside a regulator,
          the mechanism is available for inspection and we will answer questions without
          an engagement. The measured results re-derive publicly from deposited data.
          The mechanism re-derives under NDA or through a named third party.
        </p>
        <p className="mt-4 leading-relaxed text-ink">Not an assertion. Evidence.</p>
        <p className="mt-4 leading-relaxed text-muted">
          Inquiries:{" "}
          <a
            href="mailto:contact@resonanceinstitutellc.com"
            className="text-accent underline decoration-line hover:decoration-accent"
          >
            contact@resonanceinstitutellc.com
          </a>
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link
          href="/moris"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          The MORIS wing <span aria-hidden>&rarr;</span>
        </Link>
        <Link
          href="/moris/evidence"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          The evidence <span aria-hidden>&rarr;</span>
        </Link>
      </section>

      <section className="mt-12 space-y-3 border-t border-line pt-8 text-sm leading-relaxed text-muted">
        <p>
          Current as of 4 September 2026. This page describes regulatory obligations as
          we understand them and is not legal advice. Deadlines and requirements change;
          verify against the primary sources before relying on anything here.
        </p>
        <p>
          Sources:{" "}
          {sources.map((s, i) => (
            <span key={s.href}>
              {i > 0 ? " · " : ""}
              <Out href={s.href}>{s.label}</Out>
            </span>
          ))}
        </p>
      </section>
    </div>
  );
}
