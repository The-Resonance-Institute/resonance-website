import { Big_Shoulders } from "next/font/google";

// Alma Mater's display voice: a condensed industrial grotesque, closer to stadium
// signage and a coal company's stenciled lettering than to Cinzel.
const shoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
  variable: "--f-alma-mater-display",
});

export default function AlmaMaterLayout({ children }: { children: React.ReactNode }) {
  return <div className={shoulders.variable}>{children}</div>;
}
