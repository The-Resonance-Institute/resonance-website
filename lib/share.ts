import type { Metadata } from "next";

// EVERY PAGE LEADS ITS OWN LINK PREVIEW, 2026-10-16, from a reader's review of the site. Next.js
// replaces the layout's openGraph and twitter objects rather than merging into them, so a page that
// set only its title and description was still shared as "The Resonance Institute" with the
// layout's description. A link to See VERUS read as a card about the books. This helper gives a page
// its own pair: the page's title and description lead, siteName stays The Resonance Institute, and
// type and url are repeated because the replaced object drops them. SO ARE THE IMAGES: a file-convention
// opengraph-image serves its own segment, and a child page that sets openGraph stops inheriting the
// parent's picture, so See VERUS would have gone out with no picture at all. The VERUS pages carry the
// VERUS logo (the same file as app/verus/opengraph-image.jpg); everything else carries the site's.
const SITE = "https://www.resonanceinstitutellc.com";
const VERUS_IMAGE = {
  url: "/verus/verus-logo.jpg",
  width: 1200,
  height: 670,
  alt: "VERUS, operational intelligence: a steel V whose right stroke, in light blue, rises into an arrow.",
};
const SITE_IMAGE = { url: "/opengraph-image.png", width: 1200, height: 630, alt: "The Resonance Institute" };
const SITE_TWITTER_IMAGE = { ...SITE_IMAGE, url: "/twitter-image.png" };

export function share(path: string, page: { title: string; description: string }): Metadata {
  const verus = path === "/verus" || path.startsWith("/verus/");
  return {
    title: page.title,
    description: page.description,
    openGraph: {
      type: "website",
      url: `${SITE}${path}`,
      siteName: "The Resonance Institute",
      title: page.title,
      description: page.description,
      images: [verus ? VERUS_IMAGE : SITE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [verus ? VERUS_IMAGE : SITE_TWITTER_IMAGE],
    },
  };
}
