import { speakable } from "./speakable";

export const speechifyMaxChars = 20000;
export const defaultVoiceId = "geffen_32";

/**
 * Asks Speechify for an MP3 of the text. Returns null when no key is
 * configured; throws when Speechify says no.
 */
export async function synthesize(
  text: string,
  env: Record<string, string | undefined> = process.env,
  fetcher: typeof fetch = fetch,
): Promise<Response | null> {
  const apiKey = env.SPEECHIFY_API_KEY;
  if (!apiKey) return null;
  const input = speakable(text, speechifyMaxChars);
  if (!input) throw new Error("Nothing to read.");

  const res = await fetcher("https://api.speechify.ai/v1/audio/stream", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
      accept: "audio/mpeg",
    },
    body: JSON.stringify({
      input,
      voice_id: env.SPEECHIFY_VOICE_ID || defaultVoiceId,
      model: "simba-3.2",
      language: "en-US",
    }),
  });
  if (!res.ok || !res.body) {
    throw new Error(`Speechify replied ${res.status}.`);
  }
  return res;
}
