import Link from "next/link";
import type { Metadata } from "next";
import { share } from "@/lib/share";
import { VerusNav, VerusNext } from "@/components/verus-nav";

// PROJECT VERUS, PRICING, 2026-10-16, worked out with the operator. Per plant and never per person, because VERUS is
// worth more the more people read the same truth, and a seat price makes a company ration it. Setup is a fixed fee
// stated up front, because the software installs in minutes but learning a company's messy data is real work. Thirty
// days free once it is working, not on signing. Honest about where it stands: no real company has run it yet, so the
// first are design partners (60% of setup and of the first year's license, 2026-10-16: the operator's word, "we
// don't want to undersell the value"), and the page claims no return it has not measured. Private equity diligence is not
// priced here: it is a later product and does not exist yet.
export const metadata: Metadata = share("/verus/pricing", {
  title: "VERUS pricing",
  description:
    "Priced per plant, not per person: everyone in the company can use it. A fixed setup fee stated up front, 30 days free once it is working, and design-partner places for the first companies.",
});

const EMAIL = "contact@resonanceinstitutellc.com";
const ASK = `mailto:${EMAIL}?subject=${encodeURIComponent("VERUS design partner")}`;
const link = "text-accent underline decoration-line hover:decoration-accent";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="font-serif text-2xl text-ink">{title}</h2>
      <div className="mt-5 text-lg leading-relaxed text-ink">{children}</div>
    </section>
  );
}

const cell = "border-t border-line px-4 py-3 align-top";

export default function Pricing() {
  return (
    <>
      <VerusNav current="/verus/pricing" />
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <section className="pt-16 pb-10 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">VERUS</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            Priced per plant, not per person.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Everyone in the company can use it, from the plant floor to the controller to the owner. You pay for the
            plants it watches, a fixed fee to set it up, and nothing more until it has shown you what it finds.
          </p>
        </section>

        <Block title="The license">
          <div className="overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full text-left text-base">
              <thead>
                <tr className="text-sm text-muted">
                  <th className="px-4 py-3 font-medium"></th>
                  <th className="px-4 py-3 font-medium">Per plant, per month</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={cell}>One or two plants</td>
                  <td className={`${cell} font-medium`}>$3,000</td>
                </tr>
                <tr>
                  <td className={cell}>Three or more plants</td>
                  <td className={`${cell} font-medium`}>$2,500</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5">Billed yearly. Every license includes:</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-6">
            <li>everyone in the company, with no limit on users;</li>
            <li>the morning brief, the dashboards, the findings and the action plans;</li>
            <li>every starter agent, and agents your people build, run and share;</li>
            <li>the outside market: material prices, industry data and trade news, every morning;</li>
            <li>the owner&rsquo;s view across plants and companies;</li>
            <li>updates and support.</li>
          </ul>
          <p className="mt-5 text-base text-muted">
            A holding company or a private equity portfolio with several companies is priced per company and per
            plant. Ask, and it is quoted for your group.
          </p>
        </Block>

        <Block title="Setup, priced up front">
          <p>
            The software installs in minutes. Learning your data takes real work: odd tables, codes nobody wrote down,
            and a few working sessions with your people to confirm what things mean. So setup is a fixed fee, agreed
            before it starts.
          </p>
          <ul className="mt-5 space-y-3">
            <li>
              <strong>$10,000</strong> for the first system, usually the ERP, and <strong>$3,000</strong> for each
              system after it, such as HR, maintenance or the CRM.
            </li>
            <li>
              <strong>It covers</strong> the read-only connection, VERUS working out your tables and codes, and up to
              two working sessions per system with the people who know the data.
            </li>
            <li>
              <strong>You keep a data health report,</strong> even if you stop after setup. It shows where your records
              mislead you: a catch-all reason code, promise dates moved after shipping, one shift recording scrap its
              own way. Most companies have never seen it laid out.
            </li>
            <li>
              <strong>Remote by default.</strong> We recommend one kickoff day on site, to meet your people and see the
              plant. The day is part of the fee; its travel is billed at cost, agreed in advance.
            </li>
            <li>
              <strong>If your systems need more,</strong> extra days are $2,000 each, on site or remote, and each one
              is agreed with you before it is worked.
            </li>
          </ul>
        </Block>

        <Block title="Thirty days free, once it is working">
          <p>
            The thirty days start when VERUS is connected and your people have confirmed what it learned, not when you
            sign. A slow setup never eats into them. For thirty days you get the morning brief, the dashboards, the
            findings and the agents on your own data. Then you decide. If it has not earned its place, you stop.
          </p>
        </Block>

        <Block title="Design partners">
          <p>
            VERUS is in development. It has run on a demonstration group, not yet on a real company&rsquo;s data, and{" "}
            <Link href="/verus/evidence" className={link}>
              the evidence
            </Link>{" "}
            says exactly what has been measured. Its first companies are design partners:
          </p>
          <ul className="mt-4 list-disc space-y-1.5 pl-6">
            <li>60% of the setup fee;</li>
            <li>60% of the license for the first year, then the list price;</li>
            <li>in return: your feedback, a reference if it earns one, and permission to publish what it found without
              your name.</li>
          </ul>
          <p className="mt-6">
            <a
              href={ASK}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0b5f58]"
            >
              Ask about a design partner place
            </a>
          </p>
          <p className="mt-3 text-base text-muted">
            Or write to <span className="select-all text-ink">{EMAIL}</span>. It reaches me directly.
          </p>
        </Block>

        <Block title="What you never pay for">
          <ul className="space-y-3">
            <li>
              <strong>Seats.</strong> Add the supervisor, the planner, the board. The price does not move.
            </li>
            <li>
              <strong>Moving your data.</strong> It stays in your systems and on your machine. VERUS only reads it.
            </li>
            <li>
              <strong>An AI model you did not choose.</strong> It is optional, and you pick the provider. On the
              demonstration, a full twenty-minute run cost about eighteen cents in model use.
            </li>
          </ul>
        </Block>

        <VerusNext
          items={[
            { href: "/verus/see-it", label: "See it" },
            { href: "/verus/evidence", label: "The evidence" },
            { href: "/verus", label: "What it is" },
          ]}
        />
      </div>
    </>
  );
}
