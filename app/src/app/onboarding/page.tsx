import type { Metadata } from "next";
import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";
import { fetchCatalog, shortlist } from "@/lib/models/catalog";
import { requireSession } from "@/lib/session";
import { defaultFavoriteModels, defaultSettings, getSettings } from "@/lib/settings";

export const metadata: Metadata = { title: "Welcome" };

export default async function OnboardingPage() {
  const session = await requireSession();
  const existing = await getSettings(session.user.id);
  const catalog = await fetchCatalog().catch(() => []);

  // The picker offers a short, current list. The full catalog lives in Settings.
  const favorites = existing?.favoriteModels ?? defaultFavoriteModels;
  const models = shortlist(catalog, favorites);

  return (
    <OnboardingFlow
      name={session.user.name}
      models={models}
      initial={{
        favoriteModels: existing?.favoriteModels ?? defaultSettings.favoriteModels,
        navigation: existing?.navigation ?? defaultSettings.navigation,
        voice: existing?.voice ?? defaultSettings.voice,
        monthlyLimitCents: existing?.monthlyLimitCents ?? defaultSettings.monthlyLimitCents,
      }}
    />
  );
}
