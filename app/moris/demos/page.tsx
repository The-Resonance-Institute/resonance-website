import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demos",
  description:
    "Three live demonstrations of MORIS: the same model answered with and without a conscience, a conscience weighing something you bring it, and the same gate judging an autonomous agent's actions before they execute.",
};

// Plain anchors throughout, not next/link. Both demos are generated static documents served from
// public/ with their own isolated stylesheets, so client-side routing has nothing to render and
// must not be attempted.
const demos = [
  {
    // FIRST, and ruled so. This is the page that answers a sceptic: five models, one conscience,
    // and the visitor picks which model carries it. Someone who arrives doubting the demonstration
    // is rigged should meet the page that lets them test that before the ones that ask for trust.
    href: "/moris/pair",
    kicker: "The conscience, compared",
    title: "Two Answers, One Conscience",
    body:
      "One message, answered twice by the same model: once with nothing in front of it, once under the govern package. The reading and the judgment happen once and are frozen, so the two columns differ by the conscience and by nothing else. Five models to choose from, four vendors, and the page names which one answered.",
    cta: "See it answer twice",
  },
  {
    href: "/moris/chat",
    kicker: "The conscience, talking",
    title: "Say Something to MORIS",
    body:
      "Bring something you are actually wrestling with. A model reads the shape of what you are weighing into nine fields, a deterministic gate judges those nine, and a second model answers you bound by that judgment. You see the verdict, its weight, how many of the nine your words did not state, and the answer given under it.",
    cta: "Say something",
  },
  {
    href: "/moris/shift",
    kicker: "The conscience, governing",
    title: "The Governed Shift",
    body:
      "An autonomous support agent works a shift of nine tool calls, and every call runs twice: once with nothing between the agent and the effect, once through MORIS. Nine calls produced nine different concern levels, which is what govern-is-not-a-switch looks like when you can see it.",
    cta: "Read the record",
  },
];

export default function Demos() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-10 pb-12 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Running now, on this domain
        </p>
        <h1 className="mt-6 font-serif text-5xl text-ink sm:text-6xl">Demos</h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink">
          Two surfaces, one conscience. In both, no model sits where the verdict
          is decided.
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          They are not recordings. Each one calls the live gate when you use it,
          and the same reading always produces the same judgment.
        </p>
      </section>

      {demos.map((d) => (
        <section key={d.href} className="mt-2 border-t border-line pt-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {d.kicker}
          </p>
          <h2 className="mt-2 font-serif text-2xl text-ink">{d.title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink">{d.body}</p>
          <a
            href={d.href}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
          >
            {d.cta} <span aria-hidden>&rarr;</span>
          </a>
        </section>
      ))}

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">What is withheld</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Both demonstrations show the verdict, its weight and the concern
          count. The values the gate read, the primitives that fire by name, and
          the wording MORIS returns to a model are disclosed under NDA. What is
          public is enough to check that the gradient is real and that the same
          input gives the same answer.
        </p>
      </section>
    </div>
  );
}
