import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { requireOnboarded } from "@/lib/session";

export const metadata: Metadata = { title: "Workflows" };

export default async function WorkflowsPage() {
  await requireOnboarded();
  return (
    <AppShell active="workflows">
      <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="font-serif text-2xl">Workflows arrive in milestone 5.</p>
        <p className="text-sm font-semibold text-muted">
          Compare, Research, and saved plans, chosen on purpose.
        </p>
      </main>
    </AppShell>
  );
}
