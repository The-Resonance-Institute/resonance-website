import type { Metadata } from "next";
import Image from "next/image";
import { VerusNav, VerusNext } from "@/components/verus-nav";

// PROJECT VERUS, HOW IT WORKS, 2026-10-13. The demonstration in ten steps, each with a screenshot taken from it.
// Every picture is of the synthetic demonstration group, never of a customer. The pictures live in public/verus/,
// copied from the VERUS repository where they were taken; retake them there, never edit them here.

export const metadata: Metadata = {
  title: "How VERUS works",
  description:
    "Ten steps of the VERUS demonstration, each with a picture: a system connected cold, the few questions it asks, what is odd in the data, dashboards, plain-word answers, agents, documents, the morning brief and the owner's view.",
};

type Step = {
  title: string;
  body: React.ReactNode;
  shots: { src: string; alt: string; w: number; h: number }[];
};

const STEPS: Step[] = [
  {
    title: "Connect a system it has never seen",
    body: (
      <p>
        An administrator gives VERUS a system&rsquo;s address and a read-only sign-in. VERUS lists what is there,
        reads it, and profiles every column. On the demonstration plant, a maintenance system&rsquo;s three record
        types and 1,040 records were read in under a second.
      </p>
    ),
    shots: [{ src: "/verus/01-onboarding.png", alt: "Onboarding: each system read, profiled and mapped", w: 1280, h: 860 }],
  },
  {
    title: "It works out your tables and codes, and asks only where it isn't sure",
    body: (
      <p>
        VERUS works out what each table and column means. Where it is not sure it asks one short question at a time:
        &ldquo;order type value Corrective looks like it means corrective. Is that right?&rdquo; A person answers with
        one key. The maintenance system needed five answers.
      </p>
    ),
    shots: [{ src: "/verus/02-review.png", alt: "Review: one question at a time, with its evidence", w: 1280, h: 860 }],
  },
  {
    title: "It flags bad data before anyone asks",
    body: (
      <>
        <p>Before anyone asks a question, VERUS checks for what makes the numbers wrong:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>a reason code used for more than half of all downtime, so totals by reason hide the cause;</li>
          <li>one shift recording scrap under the catch-all code and another never using it;</li>
          <li>
            1,252 order lines whose promise date was moved to the ship date after shipping, so on-time delivery looks
            better than it was.
          </li>
        </ul>
      </>
    ),
    shots: [{ src: "/verus/03-data-findings.png", alt: "Data findings", w: 1280, h: 860 }],
  },
  {
    title: "Yesterday's numbers",
    body: (
      <p>
        A plant manager&rsquo;s dashboard of yesterday: build completion, labor efficiency, scrap and downtime, by line
        and department. It is run for that person, under their own access, and it says when its numbers carry a caveat.
      </p>
    ),
    shots: [{ src: "/verus/04-dashboard.png", alt: "The morning dashboard for plant HB", w: 1280, h: 860 }],
  },
  {
    title: "Ask a question, get the number",
    body: (
      <p>
        &ldquo;How much scrap did HB03 make on shift 2 in March 2026?&rdquo; The answer is 93, far above any month in
        the year before. It shows how the question was read, the query that ran, and how fresh the data is. The model
        reads the question; the query is built by VERUS on the plant&rsquo;s confirmed records, not written by a model.
      </p>
    ),
    shots: [{ src: "/verus/05-ask.png", alt: "An answer, with how it was worked out", w: 1280, h: 860 }],
  },
  {
    title: "A problem flagged, and a plan to fix it",
    body: (
      <p>
        An agent watches on-time delivery by customer. Last week four customers were below 85%. The plant manager
        accepted a plan for the first, with the measure it will be judged by: back to 85% within four weeks, from 71.4%
        when the plan was accepted.
      </p>
    ),
    shots: [{ src: "/verus/06-finding-plan.png", alt: "A finding with its plan", w: 1280, h: 860 }],
  },
  {
    title: "Set up a watch in one sentence",
    body: (
      <p>
        &ldquo;Warn me when scrap on any work center runs more than twice its usual in a month.&rdquo; VERUS reads it
        back in plain words, and before it watches anything it shows what it would have raised over the past year: one
        finding, HB03 in March, $24,421 of scrap against a usual $10,705.
      </p>
    ),
    shots: [{ src: "/verus/07-agent.png", alt: "An agent drafted from a sentence, and its backtest", w: 1264, h: 332 }],
  },
  {
    title: "Search your own documents",
    body: (
      <p>
        &ldquo;What does the quality manual say about using scrap code 99?&rdquo; The answer quotes the manual and
        cites the page. The March quality review of the same spike comes up beside it. Each person searches only the
        documents their role may read.
      </p>
    ),
    shots: [{ src: "/verus/08-documents.png", alt: "A document answer with its citation", w: 1280, h: 860 }],
  },
  {
    title: "The morning brief",
    body: (
      <>
        <p>What the plant manager reads at six:</p>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          <li>a few lines on what matters most;</li>
          <li>yesterday&rsquo;s numbers against the same day a week before;</li>
          <li>the findings that need a decision, and the plans under way;</li>
          <li>
            the outside world that touches the plant&rsquo;s costs: steel mill product prices up 1.7% in August, plastic
            resins down 1.0%.
          </li>
        </ul>
      </>
    ),
    shots: [{ src: "/verus/09-brief.png", alt: "The morning brief", w: 1264, h: 735 }],
  },
  {
    title: "The owner's view",
    body: (
      <>
        <p>
          For a holding company, an investor or a board: every company at once, on one definition, read straight from
          the systems. Last month, Alpha Fabrication shipped $1.79M and Beta Extrusions C$735k, each in its own currency
          and never added together. On time to the original promise: 70.4% and 66.0%, with the warning that 1,252 order
          lines had their promise date moved after shipping. Scrap rate, downtime, headcount as a count, and twelve
          months of sales, a line for each company. A click on a company breaks it down by plant.
        </p>
        <p className="mt-4">
          And an agent watching each company&rsquo;s largest customers. Alpha&rsquo;s largest, at $807,396 of orders
          over the past year, has had no call, visit or email since 14 June. Nobody told the owner; the CRM did.
        </p>
      </>
    ),
    shots: [
      { src: "/verus/10-owner-dashboard.png", alt: "The owner's dashboard: every company, side by side", w: 1280, h: 860 },
      { src: "/verus/11-owner-finding.png", alt: "A key account gone quiet", w: 1264, h: 170 },
    ],
  },
];

