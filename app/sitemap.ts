import type { MetadataRoute } from "next";

const base = "https://www.resonanceinstitutellc.com";

const routes = [
  "",
  "/about",
  "/contact",
  "/moris",
  "/moris/problem",
  "/moris/conscience",
  "/moris/consequences",
  "/moris/evidence",
  "/moris/platform",
  "/resonance",
  "/resonance/series",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
