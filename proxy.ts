import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, isValidToken } from "@/lib/lookbook/auth";

// THE LOOKBOOK GATE, 2026-11-10. Runs only on /lookbook (pages and their images) and nowhere else on
// the site. A visitor without a valid session cookie is sent to /lookbook/login. Every lookbook
// response is also marked noindex as a header, not only in metadata. See lib/lookbook/auth.ts.

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === "/lookbook/login") {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    return res;
  }

  if (await isValidToken(req.cookies.get(AUTH_COOKIE)?.value)) {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    res.headers.set("Referrer-Policy", "no-referrer");
    return res;
  }

  const url = req.nextUrl.clone();
  url.pathname = "/lookbook/login";
  url.search = "";
  if (pathname !== "/lookbook") url.searchParams.set("next", pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/lookbook", "/lookbook/:path*"],
};
