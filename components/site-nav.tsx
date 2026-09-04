import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/moris", label: "MORIS" },
  // Both demos were reachable only by hunting: the agentic record sat eighth on a sub-page and the
  // chat surface was linked from nowhere at all. A nav entry is the fix, and it points at a hub
  // rather than at one of them, because a single link cannot serve two demonstrations.
  { href: "/moris/demos", label: "Demos" },
  // Compliance sits between the demonstrations and the philosophy on purpose: it is what a
  // regulator or a buyer looks for after seeing the demos and before reading the books.
  { href: "/compliance", label: "Compliance" },
  { href: "/resonance", label: "The Series" },
  { href: "/resonance/series", label: "The Books" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-ink transition-colors hover:text-accent"
        >
          <Image
            src="/star.png"
            alt=""
            width={20}
            height={20}
            priority
            className="translate-y-[-1px]"
          />
          <span className="font-serif text-lg tracking-tight">
            The Resonance Institute
          </span>
        </Link>
        <div className="flex items-center gap-6 text-sm text-muted">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
