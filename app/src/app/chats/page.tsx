import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ConversationList } from "@/components/chat/conversation-list";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@/components/ui/icons";
import { listConversations } from "@/lib/chat/store";
import { requireOnboarded } from "@/lib/session";

export const metadata: Metadata = { title: "Chats" };

export default async function ChatsPage() {
  const { session } = await requireOnboarded();
  const threads = await listConversations(session.user.id);

  return (
    <AppShell active="chats" rail={<ConversationList conversations={threads} />}>
      <main className="flex flex-1 flex-col gap-4 px-5 py-4 md:mx-auto md:w-full md:max-w-2xl md:py-10">
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-3xl">Chats</h1>
          <span className="text-xs font-extrabold text-muted">{threads.length}</span>
        </div>
        <div className="md:hidden">
          <ConversationList conversations={threads} large />
        </div>
        <div className="hidden flex-1 flex-col items-center justify-center gap-3 text-center md:flex">
          <p className="font-serif text-2xl">Pick a chat on the left, or start fresh.</p>
          <Link href={`/chats/${crypto.randomUUID()}`}>
            <Button size="lg" icon={<PlusIcon size={18} />}>
              New chat
            </Button>
          </Link>
        </div>
      </main>
    </AppShell>
  );
}
