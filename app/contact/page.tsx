import type { Metadata } from "next";

// ONE CONTACT, 2026-09-25. This page offered two cards, "Two bodies of work, two ways in", and a
// MORIS path described as "diligence conversations, the technical package, and the NDA that opens
// the full mechanism". All of that is obsolete: the NDA came off askmoris.ai on 2026-09-23 and the
// mechanism is published there on every answer, so the page was offering to disclose privately a
// thing anyone can now read.
//
// The two-card split had already outlived itself in a quieter way. It sorted visitors by which
// body of work they wanted, on a site that is now a books site with one outbound demonstration.
// Sorting a stranger into a category before they have written a sentence asks them to know which
// of two conversations they are in, and then routes both to the same inbox anyway.
//
// NO FORM, AND THAT IS A JUDGEMENT RATHER THAN AN OMISSION. A working form here needs a server
// route, an email provider account, an API key held as a deployment secret, and spam handling,
// because a public unprotected form is a relay pointed at one person's inbox. This site has no API
// routes and no mail dependency at all today. The operator's own condition was "if a form is
// cheap"; it is not, and a mailto link cannot fail in the ways a form can.

export const metadata: Metadata = {
  title: "Contact",
  description:
    "The Resonance Institute is a solo undertaking. However you write, the note reaches the same person.",
};

const email = "contact@resonanceinstitutellc.com";

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-16 sm:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Contact
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          One address.
        </h1>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          This is a solo undertaking, not a contact center. Whatever you are
          writing about, the note reaches the same person.
        </p>
        <p className="mt-8">
          <a
            href={`mailto:${email}`}
            className="font-serif text-xl text-accent underline decoration-line underline-offset-4 transition-colors hover:decoration-accent sm:text-2xl"
          >
            {email}
          </a>
        </p>
      </section>
    </div>
  );
}
