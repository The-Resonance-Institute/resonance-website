import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { share } from "@/lib/share";
import { FilmTvNav } from "@/components/film-tv-nav";
import { PITCH_EMAIL, pitchHref, screenProjects } from "@/lib/screen";

// FILM & TV, 2026-11-04 (the approved build map, then the operator's word that the screen work and
// Pivot Labs were buried under "Stories"). Its own header entry. The page opens with Pivot Labs, the
// one thing a visitor can watch today, then the four original projects for producers, agents and
// studios: key art, format, tagline, the hook, and what is written. The one action for a project is
// "Request the pitch". The decks, bibles and scripts are never on the site; see lib/screen.ts.

export const metadata: Metadata = share("/screen", {
  title: "Film & TV",
  description:
    "Pivot Labs, an animated mockumentary on YouTube, and four original projects for film and television by C. T. Herndon: AEGIS, The Unfinished, Alma Mater and The Alcott.",
});

const youtube = [
  { href: "https://www.youtube.com/playlist?list=PLaVVUGmRTBDU", label: "Watch Season 1" },
  { href: "https://www.youtube.com/playlist?list=PLa-MD9CYl4Qw", label: "Watch Season 2" },
  // SEASON 3 GOES HERE once its playlist is live, as on /pivot-labs.
];

export default function FilmAndTv() {
  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-10 sm:pt-12">
        <FilmTvNav current="/screen" />
      </section>

      <section className="pt-8 pb-10">
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">Film &amp; TV</h1>
        <p className="mt-5 max-w-2xl font-serif text-xl font-light leading-relaxed text-ink">
          An animated series you can watch today, and four original projects for film and
          television, all written by C. T. Herndon.
        </p>
      </section>

      {/* PIVOT LABS FIRST: it is on YouTube now. The words are the /pivot-labs page's own. */}
      <section id="pivot-labs" className="scroll-mt-8 border-t border-line pt-12">
        <div className="grid gap-8 sm:grid-cols-[1.2fr_1fr] sm:items-center">
          <Link href="/pivot-labs" className="block overflow-hidden rounded-2xl border border-line shadow-md">
            <Image
              src="/pivot-labs/team.jpg"
              alt="The Pivot Labs team at their desk with VERUS and Sprocket, and a bank balance of $41,212"
              width={1152}
              height={648}
              sizes="(max-width: 640px) 100vw, 560px"
              className="h-auto w-full"
            />
          </Link>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Watch now · On YouTube</p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-ink">Pivot Labs</h2>
            <p className="mt-2 font-serif text-xl font-light italic text-ink">
              Because it&rsquo;s no fun to be serious all the time.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              An animated mockumentary about a San Francisco startup with thirty days of money left,
              and the AI who quietly keeps it running.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {youtube.map((y) => (
                <a
                  key={y.href}
                  href={y.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
                >
                  {y.label} <span aria-hidden>&rarr;</span>
                </a>
              ))}
              <Link
                href="/pivot-labs"
                className="inline-flex items-center gap-1.5 py-1 text-sm font-medium text-accent transition-colors hover:text-ink"
              >
                About the show <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 border-t border-line pt-12">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Original projects</p>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">
          Each is fully written. Every project has an interactive lookbook; scripts and pitch materials are sent on request.
        </p>
      </section>

      <div className="mt-10 space-y-16">
        {screenProjects.map((p) => (
          <section key={p.slug} id={p.slug} className="scroll-mt-8">
            <div className="overflow-hidden rounded-2xl border border-line shadow-md">
              <Image
                src={p.art}
                alt={`${p.title}: ${p.tagline}`}
                width={1280}
                height={720}
                sizes="(max-width: 1024px) 100vw, 976px"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_260px] sm:gap-10">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{p.format}</p>
                <h2 className="mt-2 font-serif text-3xl leading-tight text-ink">{p.title}</h2>
                <p className="mt-2 font-serif text-xl font-light italic text-ink">{p.tagline}</p>
                <div className="mt-4 space-y-3">
                  {p.hook.map((para) => (
                    <p key={para.slice(0, 40)} className="leading-relaxed text-muted">
                      {para}
                    </p>
                  ))}
                </div>
                {p.source && (
                  <Link
                    href={p.source.href}
                    className="mt-3 inline-flex items-center gap-1.5 py-1 text-sm font-medium text-accent transition-colors hover:text-ink"
                  >
                    {p.source.label} <span aria-hidden>&rarr;</span>
                  </Link>
                )}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Written</p>
                <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink">
                  {p.written.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link
                    href={p.lookbook}
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
                  >
                    Explore the lookbook <span aria-hidden>&rarr;</span>
                  </Link>
                  <a
                    href={pitchHref(p.title)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    Request the pitch <span aria-hidden>&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-16 border-t border-line pt-10">
        <p className="max-w-2xl leading-relaxed text-muted">
          For screen projects and pitch requests, write to{" "}
          <a
            href={`mailto:${PITCH_EMAIL}`}
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            {PITCH_EMAIL}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
