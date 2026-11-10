// THE LOOKBOOK PASSWORD, 2026-11-10. The four screen lookbooks live under /lookbook behind one
// password. THIS REPOSITORY IS PUBLIC, so the password itself is never in it. What is here is a
// fingerprint: SHA-256 of the session token, where the token is SHA-256 of a fixed prefix and the
// password. Checking a visitor's cookie needs only the fingerprint; producing a valid cookie needs
// the password. The password is long and random (about 78 bits), so guessing it from the
// fingerprint is not practical.
//
// TO CHANGE THE PASSWORD without a code change, set LOOKBOOK_TOKEN_CHECK in the host's environment
// to the new fingerprint (sha256(sha256("resonance-lookbook:v1:" + password)) as hex). Changing it
// signs everyone out. The operator keeps the password itself in his own files, never here.
//
// The lookbooks hold pitch material only. The scripts are not on this site; they are sent on request.

export const AUTH_COOKIE = "lookbook_session";
export const SESSION_DAYS = 14;
const PREFIX = "resonance-lookbook:v1:";
const DEFAULT_CHECK = "dd1e0c67ec5a32e4b62d392c5e2989322531fa9df5624a8aae6440069ea764cd";

export function tokenCheck(): string {
  return (process.env.LOOKBOOK_TOKEN_CHECK || DEFAULT_CHECK).trim().toLowerCase();
}

async function sha256hex(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function tokenFor(password: string): Promise<string> {
  return sha256hex(PREFIX + password);
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token || !/^[0-9a-f]{64}$/.test(token)) return false;
  return safeEqual(await sha256hex(token), tokenCheck());
}

export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Only allow redirects back into the lookbooks.
export function safeNext(next: string | null | undefined): string {
  if (!next || !next.startsWith("/lookbook") || next.startsWith("//")) return "/lookbook";
  return next;
}
