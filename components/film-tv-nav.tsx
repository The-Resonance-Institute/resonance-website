import Link from "next/link";

// FILM & TV, 2026-11-04 (the operator's word: the screen work and Pivot Labs were buried under
// "Stories"). Film & TV has its own header entry, which opens /screen; this row, at the top of
// /screen and /pivot-labs, moves a visitor between the projects and the show. Novels has its own
// header entry and no row.
const FILM_TV = [
  { href: "/screen", label: "Projects" },
  { href: "/pivot-labs", label: "Pivot Labs" },
] as const;

export function FilmTvNav({ current }: { current: (typeof FILM_TV)[number]["href"] }) {
  return (
    <nav aria-label="Film and TV" className="-my-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Film &amp; TV</span>
      {FILM_TV.map((s) =>
        s.href === current ? (
          <span key={s.href} aria-current="page" className="py-3 font-medium text-ink">
            {s.label}
          </span>
        ) : (
          <Link key={s.href} href={s.href} className="py-3 text-muted transition-colors hover:text-accent">
            {s.label}
          </Link>
        ),
      )}
    </nav>
  );
}
