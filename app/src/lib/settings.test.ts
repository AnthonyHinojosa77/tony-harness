// @vitest-environment node
import { beforeAll, describe, expect, it } from "vitest";

process.env.PGLITE_DIR = "memory";

const { db } = await import("./db");
const { runMigrations } = await import("./db/migrate");
const { auth } = await import("./auth");
const { getSettings, parseSettings, saveSettings, defaultSettings } = await import("./settings");

describe("settings", () => {
  let userId = "";

  beforeAll(async () => {
    await runMigrations(db);
    const res = await auth.api.signUpEmail({
      body: { name: "Anthony", email: "settings@example.com", password: "a-long-enough-password" },
    });
    userId = res.user.id;
  });

  it("starts empty, then saves and reads back", async () => {
    expect(await getSettings(userId)).toBeNull();
    await saveSettings(userId, defaultSettings);
    const saved = await getSettings(userId);
    expect(saved?.favoriteModels).toEqual(defaultSettings.favoriteModels);
    expect(saved?.navigation).toBe("list");
    expect(saved?.onboardedAt).toBeInstanceOf(Date);
  });

  it("replaces on a second save", async () => {
    await saveSettings(userId, { ...defaultSettings, navigation: "park", monthlyLimitCents: 5000 });
    const saved = await getSettings(userId);
    expect(saved?.navigation).toBe("park");
    expect(saved?.monthlyLimitCents).toBe(5000);
  });
});

describe("parseSettings", () => {
  it("accepts a good payload and applies safe fallbacks", () => {
    const out = parseSettings({
      favoriteModels: ["a/b"],
      navigation: "weird",
      voice: "device",
      monthlyLimitCents: 1000,
    });
    expect(out).toEqual({ favoriteModels: ["a/b"], navigation: "list", voice: "device", monthlyLimitCents: 1000 });
  });

  it("rejects no models and silly limits", () => {
    expect(() => parseSettings({ favoriteModels: [], monthlyLimitCents: 1000 })).toThrow();
    expect(() => parseSettings({ favoriteModels: ["a/b"], monthlyLimitCents: 5 })).toThrow();
  });
});
