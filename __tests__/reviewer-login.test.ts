import { afterEach, describe, expect, it, vi } from "vitest";
import {
  checkReviewerCredentials,
  getReviewerLogin,
  sessionCookieName,
} from "@/lib/reviewer-login";

describe("reviewer login", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is off unless both email and a long password are set", () => {
    vi.stubEnv("REVIEWER_EMAIL", "");
    vi.stubEnv("REVIEWER_PASSWORD", "long-enough-password");
    expect(getReviewerLogin()).toBeNull();

    vi.stubEnv("REVIEWER_EMAIL", "reviewer@example.com");
    vi.stubEnv("REVIEWER_PASSWORD", "short");
    expect(getReviewerLogin()).toBeNull();
    expect(checkReviewerCredentials("reviewer@example.com", "short")).toBeNull();
  });

  it("accepts only the configured email and password", () => {
    vi.stubEnv("REVIEWER_EMAIL", "Reviewer@Example.com");
    vi.stubEnv("REVIEWER_PASSWORD", "long-enough-password");

    expect(
      checkReviewerCredentials(" reviewer@example.com ", "long-enough-password")
    ).toBe("reviewer@example.com");
    expect(
      checkReviewerCredentials("reviewer@example.com", "wrong-password-value")
    ).toBeNull();
    expect(
      checkReviewerCredentials("other@example.com", "long-enough-password")
    ).toBeNull();
  });

  it("uses the secure cookie name on https", () => {
    expect(sessionCookieName("https://dm.example.com")).toBe(
      "__Secure-authjs.session-token"
    );
    expect(sessionCookieName("http://localhost:3005")).toBe(
      "authjs.session-token"
    );
  });
});
