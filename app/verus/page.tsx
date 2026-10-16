import type { Metadata } from "next";
import { share } from "@/lib/share";
import Image from "next/image";
import Link from "next/link";
import { VerusNav, VerusNext } from "@/components/verus-nav";

// PROJECT VERUS, 2026-10-13, on the operator's word. Written in operator language (operator, the same day). VERUS is
// Latin for true: the page leads with the truth about the operation, around the clock, and with what VERUS is to the
// people who run it: an analyst, a data scientist and a project manager in one. "Around the clock", not "real time":
// the fast-moving records are pulled all day and the rest overnight. Every number here was measured on the
// demonstration and appears on the evidence page or in How it works. Copy drafted in the VERUS repository.

export const metadata: Metadata = share("/verus", {
  title: "Project VERUS",
  description:
    "The truth about your operation, around the clock. VERUS watches your ERP, maintenance, HR and CRM data all day, every day: an analyst, a data scientist and a project manager that never go home. Read-only, inside your network.",
});

const link = "text-accent underline decoration-line hover:decoration-accent";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 border-t border-line pt-10 leading-relaxed text-ink">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const ROLES = [
  {
    role: "The analyst",
    line: "Does the daily reporting, so nobody has to build it.",
    items: [
      "Yesterday's numbers by line and department, against the same day last week, on one page every morning.",
      "Dashboards for each job: the plant manager's plant, the owner's companies side by side.",
      "Plain answers to questions, with the number, how it was calculated and how current the data is.",
      "Your own documents searched too: the quality manual answers, with the page it came from.",
    ],
  },
  {
    role: "The data scientist",
    line: "Watches everything, all day and all night, for what has changed.",
    items: [
      "Every line, machine, customer and supplier watched for spikes, slow drifts and early warnings.",
      "Before a watch is switched on, it is tested against the past year, so you see what it would have caught.",
      "Need to dig deeper? Build your own agent in one sentence, run it once or on a schedule, and share it with your team.",
      "Bad data called out: catch-all reason codes, promise dates changed after shipping.",
      "Findings ranked by what they cost in dollars where that can be measured, with outside prices such as steel and resin brought in where they touch your costs.",
    ],
  },
  {
    role: "The project manager",
    line: "Keeps the fixes on track until they are done.",
    items: [
      "A finding becomes a plan with steps, owners and due dates.",
      "The plan carries the measure it will be judged by, taken when the plan is accepted.",
      "On the review date it measures again and says whether the plan worked.",
      "Open plans show up in the morning brief until they are closed.",
    ],
  },
];

