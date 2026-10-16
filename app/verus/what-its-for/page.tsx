import Link from "next/link";
import type { Metadata } from "next";
import { share } from "@/lib/share";
import { VerusNav, VerusNext } from "@/components/verus-nav";

// PROJECT VERUS, WHAT IT'S FOR, 2026-10-16, on the operator's word: buyers decide by situation ("we just bought a
// company", "six plants and nobody's numbers agree"), and the main page only said who uses it. Each situation is one
// plain sentence on the moment and what VERUS does there, with the demonstration's own numbers where one exists. Only
// what it does today is claimed. Getting ready to sell is a natural fit and says so honestly; diligence before closing
// is not built and is named as next, not offered.
export const metadata: Metadata = share("/verus/what-its-for", {
  title: "What VERUS is for",
  description:
    "Running a plant, running several, owning several companies, the first 100 days after an acquisition, folding in an add-on, a new leader's first weeks, proving improvement worked, and getting ready to sell.",
});

const EMAIL = "contact@resonanceinstitutellc.com";
const ASK = `mailto:${EMAIL}?subject=${encodeURIComponent("Project VERUS")}`;
const link = "text-accent underline decoration-line hover:decoration-accent";

type Situation = { who: string; title: string; moment: string; does: React.ReactNode[]; note?: string };

const SITUATIONS: Situation[] = [
  {
    who: "Plant managers",
    title: "Running a plant",
    moment: "You run the plant, and the reporting runs you.",
    does: [
      "A one-page brief every morning: yesterday's numbers by line and department, against the same day last week.",
      "The problems that need a decision, with what they cost. On the demonstration, scrap on HB03 ran $24,421 in March against a usual $10,705.",
      "Every fix becomes a plan, checked on its review date.",
    ],
  },
  {
    who: "COOs and operations leaders",
    title: "Running several plants",
    moment: "Six plants, six spreadsheets, and the numbers never agree.",
    does: [
      "Every plant on one set of definitions, confirmed with your people, so plants are compared fairly.",
      "A warning wherever the data can't be trusted. On the demonstration, 1,252 order lines had their promise date moved to the ship date after shipping, which made on-time delivery look better than it was.",
      "Findings ranked by what they cost, so the next visit goes where the money is.",
    ],
  },
  {
    who: "Owners, private equity, holding companies and boards",
    title: "Owning several companies",
    moment: "You see your companies once a month, in packs someone else built.",
    does: [
      "Every company side by side, read straight from its own systems. On the demonstration, Alpha shipped $1.79M last month and Beta C$735k, each in its own currency and never added together.",
      "Problems flagged the week they start, not at the month-end review. One agent noticed a top customer with no contact in 107 days.",
      "The same definitions in every company, so a board compares like with like.",
    ],
  },
  {
    who: "Buyers, after closing",
    title: "The first 100 days after an acquisition",
    moment: "You've closed. Now you need to know what you actually bought.",
    does: [
      "The data health report from setup shows where the company's records mislead: the catch-all codes, the moved dates, the shift that books scrap its own way.",
      "A baseline as soon as setup is done, read from the company's own systems rather than from the seller's presentation.",
      "The findings feed the 100-day plan, and each action in it is judged on its review date, so you know which fixes worked.",
    ],
  },
  {
    who: "Platform companies",
    title: "Folding in an add-on",
    moment: "The add-on keeps its own ERP, and its numbers mean something different.",
    does: [
      "VERUS reads the add-on's systems and maps them to the same definitions as the platform company, with no ERP project first.",
      "From the first month, the new plant sits beside the others in the owner's view and the plant comparisons.",
    ],
  },
  {
    who: "New plant managers, operating partners, interim leaders",
    title: "A new leader's first weeks",
    moment: "You've just arrived, and everyone has a story about the numbers.",
    does: [
      "The plant's real picture in days: where scrap, downtime and late orders concentrate, and which customers are slipping.",
      "Every number shows how it was worked out and how current it is, so you can tell a fact from a habit.",
    ],
  },
  {
    who: "Continuous improvement and cost programs",
    title: "Proving the improvement worked",
    moment: "The program is busy. Did the number move?",
    does: [
      "Each plan carries the measure it will be judged by, taken when the plan is accepted, and measured again on its review date.",
      "Outside prices separate what the market did from what you did: a starter agent watches scrap cost against steel prices and stays quiet when the market explains the move.",
    ],
  },
  {
    who: "Owners preparing a sale",
    title: "Getting ready to sell",
    moment: "Before buyers look, know what they will find.",
    does: [
      "The data health report shows the problems a buyer's diligence would question, while there is still time to fix the processes behind them.",
      "Numbers that show their work hold up better in front of a buyer than a pack built for the occasion.",
    ],
    note: "A natural fit for what VERUS does today, though it has not yet been used in a sale.",
  },
];

export default function WhatItsFor() {
  return (
    <>
      <VerusNav current="/verus/what-its-for" />
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <section className="pt-16 pb-10 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Project VERUS</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">What it&rsquo;s for</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            VERUS earns its place in situations every operator knows. Here is what it does in each, and, at the end,
            what it does not do yet.
          </p>
        </section>

        <ol className="border-t border-line">
          {SITUATIONS.map((s) => (
            <li key={s.title} className="border-b border-line py-10">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{s.who}</p>
              <h2 className="mt-2 font-serif text-2xl text-ink">{s.title}</h2>
              <p className="mt-3 font-serif text-xl font-light italic leading-snug text-ink">{s.moment}</p>
              <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-ink">
                {s.does.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              {s.note && <p className="mt-4 text-base text-muted">{s.note}</p>}
            </li>
          ))}
        </ol>

        <section className="mt-12 rounded-2xl border border-line bg-white p-6 sm:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Next</p>
          <h2 className="mt-2 font-serif text-2xl text-ink">Diligence before you buy</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink">
            Today VERUS connects read-only to a company you own. Before closing, a buyer has a data room and a few weeks.
            Reading a data-room extract on that timeline, and showing what the target&rsquo;s numbers really say, is the
            next thing being built. If that is what you need, tell us about it.
          </p>
          <p className="mt-6 flex flex-wrap gap-4">
            <a
              href={ASK}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0b5f58]"
            >
              Talk to us
            </a>
            <Link href="/verus/pricing" className={`${link} self-center text-sm`}>
              Pricing
            </Link>
          </p>
        </section>

        <VerusNext
          items={[
            { href: "/verus/see-it", label: "See it" },
            { href: "/verus/how-it-works", label: "How it works" },
            { href: "/verus/evidence", label: "The evidence" },
          ]}
        />
      </div>
    </>
  );
}
