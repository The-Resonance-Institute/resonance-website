import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        {/* WHAT A THUMB NEEDS, part two (2026-09-23). The header nav was padded to a 44 pixel
            target on 2026-09-17 and the footer was left at 20, which a mobile audit found. The
            treatment is deliberately identical to site-nav.tsx: py-3 on each link makes the
            target about 44 pixels, and the negative vertical margin on the row keeps the footer
            the height it was on a pointer. Guarded by test_tap_targets_are_thumb_sized. */}
        <div className="-my-2 flex flex-wrap items-center gap-x-5 gap-y-1">
          {/* BOOKS-FIRST PIVOT, 2026-09-19. MORIS, Demos and Compliance came out with their
              pages. Ask MORIS stays as the one novelty surface and sits last, after the
              institute links, because it is a curiosity rather than a destination. */}
          <Link href="/resonance" className="py-3 transition-colors hover:text-accent">
            The Series
          </Link>
          <Link href="/about" className="py-3 transition-colors hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="py-3 transition-colors hover:text-accent">
            Contact
          </Link>
          <Link href="/privacy" className="py-3 transition-colors hover:text-accent">
            Privacy
          </Link>
          <Link href="/resonance/counsel" className="py-3 transition-colors hover:text-accent">
            Resonant Counsel
          </Link>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <a
            href="mailto:contact@resonanceinstitutellc.com"
            className="-my-2 py-3 transition-colors hover:text-accent"
          >
            contact@resonanceinstitutellc.com
          </a>
          <span className="text-faint">
            © {new Date().getFullYear()} The Resonance Institute, LLC · Huntington Beach
          </span>
        </div>
      </div>
    </footer>
  );
}
