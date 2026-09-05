// @vitest-environment node
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

process.env.PGLITE_DIR = "memory";

let sessionCookie = "";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ cookie: sessionCookie }),
}));

const { db } = await import("@/lib/db");
const { runMigrations } = await import("@/lib/db/migrate");
const { auth } = await import("@/lib/auth");
const { POST } = await import("./route");

function request(body: unknown) {
  return new Request("http://localhost/api/speech", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/speech", () => {
  beforeAll(async () => {
    await runMigrations(db);
    const res = await auth.api.signUpEmail({
      body: { name: "Anthony", email: "speech@example.com", password: "a-long-enough-password" },
      asResponse: true,
    });
    sessionCookie = res.headers.get("set-cookie")?.split(";")[0] ?? "";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("rejects visitors without a session", async () => {
    const saved = sessionCookie;
    sessionCookie = "";
    const res = await POST(request({ text: "Hello" }));
    sessionCookie = saved;
    expect(res.status).toBe(401);
  });

  it("says so when Speechify is not configured", async () => {
    vi.stubEnv("SPEECHIFY_API_KEY", "");
    const res = await POST(request({ text: "Hello" }));
    expect(res.status).toBe(503);
  });

  it("streams Speechify audio back with the key and a cleaned transcript", async () => {
    vi.stubEnv("SPEECHIFY_API_KEY", "sk_test");
    const calls: { url: string; init: RequestInit }[] = [];
    vi.stubGlobal("fetch", async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response("mp3-bytes", { status: 200, headers: { "content-type": "audio/mpeg" } });
    });

    const res = await POST(request({ text: "**Hello** Anthony" }));
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("audio/mpeg");
    expect(await res.text()).toBe("mp3-bytes");

    expect(calls[0].url).toBe("https://api.speechify.ai/v1/audio/stream");
    const sent = JSON.parse(String(calls[0].init.body));
    expect(sent.input).toBe("Hello Anthony");
    expect(sent.voice_id).toBe("geffen_32");
    expect(new Headers(calls[0].init.headers).get("authorization")).toBe("Bearer sk_test");
  });

  it("reports an upstream failure without leaking it", async () => {
    vi.stubEnv("SPEECHIFY_API_KEY", "sk_test");
    vi.stubGlobal("fetch", async () => new Response("nope", { status: 429 }));
    const res = await POST(request({ text: "Hello" }));
    expect(res.status).toBe(502);
  });
});
