import Link from "next/link";
import Image from "next/image";

// BOOKS-FIRST PIVOT, 2026-09-19. The Series leads. MORIS, the open letter and the compliance page
// came out of the nav with the pages themselves; all of it is under archive/site-2026-09-19/ and the
// tag pre-books-pivot-2026-09-19, and it may come back.
//
// Ask MORIS is last and is the only MORIS surface left on the site: a novelty, a way to put a
// question to a language model through the lens of the series, not a product entry.
const links = [
  { href: "/resonance", label: "The Series" },
  { href: "/resonance/series", label: "Manuscripts" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/moris/chat", label: "Ask MORIS" },
];

// THE ROW WRAPS ON NARROW SCREENS (2026-09-15). The brand and seven links were one unbreakable flex
// row, so at phone width the links ran past the right edge and every page scrolled sideways, with the
// brand text wrapping into the first link. Now the brand keeps its line, the links drop to a second
// row and wrap among themselves, and nothing is hidden behind a menu button. The static demo pages in
// public/moris/ carry their own copy of this nav with the same wrapping rule.
export function SiteNav() {
  return (
    <header className="border-b border-line">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-ink transition-colors hover:text-accent"
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
        {/* WHAT A THUMB NEEDS (2026-09-17). Measured on the live site at 375 by 812: eight links,
            each 20 pixels tall, wrapping into two rows with an 8 pixel gap between them, so
            "Manuscripts" sat directly under "MORIS" with almost nothing between. Nothing overflowed
            and nothing looked wrong; it was simply hard to hit the one you meant. The links now
            carry vertical padding, which makes each target about 44 pixels and separates the rows,
            and the negative vertical margin keeps the header the height it was on a pointer.
            The static demo pages in public/moris/ carry their own copy of this nav. */}
        <div className="-my-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted sm:gap-x-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-3 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
