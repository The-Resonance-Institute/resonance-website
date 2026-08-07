import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/moris", label: "MORIS" },
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
