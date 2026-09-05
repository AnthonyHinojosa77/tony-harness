import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { ChatView } from "@/components/chat/chat-view";
import { ConversationList } from "@/components/chat/conversation-list";
import { getConversation, getMessages, listConversations } from "@/lib/chat/store";
import { fetchCatalog } from "@/lib/models/catalog";
import { requireOnboarded } from "@/lib/session";

export const metadata: Metadata = { title: "Chat" };

const idShape = /^[a-zA-Z0-9-]{8,64}$/;

export default async function ChatPage({ params }: PageProps<"/chats/[id]">) {
  const { id } = await params;
  if (!idShape.test(id)) notFound();

  const { session, settings } = await requireOnboarded();
  const [conversation, threads, catalog] = await Promise.all([
    getConversation(session.user.id, id),
    listConversations(session.user.id),
    fetchCatalog().catch(() => []),
  ]);
  const initialMessages = conversation ? await getMessages(id) : [];

  const names = new Map(catalog.map((m) => [m.id, m.name]));
  const models = settings.favoriteModels.map((mid) => ({ id: mid, name: names.get(mid) ?? mid }));
  const initialModelId =
    conversation?.modelId && settings.favoriteModels.includes(conversation.modelId)
      ? conversation.modelId
      : settings.favoriteModels[0];

  return (
    <AppShell active="chats" rail={<ConversationList conversations={threads} activeId={id} />}>
      <ChatView
        key={id}
        conversationId={id}
        initialMessages={initialMessages}
        initialModelId={initialModelId}
        models={models}
        isNew={!conversation}
        voice={settings.voice}
        speechifyAvailable={Boolean(process.env.SPEECHIFY_API_KEY)}
      />
    </AppShell>
  );
}
