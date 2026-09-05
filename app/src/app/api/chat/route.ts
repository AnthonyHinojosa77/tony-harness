import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { z } from "zod";
import { buildInstructions } from "@/lib/chat/instructions";
import { getLanguageModel, ModelsUnavailableError } from "@/lib/chat/model";
import { saveMessage, textOf, titleFromText, touchConversation } from "@/lib/chat/store";
import { getSession } from "@/lib/session";
import { getSettings } from "@/lib/settings";

const bodySchema = z.object({
  conversationId: z.string().min(8).max(64),
  modelId: z.string().min(3).max(120),
  messages: z.array(z.custom<UIMessage>((m) => typeof m === "object" && m !== null)).min(1),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Sign in first." }, { status: 401 });

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Bad request." }, { status: 400 });
  const { conversationId, modelId, messages } = parsed.data;

  const settings = await getSettings(session.user.id);
  const allowed = settings?.favoriteModels ?? [];
  if (!allowed.includes(modelId)) {
    return Response.json({ error: "Pick a model from your favorites." }, { status: 400 });
  }

  let model;
  try {
    model = getLanguageModel(modelId);
  } catch (error) {
    if (error instanceof ModelsUnavailableError) {
      return Response.json({ error: error.message }, { status: 503 });
    }
    throw error;
  }

  const last = messages[messages.length - 1];
  if (last.role !== "user") return Response.json({ error: "Bad request." }, { status: 400 });

  await touchConversation({
    id: conversationId,
    userId: session.user.id,
    modelId,
    title: titleFromText(textOf(last)),
  });
  await saveMessage({ id: last.id, conversationId, role: "user", parts: last.parts });

  const assistantId = crypto.randomUUID();
  const result = streamText({
    model,
    instructions: buildInstructions(session.user.name),
    messages: await convertToModelMessages(messages),
    onEnd: async ({ text, usage, finalStep }) => {
      const openrouter = finalStep?.providerMetadata?.openrouter as
        | { usage?: { cost?: number } }
        | undefined;
      const cost = openrouter?.usage?.cost;
      await saveMessage({
        id: assistantId,
        conversationId,
        role: "assistant",
        parts: [{ type: "text", text }],
        modelId,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        costMicros: typeof cost === "number" ? Math.round(cost * 1_000_000) : undefined,
      });
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      generateMessageId: () => assistantId,
      messageMetadata: () => ({ modelId }),
    }),
  });
}
