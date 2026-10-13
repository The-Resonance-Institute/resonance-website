import type { Metadata } from "next";
import Link from "next/link";
import demo from "@/content/verus-demo.json";
import { AppFrame, DemoTileCard, value, type DemoTile } from "@/components/verus-charts";
import { VerusNav, VerusNext } from "@/components/verus-nav";

// PROJECT VERUS, INSIDE VERUS, 2026-10-13. The operator asked for demonstration pages that show well and do not
// function: no VERUS runs on the web (agreed 2026-10-12). These are still pictures of the product, drawn from the
// demonstration's own numbers in content/verus-demo.json, so they read at any width where a screenshot would not.
// Every number on this page comes from that file. Synthetic data, two invented companies; never a customer.

export const metadata: Metadata = {
  title: "Inside VERUS",
  description:
    "Still pictures of VERUS on its demonstration group: the owner's view of two companies on one definition, what the agents found, a plant manager's morning dashboard and the morning brief.",
};

type Finding = { agent: string; title: string; summary: string; confidence: number };
type BriefMetric = { name: string; unit: string | null; value: number | null; before: number | null; trend: string | null };
type Brief = {
  title: string;
  period: string;
  compared: string;
  summary: string[];
  metrics: BriefMetric[];
  findings: { title: string; summary: string; plan: string }[];
  moves: { name: string; change_pct: number; date: string; reasons: string[] }[];
};

const owner = demo.owner.tiles as DemoTile[];
const plant = demo.plant.tiles as DemoTile[];
const feed = demo.feed as Finding[];
const brief = demo.brief as Brief;

function Section({ n, title, children, lead }: { n: number; title: string; lead: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="grid gap-5 border-t border-line pt-12">
      <div className="max-w-3xl">
        <h2 className="flex items-baseline gap-3 font-serif text-2xl text-ink">
          <span className="font-sans text-base font-semibold tabular-nums text-accent">{n}</span>
          {title}
        </h2>
        <div className="mt-3 text-lg leading-relaxed text-ink">{lead}</div>
      </div>
      {children}
    </section>
  );
}

function trendWord(t: string | null) {
  if (t === "better") return <span className="font-medium text-[#0f766e]">better</span>;
  if (t === "worse") return <span className="font-medium text-[#b45309]">worse</span>;
  return <span className="text-muted">steady</span>;
}

