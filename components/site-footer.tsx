import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link href="/moris" className="transition-colors hover:text-accent">
            MORIS
          </Link>
          {/* Demos and Compliance were in the top nav and not here, and the footer is the only
              navigation that appears on every page including the essays. The box is what converts,
              and a reader who has just been convinced by an essay had nowhere to go from the bottom
              of it. Compliance is the page a regulator or a buyer looks for, and those readers
              scroll. The Books stays out: it is a child of The Series and the footer needs one. */}
          <Link href="/moris/demos" className="transition-colors hover:text-accent">
            Demos
          </Link>
          <Link href="/compliance" className="transition-colors hover:text-accent">
            Compliance
          </Link>
          <Link href="/resonance" className="transition-colors hover:text-accent">
            The Series
          </Link>
          <Link href="/about" className="transition-colors hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-accent">
            Contact
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-accent">
            Privacy
          </Link>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <a
            href="mailto:contact@resonanceinstitutellc.com"
            className="transition-colors hover:text-accent"
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
