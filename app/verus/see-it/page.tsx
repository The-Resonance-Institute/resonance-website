import type { Metadata } from "next";
import { share } from "@/lib/share";
import Link from "next/link";
import { VerusExplainer } from "@/components/verus-explainer";
import { VerusNav, VerusNext } from "@/components/verus-nav";

// PROJECT VERUS, SEE IT, 2026-10-13. No VERUS runs on the web (agreed 2026-10-12): it is shown live, by request,
// on the demonstration group or, under an agreement, on a copy of a company's own data inside its network. The
// request is a prefilled mail to the one inbox, as The Return's notify buttons are, and for the reasons the
// contact page records: no form, no vendor in between.

export const metadata: Metadata = share("/verus/see-it", {
  title: "See VERUS",
  description:
    "Meet VERUS in one minute, then see it run: a live demonstration on the demonstration group, or on a copy of your own data inside your own network.",
});

const EMAIL = "contact@resonanceinstitutellc.com";
const ASK = `mailto:${EMAIL}?subject=${encodeURIComponent("Project VERUS demonstration")}`;
const link = "text-accent underline decoration-line hover:decoration-accent";

export default function SeeIt() {
  return (
    <>
      <VerusNav current="/verus/see-it" />
      <div className="mx-auto max-w-3xl px-6 pb-20">
        <section className="pt-16 pb-10 sm:pt-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Project VERUS</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">See it</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            The best way to judge VERUS is to watch it run on a plant like yours.
          </p>
        </section>

        <section id="watch" className="scroll-mt-6 border-t border-line pt-10">
          <h2 className="font-serif text-2xl text-ink">Meet VERUS, in one minute</h2>
          <div className="mt-6">
            <VerusExplainer />
          </div>
        </section>

        {/* THE REAL PRODUCT (2026-10-16, on the operator's word). The film above is drawn; this is VERUS itself,
            captured from the demonstration and made in the video project (video/, Walkthrough). Muted, with its
            captions on screen, so it needs no sound; it loads only when played. */}
        <section id="walkthrough" className="mt-14 scroll-mt-6 border-t border-line pt-10">
          <h2 className="font-serif text-2xl text-ink">Inside the real product</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            A minute and a half of VERUS itself on its demonstration company: a plant manager&rsquo;s morning, the
            robot showing the way, an agent described in one sentence, and the owner&rsquo;s view.
          </p>
          <video
            className="mt-6 w-full rounded-2xl border border-line bg-[#0b1426] shadow-sm"
            controls
            playsInline
            preload="none"
            poster="/verus/verus-walkthrough-poster.jpg"
            aria-label="A walk through VERUS on its demonstration company"
          >
            <source src="/verus/verus-walkthrough.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="mt-14 space-y-5 border-t border-line pt-10 text-lg leading-relaxed text-ink">
          <h2 className="font-serif text-2xl text-ink">A live demonstration</h2>
          <p>
            Twenty minutes, on the demonstration group: a system connected cold, the questions it asks, the data
            findings, a dashboard, a question in plain words, a finding with its plan, an agent from a sentence, an
            answer from the quality manual, and the morning brief. For an owner or a board, it starts from the
            owner&rsquo;s view of both companies.
          </p>
          <p>
            Once an agreement is in place, it can run on a copy of your own data, inside your own network.
          </p>
          <p>
            <a
              href={ASK}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0b5f58]"
            >
              Ask for a demonstration
            </a>
          </p>
          <p className="text-base text-muted">
            Or write to <span className="select-all text-ink">{EMAIL}</span>. It reaches me directly.
          </p>
        </section>

        <section className="mt-14 border-t border-line pt-10 leading-relaxed text-ink">
          <h2 className="font-serif text-2xl text-ink">Before you ask</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <strong>Your data does not leave your network.</strong> VERUS runs inside it, and it only reads.
            </li>
            <li>
              <strong>No model is required to start.</strong> The data findings, dashboards and confirmed metrics work
              without one.
            </li>
            <li>
              <strong>It is in development.</strong>{" "}
              <Link href="/verus/evidence" className={link}>
                The evidence
              </Link>{" "}
              says exactly what has been measured, and when.
            </li>
          </ul>
          <p className="mt-6">
            <Link href="/verus/inside" className={link}>
              Inside VERUS
            </Link>{" "}
            shows still pictures of the demonstration, and{" "}
            <Link href="/verus/how-it-works" className={link}>
              How it works
            </Link>{" "}
            walks through it step by step.
          </p>
        </section>

        <VerusNext items={[{ href: "/verus", label: "What it is" }]} />
      </div>
    </>
  );
}
