import { NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/lookbook/auth";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/lookbook/login", req.url), 303);
  res.cookies.delete(AUTH_COOKIE);
  return res;
}
