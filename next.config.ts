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
      // /moris/chat and /moris/pair ARE here now (2026-09-23): they forward to askmoris.ai rather
      // than to the series, because the live thing they demonstrated is there. The wildcard below
      // no longer spares them. It still has to spare /moris/pair/:id, the shared-exchange route, or
      // every link anyone has shared would forward away from their own exchange.
      // /open-letter and the PDF beside it are NOT redirected. Restored unlisted on 2026-09-20:
      // those links went out in outreach and still have to resolve. /letter is the short form people
      // were told to type, so it forwards there rather than to the series.
      {
        source: "/letter",
        destination: "/open-letter",
        permanent: false,
      },
      // THE GRAMMAR OF GOD TRILOGY, removed from all forward-facing series information on
      // 2026-09-22 by operator ruling. The Canon is twelve volumes. The manuscripts and the
      // copyright are unaffected and it remains a follow-on after the twelve are in the world, but
      // it does not appear anywhere a reader can see.
      //
      // These four routes were live and in the sitemap, so they forward rather than going dark.
      // TEMPORARY, like the pivot's redirects: the material is withheld, not retired.
      // THE FIRST TRILOGY IS PRESENCE, 2026-09-23. It was Resonance, and that path is already
      // indexed, so this one is PERMANENT rather than temporary: the trilogy did not go away, it
      // was renamed, and the old URL should stop being requested rather than be kept alive.
      {
        source: "/resonance/trilogy/resonance",
        destination: "/resonance/trilogy/presence",
        permanent: true,
      },
      {
        source: "/resonance/trilogy/grammar-of-god",
        destination: "/resonance",
        permanent: false,
      },
      {
        source: "/resonance/book/article-and-noun",
        destination: "/resonance",
        permanent: false,
      },
      {
        source: "/resonance/book/verb-and-adjective",
        destination: "/resonance",
        permanent: false,
      },
      {
        source: "/resonance/book/conjunction-and-punctuation",
        destination: "/resonance",
        permanent: false,
      },
      {
        source: "/compliance",
        destination: "/resonance",
        permanent: false,
      },
      // ONE INSTANCE, ONE URL (2026-09-23). Ask MORIS runs at askmoris.ai. The two static demos
      // that used to be served from public/moris/ are archived under
      // archive/site-2026-09-23-counsel-and-demos/ and their clean URLs forward there, so a link
      // already sent lands on the live thing instead of 404ing or going dark.
      //
      // TEMPORARY, DELIBERATELY. These are 307s, not 308s. A permanent redirect is cached by the
      // browser past any change of mind, and the demos are archived rather than destroyed.
      {
        source: "/moris/chat",
        destination: "https://askmoris.ai",
        permanent: false,
      },
      {
        source: "/moris/pair",
        destination: "https://askmoris.ai",
        permanent: false,
      },
      // /moris/pair/:id IS NOT REDIRECTED, and the wildcard above still spares it. Those are shared
      // exchanges: a visitor consented to a public link to their own exchange and that link went
      // out. Forwarding it to a marketing page would break a promise made to a person, which is a
      // different act from retiring a demo. The route keeps serving the exchange it names.
      //
      // The companion that was going to live at /resonance/counsel was evaluated on 2026-09-23 and
      // not built; the page came down with it. Forward to the series rather than 404, because the
      // URL was in the nav and the sitemap for four days.
      {
        source: "/resonance/counsel",
        destination: "/resonance",
        permanent: false,
      },
      {
        source: "/moris",
        destination: "/resonance",
        permanent: false,
      },
      {
        source: "/moris/:path((?!pair/).*)",
        destination: "/resonance",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
