import { z } from "zod";
import { getSession } from "@/lib/session";
import { speechifyMaxChars, synthesize } from "@/lib/speech/speechify";

const bodySchema = z.object({ text: z.string().min(1).max(speechifyMaxChars * 2) });

/** Reads a reply aloud with Speechify. The browser falls back to its own voice on any non-200. */
export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Sign in first." }, { status: 401 });

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Bad request." }, { status: 400 });

  try {
    const upstream = await synthesize(parsed.data.text);
    if (!upstream) return Response.json({ error: "Speechify is not set up." }, { status: 503 });
    return new Response(upstream.body, {
      headers: { "content-type": "audio/mpeg", "cache-control": "no-store" },
    });
  } catch (error) {
    console.error("[speech]", error);
    return Response.json({ error: "Speechify is unavailable right now." }, { status: 502 });
  }
}