export default function Verus() {
  return (
    <>
      <VerusNav current="/verus" />
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <section className="pt-12 pb-10 sm:pt-16">
          {/* THE LOGO, Chris's own design, the blue version (2026-10-15). Its navy ground is part of the file, so it sits as a
              banner across the column; his upscale is 1,200 pixels wide here, sharp at that width on any screen. */}
          <Image
            src="/verus/verus-logo.jpg"
            alt="VERUS, operational intelligence"
            width={1200}
            height={670}
            priority
            sizes="(max-width: 800px) 100vw, 720px"
            className="mb-10 h-auto w-full rounded-2xl"
          />
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Project VERUS</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            The truth about your operation, around the clock.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            VERUS watches your ERP, maintenance, HR and CRM data all day, every day. It does the analysis, flags
            what&rsquo;s going wrong and where the money is, and keeps the fixes on track: an analyst, a data scientist
            and a project manager that never go home. Read-only. Runs inside your network.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/verus/inside"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0b5f58]"
            >
              See what it looks like <span aria-hidden>&rarr;</span>
            </Link>
            <Link
              href="/verus/see-it"
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Ask for a demonstration
            </Link>
          </div>
          <p className="mt-5 text-sm">
            <Link href="/verus/see-it#watch" className={link}>
              Meet VERUS in one minute
            </Link>
          </p>
        </section>

        <Block title="Three jobs, done all day, every day">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {ROLES.map((r) => (
              <div key={r.role} className="grid gap-3 bg-white p-6">
                <div>
                  <h3 className="font-serif text-xl text-ink">{r.role}</h3>
                  <p className="mt-1 text-muted">{r.line}</p>
                </div>
                <ul className="list-disc space-y-1.5 pl-5 text-[15px]">
                  {r.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        {/* LESS WORK, NOT MORE (operator, 2026-10-14). Written against the usual objection to this kind of system:
            that it is one more thing to run before the hard work of fixing the business. VERUS adds no system for
            people to feed; it takes over the reporting they build by hand, and its data findings point at the broken
            processes themselves. */}
        <Block title="Less work, not more">
          <p>
            VERUS doesn&rsquo;t add a system for your people to run. It does the reporting they build by hand today, and
            it points at the processes that need fixing.
          </p>
          <ul className="mt-5 space-y-4">
            <li>
              <strong>Manage by exception, not by meeting.</strong> VERUS watches every number all day and brings you
              only what crossed a line: a spike, a slip, a big customer gone quiet. Everything else needs no meeting to
              review.
            </li>
            <li>
              <strong>No data project.</strong> It reads the systems you already have, where they are. Nothing to move,
              nothing new to feed, no data entry.
            </li>
            <li>
              <strong>Your knowledge stays yours.</strong> Your definitions, codes and rules live on your machine, in
              your network. Change AI providers, or use none, and they stay.
            </li>
            <li>
              <strong>It finds the broken processes.</strong> Promise dates changed after shipping, a catch-all reason
              code, one shift coding scrap its own way. VERUS shows where the process is broken, so you fix the process,
              not the report.
            </li>
          </ul>
        </Block>

        <Block title="What it catches">
          <p>On the demonstration group, before anyone asked a question:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>a scrap spike at work center HB03 in March, $24,421 against a usual $10,705;</li>
            <li>four customers below 85% on time last week, one at 33%;</li>
            <li>preventive maintenance falling behind on a work center, flagged as a warning that downtime would follow;</li>
            <li>the largest customer at one company with no call, visit or email in 107 days;</li>
            <li>
              1,252 order lines whose promise date was changed to the ship date after shipping, which makes on-time
              delivery look better than it was;
            </li>
            <li>half of all downtime booked to one catch-all reason code, so the breakdown by reason means little.</li>
          </ul>
          <p className="mt-4">
            The last two are problems in the data itself. They sit under every report built on those numbers, and VERUS
            calls them out first.
          </p>
        </Block>

        {/* THE OUTSIDE WORLD (operator, 2026-10-15). Public government data and news, read daily: producer prices for
            the company's key materials and its industry, industrial production, energy, rates and exchange rates, and
            trade news scored against its own materials, customers and competitors. Not paid commodity feeds or
            industry benchmarks; the page does not imply them. */}
        <Block title="The outside world, every morning">
          <p>
            VERUS reads the economy and your industry every day: prices for your key materials, industrial
            production, energy, interest rates and exchange rates, and the trade news that names your materials,
            customers or competitors. It tells you what moved and what it means for your costs.
          </p>
          <p className="mt-4">
            It separates what the market did from what you did. A starter agent watches scrap cost on every work center
            against steel prices: it stays quiet when the market explains the move, and speaks up when it
            doesn&rsquo;t. On the demonstration it raised one month in a year, the scrap spike at HB03 in March.
          </p>
          <p className="mt-4 text-base text-muted">
            From public sources: producer prices, Federal Reserve industrial production, energy and diesel prices,
            employment, central bank decisions and exchange rates, and trade and government news. On the
            demonstration, steel mill products rose 1.7% in August and plastic resins fell 1.0%, and both showed up in
            the plant manager&rsquo;s brief.
          </p>
        </Block>

        <Block title="It shows its work">
          <p>
            Every number comes with where it came from, how it was calculated and how current it is. When the data
            behind a number can&rsquo;t be trusted, the number says so. The everyday measures run on definitions your
            people confirm, not on a guess: in our tests across five systems, 173 of 173 questions answered that way
            came back right. Questions typed in your own words lean on an AI model and are not as reliable yet;{" "}
            <Link href="/verus/evidence" className={link}>
              the evidence page
            </Link>{" "}
            gives the numbers.
          </p>
        </Block>

        <Block title="Who uses it">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {[
              {
                h: "Plant managers",
                p: "Their plant only. Yesterday's numbers, the problems that need a decision, and the plans under way, without waiting on an analyst.",
              },
              {
                h: "Operations leadership",
                p: "Every plant on the same definitions, straight from the systems, with a warning wherever the data can't be trusted.",
              },
              {
                h: "Owners and boards",
                p: "Every company side by side, read from the systems rather than from a monthly pack, with problems flagged the week they start.",
              },
            ].map((a) => (
              <div key={a.h} className="bg-white p-6">
                <h3 className="font-serif text-xl text-ink">{a.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.p}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm">
            <Link href="/verus/what-its-for" className={link}>
              What it&rsquo;s for, situation by situation: the first 100 days after an acquisition, folding in an
              add-on, a new leader&rsquo;s first weeks, and more
            </Link>
          </p>
        </Block>

        <Block title="Setting it up">
          <ul className="space-y-4">
            <li>
              <strong>It connects to what you already run:</strong> the ERP, MES, maintenance, quality, warehouse,
              HR, CRM, your data warehouse, and the spreadsheets. If it has a database, an API or exports files, VERUS
              can read it, read-only. Give it the address and a read-only login; it already knows how many common
              products store their records.
            </li>
            <li>
              <strong>It works out your tables and codes itself,</strong> and asks your people a handful of yes-or-no
              questions where it isn&rsquo;t sure. A maintenance system took five.
            </li>
            <li>
              <strong>It installs on one machine</strong> inside your network, in about six minutes once the software
              is downloaded.
            </li>
            <li>
              <strong>It keeps itself current.</strong> The records that change fast are pulled through the day, the
              rest overnight, as fast as your systems allow.
            </li>
          </ul>
        </Block>

        <Block title="Your data">
          <ul className="space-y-4">
            <li>
              <strong>It stays in your network.</strong> VERUS runs on your machine.
            </li>
            <li>
              <strong>Read-only.</strong> There is no way in the software to write back to your systems. It is not a
              setting someone can turn on.
            </li>
            <li>
              <strong>The AI model is optional, and you choose the provider.</strong> It is used to map a new system,
              to answer questions typed in your own words, and to build an agent from a sentence. When mapping, it sees
              table and column names, counts, and masked samples: numbers rounded into ranges, text reduced to its
              shape, anything personal removed, and sensitive columns such as pay never sent. When answering, it sees
              the rows of that one answer. Turn it off and nothing leaves; the dashboards, the watches and the morning
              brief all keep working.
            </li>
            <li>
              <strong>People see what their job needs.</strong> A plant manager sees their plant; an owner sees every
              company. Nobody sees a named employee: headcount, turnover and absence show as counts and rates.
            </li>
          </ul>
        </Block>

        <Block title="Where it stands">
          <p>
            VERUS is in development at the Resonance Institute. It runs today on a demonstration group: two
            manufacturers, one in the United States with two plants and one in Canada, with three years of ERP records
            and HR, CRM and maintenance systems alongside. Several companies in one installation work today. One view
            across companies that each run their own installation is next, built with the first group that needs it.
            Every result we have measured, including the ones not good enough yet, is on{" "}
            <Link href="/verus/evidence" className={link}>
              the evidence page
            </Link>
            .
          </p>
        </Block>

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
