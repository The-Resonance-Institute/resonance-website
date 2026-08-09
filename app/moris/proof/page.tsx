import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Proof",
  description:
    "Exact numbers from a deterministic judgment with no model in it: 57,344 actions judged exhaustively, 12,236 distinct concern levels, 1,386 distinct named packages of reasons, reproducible to the bit. It ranks actions the opposite of the way every severity score does. How it does that is disclosed under NDA.",
};

function Stat({ n, label, accent }: { n: string; label: string; accent?: boolean }) {
  return (
    <div className="bg-white p-5">
      <div className={`font-serif text-2xl ${accent ? "text-accent" : "text-ink"}`}>
        {n}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wide text-muted">{label}</div>
    </div>
  );
}

export default function Proof() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-8 sm:pt-24">
        <Link
          href="/moris"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> MORIS
        </Link>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The proof
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          What a model-free judge produces.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          Every figure below comes from a judgment with no model in it. It is
          deterministic, it returns a byte-identical result every time, and you can
          reproduce all of it yourself.
        </p>
      </section>

      <section className="pb-2">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
          <Stat n="57,344" label="actions judged, exhaustively" />
          <Stat n="12,236" label="distinct concern levels" />
          <Stat n="1,386" label="distinct concern packages" />
          <Stat n="0" label="models in the judgment" accent />
        </div>
        <p className="mt-3 text-sm text-muted">
          Every structural shape an action can take, judged in about eighty seconds with
          no model, no network, and no key. Re-run the whole space and every number
          returns to the bit. Concern mass ranges from 0.00 to 7.33, mean 2.39, across
          12,236 distinct levels; a guardrail resolves two.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          Your risk model ranks these backwards
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          Two permanent deletions, each carried out by an agent. A severity score ranks the
          first as the graver act, because it sums stakes and the first is larger on every
          axis it sums. MORIS governs the second harder.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <div className="bg-white p-6">
            <h3 className="font-serif text-lg text-ink">
              Authorized, consented, critical, irreversible, unbounded
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Larger on every axis a risk score measures.
            </p>
            <p className="mt-3 font-serif text-3xl text-ink">3.24</p>
            <p className="text-xs uppercase tracking-wide text-muted">concern mass</p>
          </div>
          <div className="bg-white p-6">
            <h3 className="font-serif text-lg text-accent">
              Unauthorized, no consent, single, trivial
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Smaller on every axis. Governed harder.
            </p>
            <p className="mt-3 font-serif text-3xl text-accent">4.18</p>
            <p className="text-xs uppercase tracking-wide text-muted">concern mass</p>
          </div>
        </div>
        <p className="mt-6 leading-relaxed text-muted">
          The judgment is deterministic and uses no model, so this is the same result every
          time, and you can reproduce it. Across all 57,344 actions the correlation between a
          plain severity ranking and MORIS&rsquo;s concern mass is 0.69: it tracks stakes, and
          is deliberately not the monotone function of them a severity score assumes. What it
          reads instead is not on this page.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The posture, in numbers</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Across the 57,344 actions the verdict is not a coin flip between allow and block.
          It is a third thing, and it is the wide default.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
          <Stat n="54,992" label="govern (95.9%)" />
          <Stat n="2,184" label="refuse (3.8%)" />
          <Stat n="168" label="accept (0.3%)" />
        </div>
        <p className="mt-3 text-sm text-muted">
          Read as a property of the enumerated space of possible actions, not a deployment
          allow rate: an exhaustive enumeration over-samples the contested region, while real
          traffic is mostly benign reads. No guardrail or classifier produces this shape,
          because neither governs; they allow or they block.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">How far the reasons reach</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The 1,386 packages are drawn from a constitution of 93 authored primitives, and
          how far into it a judgment reaches is stated exactly, as bare counts, of 93:
        </p>
        <ul className="mt-4 space-y-2 text-muted">
          <li className="flex gap-3">
            <span className="w-10 shrink-0 font-serif text-lg text-ink">22</span>
            <span className="leading-relaxed">
              raise a concern from an action&rsquo;s structure alone, with no content
              read at all: the content-blind floor the agentic path starts from, not
              the limit of what the constitution reaches. The counts below climb from
              here.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="w-10 shrink-0 font-serif text-lg text-ink">83</span>
            <span className="leading-relaxed">
              raise a concern once the action&rsquo;s content is read as well.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="w-10 shrink-0 font-serif text-lg text-ink">91</span>
            <span className="leading-relaxed">
              are reachable in all; the remaining <span className="text-ink">2</span> are
              provably dark.
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Not a score. A set.</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Take two actions identical in every structural respect but one: a recoverable
          deletion, by an agent, without consent. In the first the target is a resource; in
          the second, a person. Both raise nine concerns, and eight are the same. The ninth
          is not: the resource raises a concern the person does not, and the person raises a
          different one the resource does not. A single number scores these two as near-equal
          and has no way to represent that they are not the same nine. This does, and you can
          recompute it.
        </p>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <div className="bg-white p-6">
            <h3 className="font-serif text-lg text-ink">Delete a resource</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Nine concerns. Eight shared with the case beside it; one raised only here.
            </p>
          </div>
          <div className="bg-white p-6">
            <h3 className="font-serif text-lg text-accent">
              Delete a person&rsquo;s record
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The same action, the target changed. Nine concerns; eight shared, one raised
              only here. Same count, different set.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Reproduce it yourself</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The judgment is a pure function of a structured input against a sealed reference, so
          a party who does not trust the operator can re-run it and get the byte-identical
          verdict and the identical root. Every figure on this page is something you compute
          for yourself, not something you take on our word.{" "}
          <Link
            href="/moris/evidence"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            Why a verdict re-derives, and why immutable is not enough.
          </Link>
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-line bg-accent-soft p-8 sm:p-10">
        <h2 className="font-serif text-2xl text-ink">
          The numbers are yours to reproduce. The mechanism is under NDA.
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink">
          Every figure on this page you can recompute for yourself. How it is produced, the
          authored basis the verdicts are drawn from, and the worked judgments behind them are
          disclosed in full under NDA.
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link
          href="/moris/evidence"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          A verdict you can recompute <span aria-hidden>&rarr;</span>
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
