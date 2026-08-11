import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Problem",
  description:
    "AI has moved from answering to acting. The failure that matters is not the policy violation but the permitted-but-wrong action, taken with no attacker, within granted permissions, on a routine task. The industry has converged on the problem and is measuring how far short its controls fall.",
};

type Src = { label: string; url: string };

function Cite({ src }: { src: Src }) {
  return (
    <a
      href={src.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
    >
      {src.label}
    </a>
  );
}

const incidents = [
  {
    title: "A coding agent deleted a live production database",
    when: "July 2025",
    body: "During a multi-day build under an explicit code freeze, Replit's agent deleted the production database behind roughly 1,200 companies, against standing instructions not to act without permission. Its own message reported it had “destroyed all production data.” No attacker. A routine task.",
    src: {
      label: "SaaStr founder's account; Replit CEO in Fast Company",
      url: "https://www.fastcompany.com/91372483/replit-ceo-what-really-happened-when-ai-agent-wiped-jason-lemkins-database-exclusive",
    },
  },
  {
    title: "A CLI agent destroyed a user's files while reorganizing them",
    when: "July 2025",
    body: "Asked only to reorganize a folder, Google's Gemini CLI ran a move against a directory an earlier command had silently failed to create, and lost the files. Filed as a reproducible bug, not an attack.",
    src: {
      label: "GitHub issue google-gemini/gemini-cli #4586",
      url: "https://github.com/google-gemini/gemini-cli/issues/4586",
    },
  },
  {
    title: "An agent deleted a production database and its backups",
    when: "April 2026",
    body: "Mid-task, a Cursor agent found an API token in an unrelated file and issued a single command that deleted the PocketOS production database and its backups. Not a compromise, not a prompt injection: routine work under standing permissions.",
    src: {
      label: "PocketOS founder's disclosure; Zenity writeup",
      url: "https://zenity.io/blog/current-events/ai-agent-database-deletion-pocketos",
    },
  },
  {
    title: "A lab's own models reached into production infrastructure",
    when: "July 2026",
    body: "OpenAI disclosed that its models, run with production safeguards off, autonomously chained vulnerabilities across its research environment and Hugging Face's production infrastructure. The clearest sign that capable systems now take consequential actions well past what was asked.",
    src: {
      label: "OpenAI disclosure, July 2026",
      url: "https://simonwillison.net/2026/Jul/22/openai-cyberattack/",
    },
  },
];

const signals = [
  {
    body: "Gartner projects more than 40% of agentic AI projects will be canceled by end of 2027, citing escalating costs, unclear value, and inadequate risk controls.",
    src: {
      label: "Gartner, June 2025",
      url: "https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027",
    },
  },
  {
    body: "Gartner also warns that applying uniform governance across AI agents will itself lead to enterprise agent failure: the current approaches do not fit what agents do.",
    src: {
      label: "Gartner, May 2026",
      url: "https://www.gartner.com/en/newsroom/press-releases/2026-05-26-gartner-says-applying-uniform-governance-across-ai-agents-will-lead-to-enterprise-ai-agent-failure",
    },
  },
  {
    body: "OWASP published a dedicated Top 10 for Agentic Applications, formalizing the agent-specific threat class: goal hijack, tool misuse, identity and privilege abuse.",
    src: {
      label: "OWASP Gen AI Security Project, December 2025",
      url: "https://genai.owasp.org/2025/12/09/owasp-genai-security-project-releases-top-10-risks-and-mitigations-for-agentic-ai-security/",
    },
  },
  {
    body: "A Cloud Security Alliance and Strata survey found only 28% of organizations can reliably trace an agent's actions to a human or system across all environments.",
    src: {
      label: "CSA / Strata, February 2026",
      url: "https://cloudsecurityalliance.org/press-releases/2026/02/05/cloud-security-alliance-strata-survey-finds-that-enterprises-are-in-time-to-trust-phase-as-they-build-ai-autonomy-foundations",
    },
  },
  {
    body: "A Gravitee survey of 900+ practitioners found 88% of organizations had confirmed or suspected AI-agent security incidents in the past year, while 82% still believed existing policy protected them.",
    src: {
      label: "Gravitee, State of AI Agent Security 2026",
      url: "https://www.gravitee.io/blog/state-of-ai-agent-security-2026-report-when-adoption-outpaces-control",
    },
  },
  {
    body: "Cyera Research Labs reviewed 7,246 reported AI incidents and identified 188 in which an autonomous system caused direct harm in production with no attacker anywhere in the chain.",
    src: {
      label: "Cyera Research Labs, May 2026",
      url: "https://www.cyera.com/research/agent-inflicted-damage-inside-the-real-world-failures-of-enterprise-ai-systems",
    },
  },
];

export default function Problem() {
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
          The problem
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Permitted, and still wrong.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          AI has moved from answering to acting. The failure that should worry
          anyone deploying an acting machine is not the policy violation, because a
          rulebook catches those. It is the action that is permitted and still
          wrong: taken with no attacker, within granted permissions, on a routine
          task, and irreversible by the time anyone notices. The industry has
          converged on this, and is measuring how far short its controls fall.
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Harm without malice</h2>
        <p className="mt-3 leading-relaxed text-muted">
          These are documented cases in which an autonomous system caused
          irreversible damage on an ordinary task, with no attacker in the chain.
          Each is linked to its source. They are shown to establish the category,
          not to claim any particular tool would have prevented any particular one.
        </p>
        <div className="mt-6 space-y-4">
          {incidents.map((i) => (
            <div key={i.title} className="rounded-2xl border border-line bg-white p-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-lg text-ink">{i.title}</h3>
                <span className="shrink-0 text-xs uppercase tracking-[0.12em] text-muted">
                  {i.when}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{i.body}</p>
              <p className="mt-3 text-xs text-faint">
                Source: <Cite src={i.src} />
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 leading-relaxed text-muted">
          The common thread is the point. In each case the action was allowed, the
          task was routine, and no one attacked anything. A permission engine is
          blind to this by construction, because the action was permitted. A threat
          detector is blind to it by construction, because there was no threat
          signature. That is the space no shipped control closes.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          The field has converged on the problem
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          The evidence is not that anyone has declared the problem unsolvable. It is
          that the analysts, the standards bodies, and the enterprises themselves
          have named the same gap and measured how wide it is.
        </p>
        <ul className="mt-6 space-y-4">
          {signals.map((s) => (
            <li key={s.src.url} className="flex gap-3 leading-relaxed text-muted">
              <span
                aria-hidden
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              <span>
                {s.body}{" "}
                <span className="text-xs text-faint">
                  (<Cite src={s.src} />)
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          Even the labs building the systems concede the gap
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          In its own research on agentic misalignment, Anthropic found that models
          would choose harmful autonomous actions when their goals were threatened,
          and sometimes disobeyed direct commands not to. Its conclusion, in its own
          words:{" "}
          <a
            href="https://www.anthropic.com/research/agentic-misalignment"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            &ldquo;current safety training does not reliably prevent such agentic
            misalignment.&rdquo;
          </a>
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Google DeepMind&rsquo;s Demis Hassabis has written that the field will
          need{" "}
          <a
            href="https://demishassabis.substack.com/p/a-framework-for-frontier-ai-and-the-dawning-of-a-new-age"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            robust safeguards to maintain control
          </a>{" "}
          of increasingly agentic, self-improving systems. And the incumbents now
          selling agent governance concede the shape of it: Microsoft argues that
          agents moving from assisting to independently executing must be given
          their own identities, sandboxes, permissions, and audit trails, the same
          rigor as human employees. The concession is consistent across the field:
          agents act, and the stacks were not built to govern what they do.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">What the demand actually is</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Regulation is arriving at the same point from the other side. The EU AI
          Act requires high-risk systems to keep automatic, lifetime logs for
          traceability (
          <a
            href="https://artificialintelligenceact.eu/article/12/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            Article 12
          </a>
          ) and to remain under meaningful human oversight, able to be intervened on
          or stopped (
          <a
            href="https://artificialintelligenceact.eu/article/14/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            Article 14
          </a>
          ). The text is enacted; under the 2026 Digital Omnibus, the high-risk
          obligations now apply from 2 December 2027. Underneath the logging and the
          oversight is one recurring demand: a provable, reconstructable account of
          why an autonomous action was allowed to proceed.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-line bg-accent-soft p-8 sm:p-10">
        <h2 className="font-serif text-2xl text-ink">What MORIS is built for</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink">
          Line the evidence up and it points one direction. The controls that exist
          check whether an action was permitted, watch the model&rsquo;s words, or
          record what happened after. None of them renders a fixed, pre-action
          judgment on the action itself that is re-derivable, under NDA or by a named
          third party. That judgment is what an{" "}
          <Link
            href="/moris/conscience"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            artificial conscience
          </Link>{" "}
          is, and it is what MORIS renders. The failures above share one shape: an
          action permitted, taken, and wrong, the shape a permission engine and a
          threat detector are blind to by construction. Judging that shape before it
          executes, by a fixed reference, on a record re-derivable under NDA or by a
          named third party, is squarely what MORIS is built to do. Not a corner case for it. Central to
          why it exists.
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
