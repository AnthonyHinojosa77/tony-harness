import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { requireOnboarded } from "@/lib/session";

export const metadata: Metadata = { title: "Park" };

export default async function ParkPage() {
  await requireOnboarded();
  return (
    <AppShell active="park">
      <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="font-serif text-2xl">The park map is planted in milestone 6.</p>
        <p className="text-sm font-semibold text-muted">Until then, your chats live in the list.</p>
      </main>
    </AppShell>
  );
}
