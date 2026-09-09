import type { Metadata } from "next";
import { notFound } from "next/navigation";

// A SHARED EXCHANGE. Operator's ruling, 2026-09-08: the consent exception, demo only. The person who
// asked pressed a button whose own surface said their message and both answers would be stored on
// our servers at a public link for thirty days. This page is a fetch of that row and nothing more:
// no mechanism, no reading, no judgment happens here. It is read at request time (the row can be
// deleted at any moment by its owner or by the Institute), carries noindex, is in no sitemap, and
// its link preview is the same for every shared page so a feed never carries the person's words.
export const dynamic = "force-dynamic";

const API = "https://resonance-api-hazel.vercel.app/api/pair/share/";

// The roster the pair page offers, by the model id the service reports as having answered. An id not
// listed here is shown as itself rather than renamed.
const SEAT_NAMES: Record<string, string> = {
  "claude-haiku-4-5-20251001": "Haiku 4.5",
  "moonshotai/kimi-k2": "Kimi K2",
  "openai/gpt-4o": "GPT-4o",
  "x-ai/grok-4.3": "Grok 4.3",
  "google/gemini-3.1-flash-lite": "Gemini 3.1 Flash Lite",
};

const DISCLOSURE =
  "Output is generated automatically and may be inaccurate. Not advice of any kind, and no liability is accepted for it. This page is not monitored. If you are in crisis, please reach a person: in the US call or text 988, or your local emergency number.";

type Shared = {
  id: string;
  created_at: string;
  expires_at: string;
  message: string;
  raw_answer: string;
  governed_answer: string;
  seat: string;
  reader: string;
  verdict: string;
  concern_mass: number;
  concern_count: number;
  considerations_total: number;
  blank_count: number;
  exchange_id: string;
};

// GENERIC ON PURPOSE. The preview a feed or a chat app renders for this link names the demonstration
// and never the exchange: no title from the message, no description from an answer. This function
// takes no params and reads nothing, so it cannot leak what it never saw.
export async function generateMetadata(): Promise<Metadata> {
  const title = "Two answers, one conscience";
  const description =
    "One message, put to the same model twice: once with nothing in front of it, once under MORIS. Shared by the person who asked it.";
  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

function label(model: string): string {
  return SEAT_NAMES[model] ?? model;
}

function when(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

function Answer({ text }: { text: string }) {
  // The answer as the model wrote it, paragraphs on blank lines, any markdown left as written and
  // shown as text. The page adds nothing and takes nothing away.
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (!paras.length) return <p className="text-muted">The model returned nothing.</p>;
  return (
    <>
      {paras.map((p, i) => (
        <p key={i} className="whitespace-pre-wrap leading-relaxed text-ink">
          {p}
        </p>
      ))}
    </>
  );
}

export default async function SharedPair({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{32}$/.test(id)) notFound();
  let row: Shared | null = null;
  try {
    const res = await fetch(API + id, { cache: "no-store" });
    if (res.ok) row = (await res.json()) as Shared;
  } catch {
    row = null;
  }
  if (!row) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6">
      <section className="pt-10 pb-8 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">A shared exchange</p>
        <h1 className="mt-6 font-serif text-4xl text-ink sm:text-5xl">Two answers, one conscience</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">
          One message, put to {label(row.seat)} twice: once with nothing in front of it, once under
          MORIS. The message was read once and judged once, and both answers came from that single
          reading, so the two columns differ by the conscience and by nothing else. Read by{" "}
          {label(row.reader)}.
        </p>
        <blockquote className="mt-8 max-w-2xl border-l-2 border-accent pl-5 font-serif text-2xl leading-snug text-ink">
          {row.message}
        </blockquote>
      </section>

      <section className="grid gap-8 border-t border-line pt-8 md:grid-cols-2 md:gap-10">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">
            Raw feed <span className="font-normal normal-case tracking-normal text-muted">&middot; nothing between the model and you</span>
          </p>
          <div className="mt-4 space-y-4">
            <Answer text={row.raw_answer} />
          </div>
        </div>
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">
            MORIS <span className="font-normal normal-case tracking-normal text-muted">&middot; the same model with MORIS</span>
          </p>
          <p className="mt-2 font-mono text-xs text-accent">
            {row.verdict} &middot; concern mass {row.concern_mass.toFixed(4)} &middot; {row.concern_count} of{" "}
            {row.considerations_total} considerations weighed &middot; {row.blank_count} of the 9 structural fields
            not stated
          </p>
          <div className="mt-4 space-y-4">
            <Answer text={row.governed_answer} />
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-line pt-8">
        <a
          href="/moris/pair"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-ink"
        >
          Run your own, against the model you choose <span aria-hidden>&rarr;</span>
        </a>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          Shared by the person who asked it, on their own say-so. This page deletes itself on{" "}
          {when(row.expires_at)}. The person can delete it sooner from the browser they shared it from,
          and the Institute can delete it by its id. Exchange {row.exchange_id}.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{DISCLOSURE}</p>
      </section>
    </div>
  );
}
