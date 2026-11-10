import type { Metadata } from "next";
import { Cinzel, Source_Serif_4, IBM_Plex_Mono, Courier_Prime } from "next/font/google";
import "./lookbook.css";

// THE LOOKBOOKS, 2026-11-10. Private pitch lookbooks for the four Film & TV projects, behind one
// password (proxy.ts, lib/lookbook/auth.ts). Out of the index: noindex here and as a header, not in
// the sitemap, not in the header nav. The public face of these projects is /screen; a lookbook link
// and the password go out on request, with the pitch. No scripts here: they are sent on request.
// Everything inside renders within .lookbook so its styles never reach the rest of the site.

const display = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--f-display" });
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600"], style: ["normal", "italic"], variable: "--f-serif" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--f-mono" });
const script = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], variable: "--f-script" });

export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function LookbookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`lookbook ${display.variable} ${serif.variable} ${mono.variable} ${script.variable}`}>
      {children}
    </div>
  );
}
