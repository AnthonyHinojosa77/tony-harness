import type { Metadata } from "next";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { BottomNav } from "@/components/ui/nav";
import { Wordmark } from "@/components/wordmark";
import { requireOnboarded } from "@/lib/session";

export const metadata: Metadata = { title: "Chats" };

export default async function ChatsPage() {
  const { session } = await requireOnboarded();
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between px-5 pt-11 pb-3">
        <Wordmark size="sm" />
        <SignOutButton />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
        <p className="font-serif text-2xl">Hello, {session.user.name}.</p>
        <p className="text-sm font-semibold text-muted">
          Chat arrives in the next step.
        </p>
      </main>
      <BottomNav active="chats" />
    </div>
  );
}
