// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";

// An in-memory database for this test file only.
process.env.PGLITE_DIR = "memory";

const { db } = await import("./db");
const { runMigrations } = await import("./db/migrate");
const { auth } = await import("./auth");

describe("accounts", () => {
  beforeAll(async () => {
    await runMigrations(db);
  });

  it("creates an account with email and password, then finds its session", async () => {
    const signUp = await auth.api.signUpEmail({
      body: {
        name: "Anthony",
        email: "anthony@example.com",
        password: "a-long-enough-password",
      },
      asResponse: true,
    });
    expect(signUp.status).toBe(200);
    const cookie = signUp.headers.get("set-cookie");
    expect(cookie).toContain("better-auth.session_token");

    const session = await auth.api.getSession({
      headers: new Headers({ cookie: cookie! }),
    });
    expect(session?.user.email).toBe("anthony@example.com");
  });

  it("rejects a wrong password", async () => {
    const attempt = await auth.api.signInEmail({
      body: { email: "anthony@example.com", password: "not-the-password" },
      asResponse: true,
    });
    expect(attempt.status).toBe(401);
  });

  it("rejects short passwords", async () => {
    const attempt = await auth.api.signUpEmail({
      body: { name: "Short", email: "short@example.com", password: "tiny" },
      asResponse: true,
    });
    expect(attempt.status).toBe(400);
  });
});
