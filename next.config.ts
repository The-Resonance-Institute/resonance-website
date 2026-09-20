import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /moris/shift is a generated static page, not a React route. Every figure on it is produced by
  // the MORIS runtime and written by a generator, so hand-porting it into the site's components
  // would let a number be typed rather than derived -- the one failure that page exists to disprove.
  // It is served from public/ so its stylesheet stays fully isolated from the site's globals, and
  // rewritten here so the URL has no .html on it.
  // /moris/chat is a generated static page, not a React route. It is served from public/ so its
  // stylesheet stays fully isolated from the site's globals, and rewritten here so the URL has no
  // .html on it. ADDING THE FILE IS NOT ADDING THE PAGE: a generated page shipped once without its
  // entry here, answered 200 at the .html path and 404 at the clean one, and the deploy reported
  // success throughout.
  //
  // The shift, judge and pair rewrites were removed in the books-first pivot (2026-09-19) along
  // with the pages themselves; both are under archive/site-2026-09-19/ and the tag
  // pre-books-pivot-2026-09-19.
  async rewrites() {
    return [
      {
        source: "/moris/chat",
        destination: "/moris/chat.html",
      },
      // The side-by-side demonstration, restored 2026-09-19 on the operator's word: one message
      // answered twice by the same model, raw and through MORIS. Same arrangement as chat.
      {
        source: "/moris/pair",
        destination: "/moris/pair.html",
      },
    ];
  },

  // A SHARED EXCHANGE carries noindex as a HEADER as well as in its metadata. The meta tag covers
  // a crawler that parses the page; the header covers everything else that fetches the URL. The
  // first live verification (2026-09-08) found the tag present and the header empty. This route
  // only: the person consented to a public link, not to an indexed one.
  // The unlisted deck. Never linked from any page, never in the sitemap, reachable by direct link
  // only, and kept across the books-first pivot because that link is live in outreach already sent.
  async headers() {
    return [
      // A SHARED EXCHANGE carries noindex as a HEADER as well as in its metadata. The meta tag
      // covers a crawler that parses the page; the header covers everything else that fetches the
      // URL. The first live verification (2026-09-08) found the tag present and the header empty.
      // This route only: the person consented to a public link, not to an indexed one.
      {
        source: "/moris/pair/:id",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      // Documents shared by direct link only (the investor deck), never linked from the site and never
      // in the sitemap. Unlisted, not secret: the repository is public.
      {
        source: "/d/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      // The open letter, unlisted from 2026-09-20 for the same reason: the URL and the PDF beside it
      // are live in outreach already sent. The meta tag covers a crawler that parses the page; this
      // header covers the PDF, which has no metadata to carry one, and anything else that fetches
      // either URL.
      {
        source: "/open-letter",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/open-letter/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  // Book VIII was retitled from "The Two Clocks of Leadership" to "The Two
  // Clocks", so its route changed with it. The old path was live and is in the
  // sitemap Google has already crawled, so it redirects permanently rather than
  // going dark. Retire this entry only once the old URL stops being requested.
  async redirects() {
    return [
      {
        source: "/resonance/book/the-two-clocks-of-leadership",
        destination: "/resonance/book/the-two-clocks",
        permanent: true,
      },
      // BOOKS-FIRST PIVOT, 2026-09-19. The open letter, the compliance page and the MORIS wing were
      // removed and archived. Google has crawled all of these, so they forward to the series rather
      // than going dark across fifteen paths at once. TEMPORARY, every one of them: the material is
      // archived rather than retired, and a permanent redirect is cached by browsers past any
      // change of mind. If any of it comes back, these entries come out.
      //
      // /moris/chat and /moris/pair are NOT here. Both survive the pivot and are still rewritten
      // above, so the wildcard below must spare them. It also has to spare /moris/pair/:id, the
      // shared-exchange route, or every link anyone has shared would forward to the book series.
      // /open-letter and the PDF beside it are NOT redirected. Restored unlisted on 2026-09-20:
      // those links went out in outreach and still have to resolve. /letter is the short form people
      // were told to type, so it forwards there rather than to the series.
      {
        source: "/letter",
        destination: "/open-letter",
        permanent: false,
      },
      {
        source: "/compliance",
        destination: "/resonance",
        permanent: false,
      },
      {
        source: "/moris",
        destination: "/resonance",
        permanent: false,
      },
      {
        source: "/moris/:path((?!chat$|pair$|pair/).*)",
        destination: "/resonance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
