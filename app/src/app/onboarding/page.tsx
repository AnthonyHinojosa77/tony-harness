import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { fetchCatalog } from "@/lib/models/catalog";
import { requireSession } from "@/lib/session";
import { defaultFavoriteModels, defaultSettings, getSettings } from "@/lib/settings";

export const metadata: Metadata = { title: "Welcome" };

export default async function OnboardingPage() {
  const session = await requireSession();
  const existing = await getSettings(session.user.id);
  const catalog = await fetchCatalog().catch(() => []);

  // The picker offers a short, balanced shortlist. The full catalog lives in Settings.
  const shortlist = catalog.filter(
    (m) =>
      defaultFavoriteModels.includes(m.id) ||
      ["Anthropic", "OpenAI", "Google", "xAI", "DeepSeek", "Meta", "Mistral"].includes(m.provider),
  );

  return (
    <OnboardingFlow
      name={session.user.name}
      models={shortlist.slice(0, 40)}
      initial={{
        favoriteModels: existing?.favoriteModels ?? defaultSettings.favoriteModels,
        navigation: existing?.navigation ?? defaultSettings.navigation,
        voice: existing?.voice ?? defaultSettings.voice,
        monthlyLimitCents: existing?.monthlyLimitCents ?? defaultSettings.monthlyLimitCents,
      }}
    />
  );
}
