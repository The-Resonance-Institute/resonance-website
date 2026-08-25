import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
