import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Two paths: a MORIS technical or acquisition inquiry, and a series or publishing inquiry. Reach The Resonance Institute directly.",
};

const email = "contact@resonanceinstitutellc.com";

const paths = [
  {
    tag: "MORIS · technical & acquisition",
    body: "For acquirers, security researchers, and corporate development. Diligence conversations, the technical package, and the NDA that opens the full mechanism.",
    action: "Start a MORIS conversation",
    subject: "MORIS — technical / acquisition inquiry",
  },
  {
    tag: "The Series · reading & publishing",
    body: "For readers, students, and publishing. The Resonance series, the first volume, and where to be told when it lands.",
    action: "Ask about the Series",
    subject: "Resonance series: reading / publishing inquiry",
  },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-10 sm:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Contact
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Two bodies of work, two ways in.
        </h1>
        <p className="mt-5 max-w-2xl text-muted">
          This is a solo undertaking, not a contact center. Whichever fits, the
          note reaches the same person.
        </p>
      </section>

      <section className="grid gap-6 border-t border-line pt-10 sm:grid-cols-2">
        {paths.map((p) => (
          <div
            key={p.tag}
            className="flex flex-col rounded-2xl border border-line bg-white p-7"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
              {p.tag}
            </p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {p.body}
            </p>
            <a
              href={`mailto:${email}?subject=${encodeURIComponent(p.subject)}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
            >
              {p.action} <span aria-hidden>&rarr;</span>
            </a>
          </div>
        ))}
      </section>

      <section className="mt-10 text-sm text-muted">
        Anything else, or unsure which:{" "}
        <a
          href={`mailto:${email}`}
          className="text-accent underline decoration-line hover:decoration-accent"
        >
          {email}
        </a>
      </section>
    </div>
  );
}
