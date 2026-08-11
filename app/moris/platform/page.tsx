import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Platform Thesis",
  description:
    "A conscience judges the character of an action, and the character of an action is not specific to any domain. The judgment is built once and judges every domain; each domain supplies only its own perception. That is why MORIS is infrastructure, not a feature.",
};

const amazon = [
  "An autonomous vehicle service (Zoox)",
  "A delivery-drone program (Prime Air)",
  "Warehouse robotics around thousands of people",
  "A home robot",
  "An acting consumer assistant (Alexa+)",
  "The cloud others build agents on (AWS AgentCore)",
  "Healthcare decision surfaces",
];

export default function Platform() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-24">
        <Link
          href="/moris"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          <span aria-hidden>&larr;</span> MORIS
        </Link>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The platform thesis
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          One conscience, many autonomies.
        </h1>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          A conscience judges the character of an action, and the character of an
          action is not specific to any domain. A tool call, a lane change, a
          dosage, a drone release, an instruction to a person: underneath, the
          question is identical. Given what this action is, whom it touches, at what
          scope, under what authority, and how reversibly, should it proceed, and
          can the judgment be reproduced by a party who does not trust the vendor,
          under NDA or through a named third party. The mechanism that answers never
          mentions a domain.
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Infrastructure, not a feature</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The fixed, defensible thing is built once and judges every domain&rsquo;s
          actions, while each domain supplies only its own perception. The judgment
          is the constant. What differs across domains is the component that reads a
          raw situation into the structured description the judgment consumes. Build
          that judgment correctly and it is a platform: one hard, fixed core, many
          domain-specific eyes in front of it.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The order of markets</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Domains differ in one variable that sets their order: how structured the
          action already is when it reaches the judgment. Where actions arrive
          structured, as a software tool call does, the perception is small or
          absent and MORIS is model-free today. That is why agentic security is
          first: the beachhead, not the territory. Where the situation is raw and
          physical, a road, an operating room, a factory floor, the perception is
          large and domain-specific, the integration is longer, and the value is
          higher. The judgment is identical in every row. Only the eyes change.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">
          Amazon: one company, the whole thesis
        </h2>
        <p className="mt-3 leading-relaxed text-muted">
          The thesis is easy to doubt as abstraction. One company collapses the
          doubt. Amazon today operates, at scale and in revenue:
        </p>
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {amazon.map((a) => (
            <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-ink">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-5 leading-relaxed text-muted">
          Seven divisions, each a different perceiver in front of the identical
          question: should this action proceed, and can we prove the decision was
          sound. Amazon is not a buyer to pitch here. It is the existence proof. If
          one firm needs the same fixed reference in seven divisions, the layer is
          infrastructure, not a feature of any one of them.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">The corner is real, and hard</h2>
        <p className="mt-3 leading-relaxed text-muted">
          In the first half of 2026, the largest security vendors and a dozen funded
          entrants independently shipped a runtime layer that inspects an
          agent&rsquo;s action before it executes. That convergence proves the
          category is real. Every one of them built the probabilistic version. None
          built the deterministic version that reads meaning. That proves the corner
          is hard, and it is the corner MORIS was built, from its first design
          decision, to hold.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-line bg-accent-soft p-8 sm:p-10">
        <h2 className="font-serif text-2xl text-ink">What MORIS is not</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink">
          MORIS is not the only deterministic governor, not the only re-derivable
          one, and not the first to gate an action before it executes. It does not
          replace identity, injection detection, containment, or a gateway; it
          completes that stack. It is not a probabilistic model made more accurate,
          and no amount of capability converges on it. The differentiator is narrow
          and exact, which is what makes it strong: a content-and-intent-aware
          judgment, rendered by a deterministic non-model function, drawn from an
          authored posture rather than a hand-written rule list, and re-derivable,
          under NDA or by a named third party.
        </p>
      </section>

      <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
        <Link
          href="/moris/conscience"
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          What an artificial conscience is <span aria-hidden>&rarr;</span>
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
