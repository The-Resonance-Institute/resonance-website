import Image from "next/image";
import type { Metadata } from "next";
import { share } from "@/lib/share";

// PIVOT LABS, 2026-10-22, on the operator's word: "lean in to this being part of The Resonance
// Institute, this is how discovery happens." An animated mockumentary the Institute presents and
// VERUS sponsors. It is in the header (content/nav.json) because he asked for it there: "stop trying
// to hide it, embrace it." The stills are frames from the show itself, rendered from the same files
// that make the episodes, so the page shows what a viewer actually sees.

export const metadata: Metadata = share("/pivot-labs", {
  title: "Pivot Labs",
  description:
    "Pivot Labs. Because it's no fun to be serious all the time. An animated mockumentary about a San Francisco startup with thirty days of money left, and VERUS, the AI who quietly keeps it running. Presented by The Resonance Institute. Sponsored by VERUS.",
});

const stills = [
  { src: "/pivot-labs/night-rounds.jpg", alt: "VERUS fixing the espresso machine at 5 a.m.", caption: "5:12 a.m. VERUS does his rounds. Nobody asked him to." },
  { src: "/pivot-labs/the-pivot.jpg", alt: "The Pivot Labs team at their desk, reading a post", caption: "Five pivots before lunch. Twenty-four hats." },
  { src: "/pivot-labs/arrival.jpg", alt: "OMNI and the Inevitables moving into the corner", caption: "Inevitable moves into the corner. Product: unclear." },
  { src: "/pivot-labs/the-party.jpg", alt: "Dev talking to Maya at the house party", caption: "Dev talks to Maya. VERUS is in his ear." },
  { src: "/pivot-labs/benchmark.jpg", alt: "OMNI and VERUS on stage at the lunch and learn", caption: "OMNI versus VERUS. First and wrong, against last and right." },
  { src: "/pivot-labs/ducks.jpg", alt: "The Pivot Labs desk buried in rubber ducks", caption: "Sprocket got users. Four thousand. Ducks." },
];

const cast = [
  ["VERUS", "The AI at Pivot Labs. Trained on forty years of factory maintenance manuals, which is why he wears a hard hat to a software startup."],
  ["Sprocket", "His robot dog, and his agent. Does exactly what he is told, instantly, completely, literally."],
  ["Dev", "Cofounder and CTO. Nineteen. Built VERUS alone on a weekend and never told anyone it was special."],
  ["Tanner", "Founder and CEO. Cold plunge, gratitude journal, and whatever Hudson posted this morning."],
  ["Kenzie", "Head of Growth, and of everything else. She hired the documentary crew. That is you."],
  ["Brooke", "Community manager of The Commons. She decides who sits where. She has a bell."],
  ["OMNI", "Inevitable's AI. Omniscient Machine for Next-level Intelligence. He will tell you."],
];

export default function PivotLabs() {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <section className="pt-20 pb-10 sm:pt-28">
        <p className="text-sm uppercase tracking-[0.2em] text-muted">The Resonance Institute presents</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight text-ink sm:text-6xl">Pivot Labs</h1>
        <p className="mt-3 font-serif text-2xl italic text-ink sm:text-3xl">Because it&rsquo;s no fun to be serious all the time.</p>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink">
          An animated mockumentary about a San Francisco startup with thirty days of money left,
          and the AI who quietly keeps it running.
        </p>
        <p className="mt-4 text-base text-muted">
          Sponsored by{" "}
          <a href="https://www.verusops.com" className="text-accent underline decoration-line hover:decoration-accent">
            VERUS
          </a>
          .
        </p>
        <p className="mt-8">
          <a
            href="https://youtu.be/GbEhRrub3kM"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ink"
          >
            Watch Chapter 1 on YouTube
          </a>
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <Image
          src="/pivot-labs/team.jpg"
          alt="The Pivot Labs team at their desk with VERUS and Sprocket, and a bank balance of $41,212"
          width={1152}
          height={648}
          className="w-full rounded-lg"
          priority
        />
      </section>

      <section className="space-y-5 pt-10 text-lg leading-relaxed text-ink">
        <h2 className="font-serif text-3xl text-ink">The show</h2>
        <p>
          Pivot Labs works out of The Commons, a coworking space with fourteen startups, four phone
          booths and one kombucha keg. It has the worst desk in the building, next to the restroom,
          and thirty days of runway. In thirty days, Demo Night decides whether it lives.
        </p>
        <p>
          The humans chase every idea in the valley: fintech, climate, crypto, an acquisition, a
          weekend of agents that buys four thousand rubber ducks. Meanwhile VERUS fixes the espresso
          machine, waters the fig, and helps everyone in the building who asks. Nobody at Pivot Labs
          notices that he is the best thing they ever made.
        </p>
        <p>
          It is a spoof of startup life, and everybody in it is vibe coding: in the cold plunge, on
          the dance floor, walking into a pillar.
        </p>
      </section>

      <section className="pt-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {stills.map((s) => (
            <figure key={s.src}>
              <Image src={s.src} alt={s.alt} width={1152} height={648} className="w-full rounded-lg" />
              <figcaption className="mt-2 text-sm text-muted">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="space-y-5 pt-14 text-lg leading-relaxed text-ink">
        <h2 className="font-serif text-3xl text-ink">Who is in it</h2>
        <dl className="space-y-4">
          {cast.map(([name, line]) => (
            <div key={name}>
              <dt className="font-semibold text-ink">{name}</dt>
              <dd className="text-muted">{line}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-5 border-t border-line mt-14 pt-10 pb-24 text-lg leading-relaxed text-ink">
        <h2 className="font-serif text-3xl text-ink">Season one</h2>
        <p>
          Ten chapters, about twenty-eight minutes, from Day One of Thirty to Demo Night, on the{" "}
          <a href="https://www.youtube.com/@PivotLabsshow" target="_blank" rel="noopener noreferrer" className="text-accent underline decoration-line hover:decoration-accent">
            Pivot Labs channel
          </a>{" "}
          on YouTube. A new chapter every few days.
        </p>
        <p>
          VERUS is real. The cartoon one wears a hard hat to a software startup. The real one watches
          an industrial company&rsquo;s systems all day and all night and tells its leaders the truth
          about the operation.{" "}
          <a href="https://www.verusops.com" className="text-accent underline decoration-line hover:decoration-accent">
            Meet the real VERUS
          </a>
          .
        </p>
      </section>
    </div>
  );
}
