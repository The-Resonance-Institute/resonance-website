import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What this site collects, which is almost nothing: no analytics, no cookies, no tracking, no forms, no accounts. Server access logs are kept by the host, Vercel. Nothing is sold or shared.",
};

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-6">
      <section className="pt-20 pb-8 sm:pt-24">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          Privacy
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Privacy policy
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated August 11, 2026.</p>
        <p className="mt-6 font-serif text-xl font-light leading-relaxed text-ink">
          This is a static informational site. It collects almost nothing about you, and this
          policy states exactly what that means rather than pad it with terms that do not apply
          here.
        </p>
      </section>

      <section className="border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Who operates this site</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The Resonance Institute, LLC, in Huntington Beach, California. For any question about
          this policy or your privacy, email{" "}
          <a
            href="mailto:contact@resonanceinstitutellc.com"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            contact@resonanceinstitutellc.com
          </a>
          .
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">What we collect: nothing, directly</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The site has no analytics, no advertising or tracking pixels, no cookies, and no
          accounts or logins. There are no forms that submit data to us. The contact links open
          your own email program with our address filled in; we receive a message only if you
          choose to send one, and then only the email you sent. We do not build profiles, and we
          set nothing on your device.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Server logs</h2>
        <p className="mt-3 leading-relaxed text-muted">
          The site is hosted on Vercel, which keeps standard server access logs when a page is
          requested: your IP address, the time, the page requested, and your browser&rsquo;s
          user-agent string. Vercel retains these for a limited period to operate and secure the
          service. We do not add our own logging on top of that, and we do not use these logs to
          identify you.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Third parties</h2>
        <p className="mt-3 leading-relaxed text-muted">
          One: Vercel, our hosting and content-delivery provider, which serves the pages and keeps
          the logs described above. The fonts are bundled into the site at build time and served
          from our own domain, so your browser makes no font request to any third party. No other
          third-party services, embeds, trackers, or scripts load on this site.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">We do not sell or share</h2>
        <p className="mt-3 leading-relaxed text-muted">
          We do not sell, rent, trade, or otherwise share personal information with anyone. There
          is nothing collected here to sell.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">California privacy rights</h2>
        <p className="mt-3 leading-relaxed text-muted">
          Under the California Consumer Privacy Act, as amended (the CCPA and CPRA), California
          residents may request to know what personal information a business has collected, to have
          it deleted or corrected, and to opt out of its sale or sharing. We do not sell or share
          personal information, and we collect none directly beyond the host logs above, so there
          is little to act on. You may still exercise any of these rights by emailing{" "}
          <a
            href="mailto:contact@resonanceinstitutellc.com"
            className="text-accent underline decoration-line underline-offset-2 hover:decoration-accent"
          >
            contact@resonanceinstitutellc.com
          </a>
          . We will not discriminate against you for exercising them.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Children</h2>
        <p className="mt-3 leading-relaxed text-muted">
          This site is not directed to children under 13, and we do not knowingly collect any
          information from them.
        </p>
      </section>

      <section className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">Changes</h2>
        <p className="mt-3 leading-relaxed text-muted">
          If this policy changes, we will update it here and revise the date at the top.
        </p>
      </section>
    </div>
  );
}
