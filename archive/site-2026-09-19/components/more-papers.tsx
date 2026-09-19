import Link from "next/link";
import { PAPERS } from "@/lib/papers";

// The closing block on every paper page: the other published papers, in the same card as /moris.
export function MorePapers({ current }: { current: string }) {
  const others = PAPERS.filter((p) => p.href !== current);
  if (others.length === 0) return null;
  return (
    <section className="mt-12 border-t border-line pt-10 pb-4">
      <h2 className="font-serif text-2xl text-ink">More research</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {others.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group flex flex-col rounded-2xl border border-accent/20 bg-accent-soft p-7 transition-colors hover:border-accent/40"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Paper &middot; {p.date}
            </p>
            <h3 className="mt-2 font-serif text-xl text-ink">{p.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">{p.summary}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-ink">
              Read the paper <span aria-hidden>&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