export default function Inside() {
  return (
    <>
      <VerusNav current="/verus/inside" />
      <div className="mx-auto max-w-5xl px-6 pb-20">
        <section className="max-w-3xl pt-16 pb-10 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Project VERUS</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">Inside VERUS</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Still pictures of VERUS on its demonstration group, drawn from the demonstration&rsquo;s own numbers. Two
            invented companies: Alpha Fabrication in the United States, with plants HB and KC, and Beta Extrusions in
            Canada. Nothing here is live and nothing is clickable. To see it run,{" "}
            <Link href="/verus/see-it" className="text-accent underline decoration-line hover:decoration-accent">
              ask for a demonstration
            </Link>
            .
          </p>
        </section>

        <div className="grid gap-16">
          <Section
            n={1}
            title="The owner: every company on one definition"
            lead={
              <p>
                A holding company, an investor or a board sees both companies side by side, read from their systems.
                Sales stay in each company&rsquo;s own currency. On-time delivery carries the warning VERUS found in the
                data: promise dates moved after shipping. People are counts, never names.
              </p>
            }
          >
            <AppFrame who="Owner · both companies" asOf={demo.asOf} title={demo.owner.title}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {owner.map((t) => (
                  <DemoTileCard key={t.title} tile={t} />
                ))}
              </div>
            </AppFrame>
          </Section>

          <Section
            n={2}
            title="What the agents found"
            lead={
              <p>
                Agents watch the data and raise what needs a person. The first is the owner&rsquo;s own: Alpha&rsquo;s
                largest customer, untouched for months. The rest come from the plants&rsquo; agents, each within what the
                owner may see.
              </p>
            }
          >
            <AppFrame who="Owner · Feed" asOf={demo.asOf} title="What the agents found">
              <ul className="grid gap-3">
                {feed.map((f) => (
                  <li key={f.title} className="grid gap-1.5 rounded-xl border border-line bg-white p-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                      <span className="rounded-full bg-[#e6f0fb] px-2 py-0.5 font-medium text-[#1c5cab]">Open</span>
                      <span>{f.agent}</span>
                      <span>confidence {Math.round(f.confidence * 100)}%</span>
                    </div>
                    <p className="font-semibold leading-snug text-ink">{f.title}</p>
                    <p className="text-sm leading-relaxed text-muted">{f.summary}</p>
                  </li>
                ))}
              </ul>
            </AppFrame>
          </Section>

          <Section
            n={3}
            title="A plant manager's morning"
            lead={
              <p>
                The HB plant manager sees HB and nothing else: yesterday by line and department, last week&rsquo;s
                maintenance and overtime. Where a number carries a caveat, the tile says so.
              </p>
            }
          >
            <AppFrame who="HB plant manager" asOf={demo.asOf} title={demo.plant.title}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {plant.map((t) => (
                  <DemoTileCard key={t.title} tile={t} />
                ))}
              </div>
            </AppFrame>
          </Section>

          <Section
            n={4}
            title="The morning brief"
            lead={
              <p>
                What the plant manager reads at six: what matters most, yesterday against {brief.compared}, the
                findings waiting for a decision, and the outside world where it touches the plant&rsquo;s costs.
              </p>
            }
          >
            <AppFrame who="HB plant manager · Feed" asOf={demo.asOf} title={brief.title}>
              <div className="grid gap-5 rounded-xl border border-line bg-white p-5">
                <ul className="list-disc space-y-1.5 pl-5 leading-relaxed text-ink">
                  {brief.summary.map((s) => (
                    <li key={s}>{s}.</li>
                  ))}
                </ul>

                <div className="grid gap-2">
                  <p className="text-sm font-semibold text-ink">
                    {brief.period}, against {brief.compared}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[480px] text-sm tabular-nums">
                      <thead>
                        <tr className="text-left text-xs text-muted">
                          <th className="py-1.5 pr-4 font-medium">Measure</th>
                          <th className="py-1.5 pr-4 text-right font-medium">That day</th>
                          <th className="py-1.5 pr-4 text-right font-medium">A week before</th>
                          <th className="py-1.5 font-medium">Trend</th>
                        </tr>
                      </thead>
                      <tbody>
                        {brief.metrics.map((m) => (
                          <tr key={m.name} className="border-t border-line">
                            <td className="py-1.5 pr-4 text-ink">{m.name}</td>
                            <td className="py-1.5 pr-4 text-right text-ink">{value(m.value, m.unit)}</td>
                            <td className="py-1.5 pr-4 text-right text-muted">{value(m.before, m.unit)}</td>
                            <td className="py-1.5">{trendWord(m.trend)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="grid gap-2">
                  <p className="text-sm font-semibold text-ink">Findings waiting for a decision</p>
                  <ul className="grid gap-1.5 text-sm">
                    {brief.findings.map((f) => (
                      <li key={f.title} className="flex flex-wrap justify-between gap-x-4 border-t border-line pt-1.5">
                        <span className="text-ink">{f.title}</span>
                        <span className={f.plan === "accepted" ? "font-medium text-[#0f766e]" : "text-muted"}>
                          {f.plan === "accepted" ? "plan accepted" : f.plan}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-2">
                  <p className="text-sm font-semibold text-ink">The outside world</p>
                  <ul className="grid gap-1.5 text-sm">
                    {brief.moves.map((m) => (
                      <li key={m.name} className="flex flex-wrap justify-between gap-x-4 border-t border-line pt-1.5">
                        <span className="text-ink">
                          {m.name}
                          {m.reasons?.[0] ? <span className="text-muted">. {m.reasons[0]}</span> : null}
                        </span>
                        <span className="tabular-nums text-ink">
                          {m.change_pct > 0 ? "up" : "down"} {Math.abs(m.change_pct).toFixed(1)}% in{" "}
                          {new Date(`${m.date}T12:00:00`).toLocaleString("en-US", { month: "long" })}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AppFrame>
          </Section>
        </div>

        <VerusNext
          items={[
            { href: "/verus/how-it-works", label: "How it works" },
            { href: "/verus/see-it", label: "See it" },
          ]}
        />
      </div>
    </>
  );
}
