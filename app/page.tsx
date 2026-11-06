import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { share } from "@/lib/share";
import { screenProjects } from "@/lib/screen";

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
// IT LANDED: VERUS went public on 2026-10-13, on the operator's word, with its own pages and
// a place in the header, and on 2026-10-16 it took its card in the grid below. The hero needed no
// rewrite, as intended: "software held to the same standard" already held it.
//
// THE GUARDED SERIES LINE IS NOT ON THIS PAGE, and that is worth stating plainly because it used
// to be. It is matched as a whole string by tests/test_books_first.py, with a floor of three files,
// and the three that carry it are app/layout.tsx, app/about/page.tsx and app/resonance/page.tsx.
// Removing it from the hero did not touch that floor. The Philosophy card below uses the line's own
// counts in the line's own words, with the title supplied by the heading above them, rather than
// restating the series in new phrasing: a paraphrase in one place is how a set of surfaces starts
// drifting apart, which is the whole reason that guard exists.

// THE REBUILD, 2026-11-04, on the operator's word (the approved build map). The front door now
// covers the whole body of work: the headline stays, the approved description follows it WORD FOR
// WORD, and the cards sit under it in menu order: Philosophy and leadership, Research, VERUS,
// Novels, and Film & TV across the full width (2026-11-04). Ask MORIS is no longer a card here; it is linked from /research only, like every outside
// site from the page about it. The closing line drops "One author, one substrate", which no longer
// describes the range. Since this rebuild the guarded series line is carried by app/layout.tsx and
// app/resonance/page.tsx only: the operator ruled that its paragraph appears on /resonance alone.
//
// THE DESCRIPTION NAMES THE CONSCIENCE, and that is a decision, not a slip past the vocabulary guard.
// The operator approved this exact paragraph on 2026-11-04; tests/test_books_first.py exempts that
// one sentence, verbatim, and nothing else on this page.
const DESCRIPTION =
  "A philosophy of how a person stands toward the world, and books for working leaders. Research into the conscience AI models acquire in training, and whether it can be deliberately authored and verified. VERUS, operational intelligence for industry: an analyst, a data scientist and a project manager that never go home. Novels, and original scripts for film and television. Many mediums, one living philosophy: how we live, act and play.";

export const metadata: Metadata = share("", {
  title: "The Resonance Institute",
  description: DESCRIPTION,
});

const card = "flex flex-col bg-white p-6";
const eyebrow = "text-xs font-medium uppercase tracking-[0.18em] text-muted";
const heading = "mt-2 font-serif text-xl text-ink";
const lead = "mt-2 flex-1 text-sm leading-relaxed text-muted";
const go = "inline-flex items-center gap-1.5 py-1 text-sm font-medium text-accent transition-colors hover:text-ink";

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
        <p className="mt-6 max-w-3xl font-serif text-xl font-light leading-relaxed text-ink">
          {DESCRIPTION}
        </p>
      </section>

      {/* THE FOUR DOORS, in menu order. Two by two from the small breakpoint up; four across would be
          four thin columns. Each card carries more than one way in, so a card is a panel of links
          rather than one large link. */}
      <section className="border-t border-line py-12">
        <h2 className="font-serif text-2xl text-ink">What is here</h2>
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          <div className={card}>
            <p className={eyebrow}>Philosophy and leadership</p>
            <h3 className={heading}>A Living Philosophy</h3>
            {/* The current card's wording, carried over: the four trilogies named, not counted. */}
            <p className={lead}>
              Tuning, Transformation, Time and the Sacred. Twelve volumes,
              complete, carried from the self to the community to the world. Four books
              for working leaders are drawn from them, and The Return is nearly
              ready.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5">
              <Link href="/resonance" className={go}>
                Enter the philosophy <span aria-hidden>&rarr;</span>
              </Link>
              <Link href="/leadership" className={go}>
                The leadership books <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* NOT THE DOCUMENTS' OWN TITLES (ruled 2026-10-10): the letter and the paper use words the
              front-door vocabulary guard keeps out of site copy; both are shown in full at /research. */}
          <div className={card}>
            <p className={eyebrow}>Research</p>
            <h3 className={heading}>The research behind MORIS</h3>
            <p className={lead}>
              Can a moral philosophy written by a person be made into a working
              conscience for AI? The letter, the full paper, every appendix, and
              the evidence behind each figure. Ask MORIS, its demonstration, is
              linked from there.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5">
              <Link href="/research" className={go}>
                Read the research <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* VERUS has its own site. Plain anchors in the same tab, as before: a Next Link would route
              inside this site. The two links are the ones the build map names. */}
          <div className={card}>
            <p className={eyebrow}>Software for operations</p>
            <h3 className={heading}>VERUS</h3>
            <p className={lead}>
              Operational intelligence for industry: an analyst, a data scientist
              and a project manager that never go home.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5">
              <a href="https://www.verusops.com/free" className={go}>
                Get VERUS Free <span aria-hidden>&rarr;</span>
              </a>
              <a href="https://www.verusops.com/pricing#design-partners" className={go}>
                Design partners <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>

          <div className={card}>
            <p className={eyebrow}>Novels</p>
            <h3 className={heading}>Unresolved, AEGIS and APEX</h3>
            <p className={lead}>
              The Unresolved trilogy, literary science fiction by C. T. Herndon. And the AEGIS and
              APEX thrillers, written as Jack Maddox. Every published book is on Amazon.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5">
              <Link href="/novels" className={go}>
                The novels <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* FILM & TV, 2026-11-04 (the operator: the screen work and Pivot Labs were buried). Its own
              card, the full width of the grid, with the four projects' key art in a row so a producer
              sees them without a click, and Pivot Labs offered first because it can be watched now. */}
          <div className={`${card} sm:col-span-2`}>
            <p className={eyebrow}>Film &amp; TV</p>
            <h3 className={heading}>An animated series, and four original projects</h3>
            <p className={lead}>
              Pivot Labs, an animated mockumentary, is on YouTube now. AEGIS, The Unfinished, Alma
              Mater and The Alcott are written for film and television, with pitch materials on
              request.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {screenProjects.map((s) => (
                <Link
                  key={s.slug}
                  href={`/screen#${s.slug}`}
                  className="block overflow-hidden rounded-lg border border-line transition-opacity hover:opacity-90"
                >
                  <Image
                    src={s.art}
                    alt={`${s.title}: ${s.tagline}`}
                    width={1280}
                    height={720}
                    sizes="(max-width: 640px) 50vw, 240px"
                    className="h-auto w-full"
                  />
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5">
              <Link href="/screen#pivot-labs" className={go}>
                Watch Pivot Labs <span aria-hidden>&rarr;</span>
              </Link>
              <Link href="/screen" className={go}>
                The four projects <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12">
        {/* No closing line, on the operator's word (2026-11-06): the page ends on the work. */}
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 py-1 text-sm text-muted transition-colors hover:text-accent"
        >
          About the Institute <span aria-hidden>&rarr;</span>
        </Link>
      </section>
    </div>
  );
}
