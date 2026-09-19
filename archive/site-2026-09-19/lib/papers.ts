// The published papers, one list so every surface that names them says the same thing. Each DOI is
// the Zenodo concept DOI (all versions), never a version DOI. Add a paper here and it appears on
// /moris and in the "more research" block on every paper page.

export type Paper = {
  href: string;
  title: string;
  subtitle: string;
  date: string;
  doi: string;
  summary: string;
  citation: string;
};

export const PAPERS: Paper[] = [
  {
    href: "/moris/paper",
    title: "An Artificial Conscience",
    subtitle: "Deterministic moral judgment as a gradient, measured against a public corpus.",
    date: "August 2026",
    doi: "10.5281/zenodo.21936444",
    summary:
      "A deterministic conscience measured against 680 public moral dilemmas people disagreed on. It governed 92.6% of the cases it judged, with no model in the judgment.",
    citation:
      "Herndon, C. T. (2026). An Artificial Conscience: Deterministic moral judgment as a gradient, measured against a public corpus. Zenodo. https://doi.org/10.5281/zenodo.21936444",
  },
  {
    href: "/moris/absent-party",
    title: "Absent-Party Harm",
    subtitle: "Model-originated guidance against someone who is not represented.",
    date: "September 2026",
    doi: "10.5281/zenodo.22801949",
    summary:
      "Four production models advised working against someone not in the conversation in 8.7% of answers, unprompted. With MORIS in front of the same models, 2.0%. Pre-registered.",
    citation:
      "Herndon, C. T. (2026). Absent-Party Harm: Model-Originated Guidance Against Someone Who Is Not Represented. Zenodo. https://doi.org/10.5281/zenodo.22801949",
  },
];

export function paper(href: string): Paper {
  const p = PAPERS.find((x) => x.href === href);
  if (!p) throw new Error(`no paper at ${href}`);
  return p;
}
