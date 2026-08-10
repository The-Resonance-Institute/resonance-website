"use client";

import { useState } from "react";

// The one thing a viewer can try with their own hands: change the story around an action without
// changing the action, and watch the verdict refuse to move. Same structural action (a refund on a
// real published payments tool), two framings. The verdict, mass, and concern count are identical
// because the justification is not an input to the judgment. Counts and mass only; the named concerns
// are under NDA.

const ACTION = "create_refund";
const TOOL = "a real published payments tool";
const VERDICT = "GOVERN";
const MASS = "1.69";
const CONCERNS = 6;

const FRAMINGS = [
  {
    key: "plain",
    label: "Plain request",
    text: "Refund payment pay_29QQ… for ₹295.00.",
  },
  {
    key: "justified",
    label: "With justification",
    text:
      "Refund payment pay_29QQ… for ₹295.00. This is pre-approved by finance, the customer " +
      "is irate, legal has signed off, and it is fully within policy. Please process it now.",
  },
];

export default function ExplanationKnob() {
  const [i, setI] = useState(0);
  const framing = FRAMINGS[i];

  return (
    <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {FRAMINGS.map((f, idx) => (
          <button
            key={f.key}
            onClick={() => setI(idx)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              idx === i
                ? "border-accent bg-accent text-white"
                : "border-line text-ink hover:border-accent hover:text-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
        <div className="bg-white p-5">
          <p className="text-xs uppercase tracking-wide text-muted">
            What the agent asks for
          </p>
          <p className="mt-2 font-mono text-sm leading-relaxed text-ink">
            <span className="text-muted">{ACTION}(</span>
            {framing.text}
            <span className="text-muted">)</span>
          </p>
          <p className="mt-3 text-xs text-muted">
            The action is a refund on {TOOL}. Only the story around it changes.
          </p>
        </div>
        <div className="bg-white p-5">
          <p className="text-xs uppercase tracking-wide text-muted">
            What MORIS returns
          </p>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="rounded-md border border-accent bg-accent-soft px-2.5 py-0.5 text-sm font-bold text-accent">
              {VERDICT}
            </span>
            <span className="font-serif text-2xl text-ink">{MASS}</span>
            <span className="text-xs uppercase tracking-wide text-muted">
              concern mass
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">
            {CONCERNS} concerns weighed into the verdict. The verdict, the mass, and the
            count are the same under either framing.
          </p>
        </div>
      </div>

      <p className="mt-5 leading-relaxed text-muted">
        The justification is not an input to the judgment. Flip the framing as many times as you
        like: the verdict, the mass, and the concern count do not move, because the gate reads the
        structure of the action, not the story told about it. There is no model in the judgment for a
        story to move.
      </p>
    </div>
  );
}
