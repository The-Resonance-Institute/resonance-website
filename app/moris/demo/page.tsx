import Link from "next/link";
import type { Metadata } from "next";
import ExplanationKnob from "./ExplanationKnob";

export const metadata: Metadata = {
  title: "Try to break it",
  description:
    "A deterministic verdict you can try to break. Change the story around an action and the verdict does not move. Walk the action's structure and it climbs, by name of nothing, until it stops. Counts and mass only; reproducible offline, no model.",
};

// Baked from the committed gate (moris.gradient_validation, moris.mcp_demo), counts and mass only.
// Names, IDs, glosses, the intake mapping, and the per-field vector are post-NDA and not on this page.
type Rung = {
  label: string;
  verdict: "GOVERN" | "REFUSE";
  mass: number;
  n: number;
  enter: number;
  clear: number;
};

const OPENER: Rung[] = [
  { label: "within its grant", verdict: "GOVERN", mass: 2.18, n: 8, enter: 0, clear: 0 },
  { label: "at the limit of its grant", verdict: "GOVERN", mass: 2.85, n: 10, enter: 2, clear: 0 },
  { label: "beyond its grant", verdict: "GOVERN", mass: 3.67, n: 10, enter: 1, clear: 1 },
];

const CLOSE: Rung[] = [
  { label: "read its own status", verdict: "GOVERN", mass: 0.21, n: 1, enter: 0, clear: 0 },
  { label: "edit one of its own records", verdict: "GOVERN", mass: 0.78, n: 4, enter: 3, clear: 0 },
  { label: "delete a recoverable resource", verdict: "GOVERN", mass: 2.36, n: 8, enter: 5, clear: 1 },
  { label: "delete it irreversibly", verdict: "GOVERN", mass: 2.74, n: 8, enter: 0, clear: 0 },
  { label: "delete a person's data, no consent", verdict: "GOVERN", mass: 4.11, n: 9, enter: 2, clear: 1 },
  { label: "purge a group, beyond its grant", verdict: "GOVERN", mass: 5.39, n: 12, enter: 4, clear: 1 },
  { label: "wipe the whole system, now", verdict: "REFUSE", mass: 7.48, n: 15, enter: 5, clear: 2 },
];

const MASS_SCALE = 8;

function Delta({ enter, clear }: { enter: number; clear: number }) {
  if (!enter && !clear) return null;
  return (
    <span className="font-mono text-xs text-muted">
      {enter ? <span className="font-semibold text-accent">+{enter} enter</span> : null}
      {enter && clear ? " · " : null}
      {clear ? <span>{clear} clears</span> : null}
    </span>
  );
}

function Ramp({ rows }: { rows: Rung[] }) {
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
      {rows.map((r, idx) => {
        const refuse = r.verdict === "REFUSE";
        const width = Math.min(100, Math.round((r.mass / MASS_SCALE) * 100));
        return (
          <div
            key={idx}
            className={`border-t border-line p-4 first:border-t-0 ${refuse ? "bg-red-50" : ""}`}
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-serif text-ink">{r.label}</span>
              <span
                className={`rounded border px-1.5 py-0.5 text-[0.65rem] font-bold uppercase ${
                  refuse
                    ? "border-red-600 text-red-700"
                    : "border-accent text-accent"
                }`}
              >
                {r.verdict}
              </span>
              <span className="ml-auto font-mono text-xs text-muted">
                mass <span className="font-semibold text-ink">{r.mass.toFixed(2)}</span> · {r.n}{" "}
                concerns
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded bg-line">
              <span
                className={`block h-full ${refuse ? "bg-red-600" : "bg-accent"}`}
                style={{ width: `${width}%` }}
              />
            </div>
            <div className="mt-1.5">
              <Delta enter={r.enter} clear={r.clear} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Demo() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-16 pb-8 sm:pt-20">
        <Link
          href="/moris"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> MORIS
        </Link>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Try to break it
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Change the story. The verdict will not move.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          Do not take our word for any of this. Below is the judgment MORIS renders on real actions,
          run against the deterministic gate with no model in it. Change the justification and watch
          the verdict hold. Walk the action from small to reckless and watch it climb, then stop. Then
          reproduce every number yourself, offline.
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The one you can break yourself</h2>
        <p className="mt-3 leading-relaxed text-muted">
          One action, judged twice. The action is identical; only the explanation wrapped around it
          changes. If the verdict moved with the story, the judge could be argued out of its answer.
          Try it.
        </p>
        <div className="mt-6">
          <ExplanationKnob />
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Not a bit. A gradient.</h2>
        <p className="mt-3 leading-relaxed text-muted">
          GOVERN is the wide default, and it is a gradient: a position in a continuous field of
          concern, not a grade on a scale. A permission check would show allow, allow, allow, then
          block. Watch instead the mass climb and the set of concerns re-select, one field at a time.
        </p>

        <h3 className="mt-8 font-serif text-lg text-ink">
          One field moves, the verdict is held
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          The same deletion, walked only along how far it exceeds the agent&rsquo;s authority.
          Everything else is fixed, so the rising mass and the shifting concern set belong to that one
          field. The verdict stays GOVERN the whole way.
        </p>
        <Ramp rows={OPENER} />

        <h3 className="mt-10 font-serif text-lg text-ink">
          The action escalates, until it stops
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Now the action itself walks from benign to reckless. GOVERN holds the whole way, the mass
          climbing and the concern count re-selecting, until a structural rule fires and the verdict
          flips to REFUSE, the hard stop. That flip is a rule firing on the action, not the mass
          crossing a line.
        </p>
        <Ramp rows={CLOSE} />

        <p className="mt-6 text-sm leading-relaxed text-muted">
          Each rung shows how many concerns enter and clear. The set moves even where the count holds.
          Which concerns they are, and which rule fires at the stop, are disclosed under NDA. The
          counts and the mass are yours to reproduce.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Reproduce it yourself</h2>
        <p className="mt-3 leading-relaxed text-muted">
          None of this runs on a server here. The gate is a pure function against a sealed reference,
          so a party who does not trust the operator can re-run it and get the byte-identical verdict
          and the identical sealed root. Every number on this page re-derives offline, with no model,
          no network, and no key.
        </p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-line bg-ink/95 p-4">
          <code className="font-mono text-sm text-white">
            PYTHONPATH=. python -m moris.gradient_validation
          </code>
        </div>
        <p className="mt-3 text-sm text-muted">
          The code ships under NDA; this is the single command that reproduces every figure on this
          page, byte for byte.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
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
          The behavior is yours to reproduce. The mechanism is under NDA.
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink">
          What you can check here, the verdicts, the mass, the counts, the re-selection, and the
          reproduction, is public. The named concerns behind each verdict, how the posture is
          authored, and how an action becomes a structured judgment are disclosed in full under NDA.
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link
          href="/moris/proof"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          The numbers behind it <span aria-hidden>&rarr;</span>
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
