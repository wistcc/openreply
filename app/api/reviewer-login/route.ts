import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/client";
import { getBaseUrl } from "@/lib/env";
import {
  checkReviewerCredentials,
  newSessionToken,
  sessionCookieName,
} from "@/lib/reviewer-login";
import { ensureWorkspaceForUser } from "@/lib/workspace";

const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

export async function POST(request: NextRequest) {
  const baseUrl = getBaseUrl();
  const form = await request.formData().catch(() => null);
  const email = checkReviewerCredentials(
    String(form?.get("email") ?? ""),
    String(form?.get("password") ?? "")
  );

  if (!email) {
    // Slow down guessing; there is only one account behind this form.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return NextResponse.redirect(`${baseUrl}/login?reviewer=invalid`, 303);
  }

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, emailVerified: new Date() },
  });
  await ensureWorkspaceForUser(user.id, user.email);

  const sessionToken = newSessionToken();
  const expires = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  await prisma.session.create({
    data: { sessionToken, userId: user.id, expires },
  });

  const response = NextResponse.redirect(`${baseUrl}/dashboard`, 303);
  response.cookies.set(sessionCookieName(baseUrl), sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: baseUrl.startsWith("https://"),
    path: "/",
    expires,
  });
  return response;
}
