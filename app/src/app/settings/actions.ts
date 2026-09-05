"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/session";
import { resetRules, saveRules } from "@/lib/rules";
import { getSettings, parseSettings, saveSettings } from "@/lib/settings";

export async function updateRules(content: string) {
  const session = await requireSession();
  try {
    await saveRules(session.user.id, content);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save." };
  }
  revalidatePath("/settings");
  return { ok: true };
}

export async function restoreDefaultRules() {
  const session = await requireSession();
  await resetRules(session.user.id);
  revalidatePath("/settings");
  return { ok: true };
}

export async function updatePreferences(patch: {
  navigation?: "list" | "park";
  voice?: "speechify" | "device";
  monthlyLimitCents?: number;
}) {
  const session = await requireSession();
  const current = await getSettings(session.user.id);
  if (!current) return { error: "Finish onboarding first." };
  try {
    const next = parseSettings({
      favoriteModels: current.favoriteModels,
      navigation: patch.navigation ?? current.navigation,
      voice: patch.voice ?? current.voice,
      monthlyLimitCents: patch.monthlyLimitCents ?? current.monthlyLimitCents,
    });
    await saveSettings(session.user.id, next);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not save." };
  }
  revalidatePath("/settings");
  return { ok: true };
}
