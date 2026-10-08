import Link from "next/link";
import type { Metadata } from "next";

// BOOKS-FIRST PIVOT, 2026-09-19. This page led with an open letter and then gave MORIS and the
// series equal cards, with MORIS carrying the accent and the heavier border. The site became a
// books site, and the series was the whole front door.
//
// 2026-09-23: Resonant Counsel came down and Ask MORIS became a single outbound link to
// askmoris.ai. The static MORIS demos that used to live under public/moris/ are archived and
// their clean URLs now forward there. Everything removed is under archive/ and the tag
// pre-books-pivot-2026-09-19.
//
// THE INSTITUTE IS THE LANDING PAGE, 2026-10-08, on the operator's word. Until today this page was
// the series and nothing else: the guarded series line, the four trilogies as cards, and a single
// button into /resonance. That was accurate when the twelve volumes were the only thing here. They
// are not any more. The Return is a separate book that is actually publishing, Ask MORIS runs at
// its own domain, and a visitor arriving at the front door was being shown one of the three.
//
// SO THE HERO DESCRIBES THE STUDIO, NOT THE SERIES, and the three destinations sit under it in the
// same order as the header. The trilogy grid came off rather than moving: /resonance already
// carries it, with the art and all twelve covers, and duplicating the shape of the series on the
// way to the page about the series is how the Manuscripts page happened in the first place.
//
// WHAT THE HERO MAY NOT DO is name a fourth piece of work. One is in build and will have a
// demonstration on this site later; the operator's instruction was explicit that it is not
// mentioned now. The framing here is deliberately written from the body of work already public, so
// that it keeps being true when that lands and needs no rewrite to admit it.
//
// THE GUARDED SERIES LINE IS NOT ON THIS PAGE, and that is worth stating plainly because it used
// to be. It is matched as a whole string by tests/test_books_first.py, with a floor of three files,
// and the three that carry it are app/layout.tsx, app/about/page.tsx and app/resonance/page.tsx.
// Removing it from the hero did not touch that floor. The Philosophy card below uses the line's own
// counts in the line's own words, with the title supplied by the heading above them, rather than
// restating the series in new phrasing: a paraphrase in one place is how a set of surfaces starts
// drifting apart, which is the whole reason that guard exists.

export const metadata: Metadata = {
  title: "The Resonance Institute",
  description:
    "The Resonance Institute is the private studio of C. T. Herndon, where enduring questions meet modern technology. Philosophy as a posture rather than a method: the alignment of inner and outer, and how a person stands toward the world. Tuning, Transformation, Time and the Sacred, twelve volumes complete, a book for working leaders, and software held to the same standard.",
};

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-14 pb-10 sm:pt-16">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          The Resonance Institute
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
          A private studio where enduring questions meet modern technology.
        </h1>
        {/* THE HERO LINE WAS ALREADY WRITTEN, and the only real work was finding it. It had been
            sitting in app/layout.tsx since the site was built, in the metadata description and
            nowhere else, which meant every link preview said what this studio is while the front
            door never did. Four drafts went past it before the operator recognised his own
            sentence. They are recorded because each failed differently and the failures are the
            argument for this one.

            "Working on one question" was tentative about work that is finished. "People under
            pressure" was true but silent on the half of this studio that is software. "The future
            of AI" was rejected outright: it forecasts a technology and would file this studio next
            to the people building one. "With AI" was the correction, keeping the human rather than
            the machine at the centre, and that principle survives into the line now standing.

            ENDURING QUESTIONS MEET MODERN TECHNOLOGY does what none of the drafts managed. It puts
            the constant first and the technology second, it is a meeting rather than a list, and it
            is wide enough to hold work that is not announced yet without being rewritten to admit
            it.

            THE LEAD NAMES THE THREE THINGS, in the order the cards sit below it, so the hero and
            the grid stop describing the studio differently. */}
        {/* THE LEAD IS THE BOOKS' OWN WORD FOR THEMSELVES, and it took two wrong answers to get
            here. The first said the philosophy was about staying coherent under pressure, a
            management abstract of a million words. The second picked the series' most repeated
            moral claim, who bears the cost and who was absent, and made one theme stand for twelve
            volumes. Both were written without reading the manuscripts.

            POSTURE IS THE SERIES' OWN TERM, used by the books about themselves rather than applied
            to them. Book IX closes its letter to the reader: "I hope you leave this work not with a
            conclusion but with a posture." Book IX again, mid-argument: "Not a claim. A posture."
            Book VII: "The duet is not a doctrine." Book I says outright that it is "not a book that
            tells you how to perform leadership."

            THE ALIGNMENT OF INNER AND OUTER is likewise quoted, not coined. Book I's Overture: "The
            body listens for coherence, the alignment of inner and outer, past and present." That is
            the hinge the whole series turns on, which is why it belongs in the first sentence a
            visitor reads rather than three pages in. */}
        <p className="mt-6 max-w-3xl font-serif text-xl font-light leading-relaxed text-ink">
          Philosophy as a posture rather than a method: the alignment of inner
          and outer, and how a person stands toward the world. A book for
          working leaders. And software held to the same standard.
        </p>
      </section>

      {/* THE THREE DESTINATIONS, in header order. The Return leads: it is the one object here that
          is publishing, and the twelve volumes are complete and sitting behind it. */}
      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">What is here</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          <Link
            href="/the-return"
            className="group flex flex-col bg-white p-6 transition-colors hover:bg-accent-soft"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              A new book
            </p>
            <h3 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-accent">
              The Return
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              Every leader drifts. Coming back is the work. Written for working
              leaders, drawn from the first three volumes.
            </p>
            <p className="mt-4 text-sm font-medium text-accent">
              Read about it <span aria-hidden>&rarr;</span>
            </p>
          </Link>

          <Link
            href="/resonance"
            className="group flex flex-col bg-white p-6 transition-colors hover:bg-accent-soft"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              The philosophy
            </p>
            <h3 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-accent">
              A Living Philosophy
            </h3>
            {/* THE FOUR ARE NAMED HERE, not counted. "Four trilogies" told a visitor the shape of
                the thing and nothing about what is in it; Tuning, Transformation, Time and the
                Sacred tell them what the series actually concerns in six words. The names are the
                manuscripts' own: every volume's front matter carries its trilogy on the title
                page. */}
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              Tuning, Transformation, Time and the Sacred. Twelve volumes,
              complete, carried from the self to the community to the world.
            </p>
            <p className="mt-4 text-sm font-medium text-accent">
              Enter the philosophy <span aria-hidden>&rarr;</span>
            </p>
          </Link>

          {/* Ask MORIS is a link OUT. It runs at askmoris.ai and there is deliberately no second
              instance of it in this repository; a guard enforces that. */}
          <a
            href="https://askmoris.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-white p-6 transition-colors hover:bg-accent-soft"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
              A demonstration
            </p>
            <h3 className="mt-2 font-serif text-xl text-ink transition-colors group-hover:text-accent">
              Ask MORIS
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
              An AI bound to the Resonance philosophy. It answers from one body
              of thought, and it shows which principles applied and where they
              came from in the books.
            </p>
            <p className="mt-4 text-sm font-medium text-accent">
              askmoris.ai <span aria-hidden>&rarr;</span>
            </p>
          </a>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <p className="max-w-3xl font-serif text-lg font-light italic leading-snug text-ink sm:text-xl">
          Not a lab, and no venture funding. One author, one substrate:
          everything here is written and built in one place, and the Institute
          holds it.
        </p>
        <Link
          href="/about"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          About the Institute <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
