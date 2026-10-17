import type { Metadata } from "next";
import { share } from "@/lib/share";
import { VerusNav, VerusNext } from "@/components/verus-nav";

// PROJECT VERUS, THE EVIDENCE, 2026-10-13. Every number on this page was measured, and says when. Nothing is
// rounded up, and the low numbers stay (operator, 2026-10-12): the Institute publishes its research in full. A
// number changes here only when it has been measured again in the VERUS repository.

export const metadata: Metadata = share("/verus/evidence", {
  title: "VERUS: the evidence",
  description:
    "What has been measured about VERUS, and when: answers on the confirmed path, mapping a system unaided, questions in plain words, document search, install time and cost. Including what is not yet good enough.",
});

const MAPPING = [
  { system: "Maintenance (CMMS)", unaided: "100%", reviewed: "100%", when: "10 October 2026" },
  { system: "HR", unaided: "94.3%", reviewed: "94.3%", when: "10 October 2026" },
  { system: "Legacy ERP (the demonstration plant)", unaided: "90.3%", reviewed: "not remeasured", when: "1 October 2026" },
  { system: "CRM", unaided: "83.6%", reviewed: "87.7%", when: "10 October 2026" },
  { system: "A second ERP, unlike the first", unaided: "73.2%", reviewed: "not remeasured", when: "1 October 2026", low: true },
];

const th = "py-2 pr-4 text-left text-xs font-medium uppercase tracking-wide text-muted";
const td = "py-2.5 pr-4 align-top";

export default function Evidence() {
  return (
    <>
      <VerusNav current="/verus/evidence" />
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <section className="pt-16 pb-10 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">VERUS</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">The evidence</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Every result we have measured, good and not good enough yet, with the date it was measured. All of it was
            measured on made-up plants built to behave like real ones.
          </p>
        </section>

        <section className="border-t border-line pt-10 leading-relaxed text-ink">
          <h2 className="font-serif text-2xl text-ink">Answers on the confirmed path</h2>
          <p className="mt-4">
            When a person picks a metric, or builds a question on the form, VERUS answers from the plant&rsquo;s
            confirmed definitions with no model involved.
          </p>
          <p className="mt-4">
            <strong>173 of 173 reference questions answered correctly</strong> across five systems: an ERP (55), a
            second, unlike ERP (43), HR (25), a CRM (25) and maintenance (25). Measured 12 October 2026.
          </p>
        </section>

        <section className="mt-14 border-t border-line pt-10 leading-relaxed text-ink">
          <h2 className="font-serif text-2xl text-ink">Mapping a system by itself</h2>
          <p className="mt-4">How much of a system VERUS gets right before anyone answers its questions, and after:</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[540px] tabular-nums">
              <thead>
                <tr className="border-b border-line">
                  <th className={th}>System</th>
                  <th className={`${th} text-right`}>Right unaided</th>
                  <th className={`${th} text-right`}>After review</th>
                  <th className={th}>Measured</th>
                </tr>
              </thead>
              <tbody>
                {MAPPING.map((m) => (
                  <tr key={m.system} className="border-b border-line">
                    <td className={td}>{m.system}</td>
                    <td className={`${td} text-right ${m.low ? "font-semibold text-[#b45309]" : ""}`}>{m.unaided}</td>
                    <td className={`${td} text-right`}>{m.reviewed}</td>
                    <td className={`${td} text-muted`}>{m.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            The second ERP is below our own target of 90%. The causes are known and have been worked on since, but it
            has not been remeasured.
          </p>
        </section>

        <section className="mt-14 border-t border-line pt-10 leading-relaxed text-ink">
          <h2 className="font-serif text-2xl text-ink">Questions in plain words</h2>
          <p className="mt-4">
            Questions typed in a person&rsquo;s own words, measured against reference answers on 3 October 2026:
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[420px] tabular-nums">
              <thead>
                <tr className="border-b border-line">
                  <th className={th}></th>
                  <th className={`${th} text-right`}>Legacy ERP</th>
                  <th className={`${th} text-right`}>Second ERP</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className={td}>Answered correctly</td>
                  <td className={`${td} text-right font-semibold text-[#b45309]`}>68.2%</td>
                  <td className={`${td} text-right font-semibold text-[#b45309]`}>47.7%</td>
                </tr>
                <tr className="border-b border-line">
                  <td className={td}>Typical time to answer</td>
                  <td className={`${td} text-right`}>7.6 seconds</td>
                  <td className={`${td} text-right`}>7.7 seconds</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4">
            These are well below where they need to be. The causes were found in that run, and work on them has gone in
            since, but it has not been remeasured, so these remain the figures. A question asked on the confirmed path
            above does not depend on this.
          </p>
        </section>

        <section className="mt-14 border-t border-line pt-10 leading-relaxed text-ink">
          <h2 className="font-serif text-2xl text-ink">Search in your own documents</h2>
          <p className="mt-4">On 34 questions with known answers across a company&rsquo;s documents (12 October 2026):</p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>the right passage first: 94.1%;</li>
            <li>the right passage in the first three: 100%;</li>
            <li>
              documents shown to a person whose role may not read them: <strong>none</strong>.
            </li>
          </ul>
        </section>

        <section className="mt-14 border-t border-line pt-10 leading-relaxed text-ink">
          <h2 className="font-serif text-2xl text-ink">What it takes</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <strong>Install:</strong> about six minutes on a laptop from a fresh copy, before the first download of
              Docker&rsquo;s base images.
            </li>
            <li>
              <strong>Cost of a model:</strong> a full run of the twenty-minute demonstration spends about $0.18 on a
              language model. A question asked a second time is answered from what was kept and costs nothing.
            </li>
            <li>
              <strong>Tests:</strong> 1,455 automated tests run on every change, including the ones that hold the
              security lines: read-only, each person&rsquo;s access, restricted columns, and the guard on every query.
            </li>
          </ul>
        </section>

        <VerusNext items={[{ href: "/verus/see-it", label: "See it" }]} />
      </div>
    </>
  );
}
