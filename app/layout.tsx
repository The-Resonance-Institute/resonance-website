import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.resonanceinstitutellc.com"),
  title: {
    default: "The Resonance Institute",
    template: "%s · The Resonance Institute",
  },
  description:
    "An independent studio for rigorous philosophical thought where enduring questions meet modern technology, home to two bodies of work: the Resonance series, a living philosophy in fifteen manuscripts, and MORIS, an artificial conscience: a mechanical, deterministic control plane for moral thought.",
  applicationName: "The Resonance Institute",
  keywords: [
    "The Resonance Institute",
    "Resonance series",
    "MORIS",
    "artificial conscience",
    "C. T. Herndon",
    "philosophy",
    "AI safety",
  ],
  openGraph: {
    type: "website",
    url: "https://www.resonanceinstitutellc.com",
    siteName: "The Resonance Institute",
    title: "The Resonance Institute",
    description:
      "An independent studio for rigorous philosophical thought. Two bodies of work: the Resonance series, a living philosophy in fifteen manuscripts, and MORIS, an artificial conscience: a mechanical, deterministic control plane for moral thought.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Resonance Institute",
    description:
      "An independent studio for rigorous philosophical thought. The Resonance series and MORIS, an artificial conscience: a mechanical, deterministic control plane for moral thought.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Resonance Institute",
              url: "https://www.resonanceinstitutellc.com",
              description:
                "An independent studio for rigorous philosophical thought, home to the Resonance series and MORIS, an artificial conscience: a mechanical, deterministic control plane for moral thought.",
              founder: { "@type": "Person", name: "Christopher T. Herndon" },
              location: {
                "@type": "Place",
                name: "Huntington Beach, California",
              },
            }),
          }}
        />
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
