import type { Metadata } from "next";
import Link from "next/link";
import { share } from "@/lib/share";

export const metadata: Metadata = {
  ...share("/lookbook", { title: "Lookbooks", description: "Lookbooks for the four original Film & TV projects by C. T. Herndon." }),
  robots: { index: false, follow: false },
};

type Banner = { kind: string; top: string; big: string; sub: string };

const slate: { href: string; title: string; form: string; line: string; ready: boolean; cover?: string; banner?: Banner }[] = [
  {
    href: "/lookbook/aegis",
    title: "AEGIS",
    form: "One-hour drama · 10 episodes written",
    line: "A covert museum unit hunts a relic that steals human speech.",
    ready: true,
    cover: "/lookbook/aegis/hero-mask.jpg",
  },
  {
    href: "/lookbook/unfinished",
    title: "The Unfinished",
    form: "Feature · 97 pages",
    line: "Is suffering a human right?",
    ready: true,
    cover: "/lookbook/unfinished/card.jpg",
  },
  {
    href: "/lookbook/alma-mater",
    title: "Alma Mater",
    banner: { kind: "alma", top: "Arkansas Valley Miners", big: "4–8", sub: "Beat Arkansas 30–27" },
    form: "One-hour drama · 10 episodes written",
    line: "The worst program in the SEC, a broken Hall of Famer, and a walk-on nobody wanted.",
    ready: true,
  },
  {
    href: "/lookbook/alcott",
    title: "The Alcott",
    banner: { kind: "alcott", top: "The Alcott", big: "A Founder Community", sub: "Est. 1924 · Mid-Market" },
    form: "Half-hour comedy · pilot",
    line: "Everyone's building the future. Nobody can make rent.",
    ready: true,
  },
];

export default function Home() {
  return (
    <div className="home">
      <header className="home-head">
        <p className="eyebrow">Film &amp; TV</p>
        <h1 className="home-title">C. T. Herndon</h1>
        <p className="home-sub">Film &amp; TV lookbooks</p>
      </header>
      <ul className="slate">
        {slate.map((s) => (
          <li key={s.title} className={`slate-card ${s.ready ? "" : "is-soon"}`}>
            {s.ready ? (
              <Link href={s.href} className="slate-link">
                {s.cover && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.cover} alt="" className="slate-cover" />
                )}
                {!s.cover && s.banner && (
                  <span className={`slate-banner slate-banner-${s.banner.kind}`} aria-hidden>
                    <span className="slate-banner-top">{s.banner.top}</span>
                    <span className="slate-banner-big">{s.banner.big}</span>
                    <span className="slate-banner-sub">{s.banner.sub}</span>
                  </span>
                )}
                <span className="slate-body">
                  <span className="slate-title">{s.title}</span>
                  <span className="slate-form mono">{s.form}</span>
                  <span className="slate-line">{s.line}</span>
                  <span className="slate-go">Open the lookbook &rarr;</span>
                </span>
              </Link>
            ) : (
              <div className="slate-link">
                <span className="slate-body">
                  <span className="slate-title">{s.title}</span>
                  <span className="slate-form mono">{s.form}</span>
                  <span className="slate-line">{s.line}</span>
                  <span className="slate-go">Lookbook in preparation</span>
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
