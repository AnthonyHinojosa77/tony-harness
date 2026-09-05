"use server";

import { redirect } from "next/navigation";
import { requireSession } from "@/lib/session";
import { defaultSettings, parseSettings, saveSettings } from "@/lib/settings";

export async function completeOnboarding(raw: unknown) {
  const session = await requireSession();
  let input;
  try {
    input = parseSettings(raw);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Something was off." };
  }
  await saveSettings(session.user.id, input);
  redirect("/chats");
}

export async function skipOnboarding() {
  const session = await requireSession();
  await saveSettings(session.user.id, defaultSettings);
  redirect("/chats");
}