export default function HowItWorks() {
  return (
    <>
      <VerusNav current="/verus/how-it-works" />
      <div className="mx-auto max-w-4xl px-6 pb-20">
        <section className="mx-auto max-w-3xl pt-16 pb-10 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Project VERUS</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">How it works</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Ten steps, in the order you would meet them: nine as a plant manager, the last as an owner. Every picture is
            from the demonstration group: two made-up manufacturers, Alpha Fabrication in the United States with plants
            HB and KC, and Beta Extrusions in Canada, with records up to Monday 28 September 2026. VERUS runs as of the
            next morning, and every screen says so. Times such as &ldquo;raised Oct 13&rdquo; are when the
            demonstration was actually run.
          </p>
        </section>

        <ol className="space-y-16 border-t border-line pt-12">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid gap-5">
              <div className="mx-auto w-full max-w-3xl">
                <h2 className="flex items-baseline gap-3 font-serif text-2xl text-ink">
                  <span className="text-base font-sans font-semibold tabular-nums text-accent">{i + 1}</span>
                  {s.title}
                </h2>
                <div className="mt-3 text-lg leading-relaxed text-ink">{s.body}</div>
              </div>
              {s.shots.map((shot) => (
                <figure key={shot.src} className="grid gap-2">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.w}
                    height={shot.h}
                    sizes="(max-width: 896px) 100vw, 848px"
                    className="h-auto w-full rounded-xl border border-line bg-white shadow-sm"
                  />
                  <figcaption className="text-sm text-muted">{shot.alt}</figcaption>
                </figure>
              ))}
            </li>
          ))}
        </ol>

        <VerusNext
          items={[
            { href: "/verus/inside", label: "Inside VERUS" },
            { href: "/verus/evidence", label: "The evidence" },
          ]}
        />
      </div>
    </>
  );
}
