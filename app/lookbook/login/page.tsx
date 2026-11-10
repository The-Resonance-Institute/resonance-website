import type { Metadata } from "next";
import { safeNext } from "@/lib/lookbook/auth";
import { share } from "@/lib/share";

export const metadata: Metadata = {
  ...share("/lookbook/login", { title: "Lookbooks", description: "Private lookbooks for the Film & TV projects. Available on request." }),
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  return (
    <div className="login">
      <form className="login-card" method="post" action="/api/lookbook/login">
        <p className="eyebrow">Private. Not for distribution.</p>
        <h1 className="login-title">C. T. Herndon</h1>
        <p className="login-sub">Film &amp; TV lookbooks</p>
        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          className="login-input"
        />
        <input type="hidden" name="next" value={safeNext(next)} />
        {error === "1" && <p className="login-error">That password didn&rsquo;t match.</p>}
        <button type="submit" className="btn btn-gold">
          Enter
        </button>
        <p className="login-help">
          No password? <a href="/screen">Request the pitch</a> from the Film &amp; TV page.
        </p>
      </form>
    </div>
  );
}
