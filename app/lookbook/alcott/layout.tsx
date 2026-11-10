import { DM_Serif_Display } from "next/font/google";

// The Alcott wears the pitch deck's display face: a 1924 hotel sign, not a crypt.
const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-alcott" });

export default function AlcottLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>;
}
