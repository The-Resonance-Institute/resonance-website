import { NextResponse } from "next/server";
import { AUTH_COOKIE, SESSION_DAYS, isValidToken, safeNext, tokenFor } from "@/lib/lookbook/auth";

// Sign in to the lookbooks. See lib/lookbook/auth.ts for why only a fingerprint is in the code.
export async function POST(req: Request) {
  const form = await req.formData();
  const attempt = String(form.get("password") ?? "").trim();
  const next = safeNext(String(form.get("next") ?? "/lookbook"));
  const origin = new URL(req.url).origin;
  const token = attempt ? await tokenFor(attempt) : "";

  if (!(await isValidToken(token))) {
    const back = new URL("/lookbook/login", origin);
    back.searchParams.set("error", "1");
    if (next !== "/lookbook") back.searchParams.set("next", next);
    return NextResponse.redirect(back, 303);
  }

  const res = NextResponse.redirect(new URL(next, origin), 303);
  res.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return res;
}
