import { Cormorant_Garamond } from "next/font/google";

// The Unfinished speaks in a lighter, more humane voice than Cinzel: exposed as --f-unf.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--f-unf",
});

export default function UnfinishedLayout({ children }: { children: React.ReactNode }) {
  return <div className={cormorant.variable}>{children}</div>;
}
