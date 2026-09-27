import { randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Password sign-in for a single app reviewer account.
 *
 * Meta App Review asks for credentials a reviewer can use to reach the app,
 * and a magic link cannot work for them because they never see our inbox.
 * Setting REVIEWER_EMAIL and REVIEWER_PASSWORD turns on this one account;
 * leaving either unset keeps sign-in magic-link only.
 */
export function getReviewerLogin(): { email: string; password: string } | null {
  const email = process.env.REVIEWER_EMAIL?.trim().toLowerCase();
  const password = process.env.REVIEWER_PASSWORD ?? "";
  if (!email || password.length < 12) return null;
  return { email, password };
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Returns the reviewer email when the credentials match, otherwise null. */
export function checkReviewerCredentials(
  email: string,
  password: string
): string | null {
  const reviewer = getReviewerLogin();
  if (!reviewer) return null;
  const emailMatches = safeEqual(email.trim().toLowerCase(), reviewer.email);
  const passwordMatches = safeEqual(password, reviewer.password);
  return emailMatches && passwordMatches ? reviewer.email : null;
}

export function newSessionToken(): string {
  return randomBytes(32).toString("hex");
}

/** Cookie name Auth.js reads for a database session. */
export function sessionCookieName(baseUrl: string): string {
  return baseUrl.startsWith("https://")
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";
}
