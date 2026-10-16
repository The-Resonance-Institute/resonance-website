import Link from "next/link";

// PROJECT VERUS, 2026-10-13, on the operator's word. The section's own small menu, under the site header: five
// pages a reader moves between (seven since 2026-10-16: What it's for after What it is, Pricing before See it). The section is "Project VERUS" until its first customer is live; then the word
// Project comes off, and the URLs under /verus stay as they are.
export const VERUS_PAGES = [
  { href: "/verus", label: "What it is" },
  { href: "/verus/what-its-for", label: "What it's for" },
  { href: "/verus/how-it-works", label: "How it works" },
  { href: "/verus/inside", label: "Inside VERUS" },
  { href: "/verus/evidence", label: "The evidence" },
  { href: "/verus/pricing", label: "Pricing" },
  { href: "/verus/see-it", label: "See it" },
] as const;

export function VerusNav({ current }: { current: (typeof VERUS_PAGES)[number]["href"] }) {
  return (
    <nav aria-label="Project VERUS" className="border-b border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-0 px-6 text-sm">
        <span className="py-3 pr-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">Project VERUS</span>
        {VERUS_PAGES.map((p) =>
          p.href === current ? (
            <span key={p.href} aria-current="page" className="py-3 font-medium text-ink">
              {p.label}
            </span>
          ) : (
            <Link key={p.href} href={p.href} className="py-3 text-muted transition-colors hover:text-accent">
              {p.label}
            </Link>
          ),
        )}
      </div>
    </nav>
  );
}

// Where to go next, at the foot of each page.
export function VerusNext({ items }: { items: { href: string; label: string }[] }) {
  return (
    <section className="mt-14 flex flex-wrap gap-4 border-t border-line pt-10">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {i.label} <span aria-hidden>&rarr;</span>
        </Link>
      ))}
    </section>
  );
}
