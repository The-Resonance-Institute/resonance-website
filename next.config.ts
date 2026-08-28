import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /moris/shift is a generated static page, not a React route. Every figure on it is produced by
  // the MORIS runtime and written by a generator, so hand-porting it into the site's components
  // would let a number be typed rather than derived -- the one failure that page exists to disprove.
  // It is served from public/ so its stylesheet stays fully isolated from the site's globals, and
  // rewritten here so the URL has no .html on it.
  async rewrites() {
    return [
      {
        source: "/moris/shift",
        destination: "/moris/shift.html",
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
    ];
  },
};

export default nextConfig;
