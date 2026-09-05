import { and, desc, eq } from "drizzle-orm";
import type { UIMessage } from "ai";
import { db } from "@/lib/db";
import { conversations, messages } from "@/lib/db/app-schema";

export type Conversation = typeof conversations.$inferSelect;
export type StoredMessage = typeof messages.$inferSelect;

export async function listConversations(userId: string, limit = 50) {
  return db
    .select()
    .from(conversations)
    .where(eq(conversations.userId, userId))
    .orderBy(desc(conversations.lastMessageAt))
    .limit(limit);
}

export async function getConversation(userId: string, id: string) {
  const rows = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.id, id), eq(conversations.userId, userId)))
    .limit(1);
  return rows[0] ?? null;
}

export async function getMessages(conversationId: string): Promise<UIMessage[]> {
  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId))
    .orderBy(messages.createdAt);
  return rows.map((r) => ({
    id: r.id,
    role: r.role,
    parts: r.parts as UIMessage["parts"],
    metadata: r.modelId ? { modelId: r.modelId, costMicros: r.costMicros } : undefined,
  }));
}

/** Creates the thread on first use, or updates its model and activity time. */
export async function touchConversation(input: {
  id: string;
  userId: string;
  modelId: string;
  title: string;
}) {
  const now = new Date();
  await db
    .insert(conversations)
    .values({ ...input, lastMessageAt: now })
    .onConflictDoUpdate({
      target: conversations.id,
      set: { modelId: input.modelId, lastMessageAt: now },
    });
}

export async function saveMessage(input: {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  parts: unknown[];
  modelId?: string;
  inputTokens?: number;
  outputTokens?: number;
  costMicros?: number;
}) {
  await db
    .insert(messages)
    .values(input)
    .onConflictDoUpdate({ target: messages.id, set: { parts: input.parts } });
}

/** A short title from the first message: the first line, trimmed to a readable length. */
export function titleFromText(text: string, max = 60) {
  const line = text.trim().split("\n")[0]?.replace(/\s+/g, " ") ?? "";
  if (!line) return "New chat";
  return line.length > max ? `${line.slice(0, max - 1).trimEnd()}…` : line;
}

export function textOf(message: UIMessage) {
  return message.parts
    .filter((p): p is Extract<UIMessage["parts"][number], { type: "text" }> => p.type === "text")
    .map((p) => p.text)
    .join("");
}
