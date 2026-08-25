import type { MetadataRoute } from "next";
import { books, trilogies } from "@/lib/canon";

const base = "https://www.resonanceinstitutellc.com";

// Static routes, listed by hand because each one is authored. The book and
// trilogy routes below are derived from lib/canon, the same source that
// generates the pages, so adding a volume cannot leave the sitemap behind.
const staticRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/moris", priority: 0.9 },
  { path: "/moris/problem", priority: 0.8 },
  { path: "/moris/conscience", priority: 0.8 },
  { path: "/moris/consequences", priority: 0.8 },
  { path: "/moris/evidence", priority: 0.8 },
  { path: "/moris/platform", priority: 0.8 },
  { path: "/moris/proof", priority: 0.8 },
  { path: "/moris/paper", priority: 0.8 },
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
