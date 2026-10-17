import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted">
        {/* WHAT A THUMB NEEDS, part two (2026-09-23). The header nav was padded to a 44 pixel
            target on 2026-09-17 and the footer was left at 20, which a mobile audit found. The
            treatment is deliberately identical to site-nav.tsx: py-3 on each link makes the
            target about 44 pixels, and the negative vertical margin on the row keeps the footer
            the height it was on a pointer. Guarded by test_tap_targets_are_thumb_sized. */}
        <div className="-my-2 flex flex-wrap items-center gap-x-5 gap-y-1">
          {/* Ask MORIS sits last, after the institute links, because it is a demonstration
              rather than a destination. Since 2026-09-23 it is a single outbound link to
              askmoris.ai: there is no second instance of it in this repository. */}
          {/* THE SAME DESTINATIONS AS THE HEADER, 2026-10-16. The footer still listed only the
              philosophy, from before The Return, the research and VERUS, which a reader's
              review of the site found on the About page and the front door too. Header order. With
              eight links the row needs the full width, so the email and the copyright moved to a
              row of their own beneath it. */}
          <Link href="/the-return" className="py-3 transition-colors hover:text-accent">
            The Return
          </Link>
          <Link href="/resonance" className="py-3 transition-colors hover:text-accent">
            The Philosophy
          </Link>
          {/* VERUS has its own site since 2026-10-17. A plain anchor: a Next Link would route inside this site. */}
          <a href="https://www.verusops.com" className="py-3 transition-colors hover:text-accent">
            VERUS
          </a>
          <Link href="/about" className="py-3 transition-colors hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="py-3 transition-colors hover:text-accent">
            Contact
          </Link>
          <Link href="/research" className="py-3 transition-colors hover:text-accent">
            MORIS Research
          </Link>
          <Link href="/privacy" className="py-3 transition-colors hover:text-accent">
            Privacy
          </Link>
          {/* Outbound, one instance, new tab. See components/site-nav.tsx. */}
          <a
            href="https://askmoris.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 transition-colors hover:text-accent"
          >
            Ask MORIS
          </a>
        </div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="mailto:contact@resonanceinstitutellc.com"
            className="-my-2 py-3 transition-colors hover:text-accent"
          >
            contact@resonanceinstitutellc.com
          </a>
          <span className="text-faint sm:whitespace-nowrap">
            © {new Date().getFullYear()} The Resonance Institute, LLC · Huntington Beach
          </span>
        </div>
      </div>
    </footer>
  );
}
