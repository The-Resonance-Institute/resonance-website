import type { MetadataRoute } from "next";
import { books, trilogies } from "@/lib/canon";

const base = "https://www.resonanceinstitutellc.com";

// Static routes, listed by hand because each one is authored. The book and
// trilogy routes below are derived from lib/canon, the same source that
// generates the pages, so adding a volume cannot leave the sitemap behind.
const staticRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  // BOOKS-FIRST PIVOT, 2026-09-19. The open letter, the compliance page and the whole MORIS wing
  // came out of the sitemap with the pages. Every one of those URLs now redirects to /resonance
  // (next.config.ts), so a crawler that already has them gets a forward rather than a 404.
  //
  // 2026-09-23: /moris/chat and /moris/pair came out too. The MORIS demos are frozen and stay
  // reachable at their own URLs, but they are no longer part of the series site and the series
  // pages do not link to them, so they do not belong in this sitemap.
  { path: "/resonance/counsel", priority: 0.7 },
  { path: "/resonance", priority: 0.9 },
  { path: "/resonance/series", priority: 0.8 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const authored = staticRoutes.map(({ path, priority }) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const trilogyRoutes = trilogies.map((t) => ({
    url: `${base}/resonance/trilogy/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const bookRoutes = books.map((b) => ({
    url: `${base}/resonance/book/${b.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...authored, ...trilogyRoutes, ...bookRoutes];
}
