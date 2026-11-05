import Link from "next/link";

// THE FOOTER HOLDS THREE THINGS, 2026-11-04 (the approved build map): the copyright line, the privacy
// page and the contact address. It no longer repeats the header, and it holds NO LIST OF OTHER SITES:
// each outside site is linked only from the page about it (verusops.com from VERUS, askmoris.ai from
// Research, jackmaddoxbooks.com from Novels, YouTube from Pivot Labs). It renders from the root
// layout, so every page carries it, the philosophy's volume pages included.
//
// WHAT A THUMB NEEDS (2026-09-23). py-3 on each link makes the target about 44 pixels on a phone, and
// the negative vertical margin on the row keeps the footer the height it was on a pointer. Guarded by
// test_tap_targets_are_thumb_sized.
export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="text-faint sm:whitespace-nowrap">
          © {new Date().getFullYear()} The Resonance Institute, LLC · Huntington Beach
        </span>
        <div className="-my-2 flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link href="/privacy" className="py-3 transition-colors hover:text-accent">
            Privacy
          </Link>
          <Link href="/contact" className="py-3 transition-colors hover:text-accent">
            Contact
          </Link>
          <a
            href="mailto:contact@resonanceinstitutellc.com"
            className="py-3 transition-colors hover:text-accent"
          >
            contact@resonanceinstitutellc.com
          </a>
        </div>
      </div>
    </footer>
  );
}
