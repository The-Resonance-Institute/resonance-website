import type { Metadata } from "next";
import Link from "next/link";
import { VerusNav, VerusNext } from "@/components/verus-nav";

// PROJECT VERUS, 2026-10-13, on the operator's word. Industrial operating intelligence from the Institute, written
// for the people who run plants and the people who own them, not for the philosophy readers the rest of the site
// serves. It keeps the Institute's standard: every number measured and dated, what is not finished said plainly.
// The copy is drafted and reviewed in the VERUS repository (docs/site/project-verus) and carried here.

export const metadata: Metadata = {
  title: "Project VERUS",
  description:
    "VERUS reads the systems an industrial company already runs, the ERP, maintenance, HR and the CRM, and puts what matters in front of the plant manager, the company's leadership and its owner every morning.",
};

const link = "text-accent underline decoration-line hover:decoration-accent";

export default function Verus() {
  return (
    <>
      <VerusNav current="/verus" />
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <section className="pt-16 pb-10 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Project VERUS</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Your companies already know what is going wrong.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            VERUS reads it back to the people who need to know, every morning.
          </p>
        </section>

        <section className="space-y-5 border-t border-line pt-10 text-lg leading-relaxed text-ink">
          <p>
            Every industrial company runs on systems that hold the truth about it: the ERP, the maintenance system,
            HR, the CRM. The answers are in there. Getting them out takes an analyst, a spreadsheet and a week. By the
            time they reach the people further from the floor, they have passed through several hands and several
            definitions.
          </p>
          <p>
            VERUS connects to the systems a company already runs, works out what their records mean, and asks a person
            only where it is not sure. From then on it answers in plain words, watches what matters, and shows each
            person what their role needs: one plant, one company, or every company you own.
          </p>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-serif text-2xl text-ink">Who it is for</h2>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              {
                h: "The plant manager",
                p: "One page at six in the morning: yesterday against the same day last week, what needs a decision, and the plans under way. Questions answered in plain words, without waiting for an analyst.",
              },
              {
                h: "The company's leadership",
                p: "Every plant measured the same way, straight from the systems, with a warning wherever the data itself misleads.",
              },
              {
                h: "The owner",
                p: "A holding company, an investor or a board. Every company side by side on one definition, even when each runs a different ERP. Numbers read from the systems, not from a pack prepared for you, and agents watching every company at once.",
              },
            ].map((a) => (
              <div key={a.h} className="bg-white p-6">
                <h3 className="font-serif text-xl text-ink">{a.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-serif text-2xl text-ink">What it does</h2>
          <ul className="mt-6 space-y-4 leading-relaxed text-ink">
            <li>
              <strong>Connects to what you have.</strong> Databases and web services, with prior knowledge of how
              several common ERP, HR, CRM and maintenance products lay out their records. It reads; it has no way to
              write anything back.
            </li>
            <li>
              <strong>Maps itself, and asks about the rest.</strong> It works out which table holds work orders and
              which column is the scrap reason code. Where it is unsure it asks a short question: &ldquo;Does
              &lsquo;Corrective&rsquo; mean corrective maintenance?&rdquo; A person confirms; nothing is assumed
              silently.
            </li>
            <li>
              <strong>Puts every company on one definition.</strong> On-time delivery means the same thing at a company
              on one ERP as at a company on another, because both are mapped to the same definitions. Amounts in
              different currencies are shown in their own currency, never silently added together.
            </li>
            <li>
              <strong>Tells you what is odd in the data before anyone asks.</strong> A reason code used as a catch-all.
              Promise dates moved after the shipment, so on-time delivery looks better than it was. One shift coding
              scrap differently from the others. These are the numbers an owner most needs to question, and the ones a
              monthly report never shows.
            </li>
            <li>
              <strong>Answers questions in plain words,</strong> with the number, how it was worked out, the query that
              ran and how fresh the data is.
            </li>
            <li>
              <strong>Watches with agents.</strong> Starter agents watch scrap, on-time delivery, maintenance, turnover,
              pipeline and more. One watches each company&rsquo;s largest customers and speaks up when nobody has
              called, visited or written to one in six weeks. Anyone can add their own in a sentence: &ldquo;Warn me
              when scrap on any work center runs more than twice its usual in a month.&rdquo; It reads the sentence
              back, shows what it would have caught over the past year, and only then starts watching.
            </li>
            <li>
              <strong>Turns findings into plans</strong> with a measure that says whether the plan worked, judged on the
              date the plan names.
            </li>
            <li>
              <strong>Answers from your own documents,</strong> the quality manual and the work instructions, and cites
              the page.
            </li>
          </ul>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <h2 className="font-serif text-2xl text-ink">How it is built</h2>
          <ul className="mt-6 space-y-4 leading-relaxed text-ink">
            <li>
              <strong>Your data stays in your network.</strong> VERUS runs on a machine inside it. The only thing that
              leaves is what you choose to send a language model, and you choose the provider. When it maps a system:
              the names of tables and columns, counts, and masked samples. Numbers are rounded into ranges, text is
              reduced to its shape, anything that looks like a person is removed, and short codes such as
              &ldquo;PM&rdquo; are sent as they are. Sensitive columns, such as pay or national ids, send nothing.
              When it puts an answer in words: the rows of that one answer. Turn the model off and nothing of yours
              leaves at all.
            </li>
            <li>
              <strong>Read-only by design.</strong> The software has no write path to your systems. It is not a
              setting.
            </li>
            <li>
              <strong>Each person sees what their role allows.</strong> A plant manager sees their plant. An owner sees
              every company. Neither sees a named employee: people data shows as counts and rates.
            </li>
            <li>
              <strong>Stale data is never hidden.</strong> Every answer says how fresh it is.
            </li>
            <li>
              <strong>It works without a model.</strong> Mapping by itself, questions in your own words and agents from
              a sentence use one. Everything else (the data findings, the dashboards, the confirmed metrics, the agents
              once made, the morning brief) runs without one.
            </li>
          </ul>
        </section>

        <section className="mt-14 border-t border-line pt-10 leading-relaxed text-ink">
          <h2 className="font-serif text-2xl text-ink">Where it stands</h2>
          <p className="mt-6">
            VERUS is in development at the Resonance Institute. It runs today on a demonstration group built to behave
            like a real one: two manufacturing companies, one in the United States with two plants and one in Canada,
            with three years of ERP records and an HR system, a CRM and a maintenance system beside them. Several
            companies in one installation work today. A single view across companies that each run their own
            installation is the next step, built with the first group that needs it.{" "}
            <Link href="/verus/evidence" className={link}>
              The evidence
            </Link>{" "}
            shows what has been measured, and what has not been yet.
          </p>
        </section>

        <VerusNext
          items={[
            { href: "/verus/how-it-works", label: "How it works" },
            { href: "/verus/inside", label: "Inside VERUS" },
          ]}
        />
      </div>
    </>
  );
}
