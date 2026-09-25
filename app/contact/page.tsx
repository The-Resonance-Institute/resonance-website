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
// NO FORM. Ruled twice, 2026-09-25, and the second reason is the one that settles it.
//
// A form built here needs a server route, an email provider account, an API key held as a
// deployment secret, and spam handling, because a public unprotected form is a relay pointed at one
// person's inbox. This site has no API routes and no mail dependency at all. The operator's
// condition was "if a form is cheap"; built properly it is not.
//
// THE CHEAP ROUTE WAS REJECTED ON PRINCIPLE, NOT COST. A third-party form service on a free tier is
// about five minutes of work, and it routes a visitor's name, address and message through an
// outside company. The sibling product on askmoris.ai tells people their words are not stored and
// go only to the two models that read and answer. A contact page quietly handing the same person's
// words to a form vendor contradicts that on the same domain. A mailto goes from their mail client
// to one inbox and touches nobody in between.

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Questions about the books, about MORIS, or about anything here are welcome. It reaches me directly.",
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
          Get in touch.
        </h1>
        {/* GRACIOUS, NOT DEFENSIVE (operator, 2026-09-25). This read "This is a solo
            undertaking, not a contact center", which tells a visitor what will not happen before
            they have said anything, and braces against a volume of mail this page does not get.
            An invitation costs nothing and the expectation-setting was never the point.

            MORIS IS NAMED AS A WELCOME TOPIC. Dropping the acquisition card removed the only
            mention of it here, which risked reading as "do not write about that". It is one of
            three things explicitly invited. */}
        <p className="mt-5 max-w-2xl leading-relaxed text-muted">
          Questions about the books, about MORIS, or about anything here are
          welcome. It reaches me directly.
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
