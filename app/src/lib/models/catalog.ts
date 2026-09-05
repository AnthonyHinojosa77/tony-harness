/**
 * The OpenRouter model catalog, trimmed to what the picker needs.
 * The public endpoint needs no key. Cached for an hour.
 */
export type CatalogModel = {
  id: string;
  name: string;
  provider: string;
  contextLength: number;
  /** US dollars per million tokens. */
  promptPerMillion: number;
  completionPerMillion: number;
  inputs: string[];
  supportsTools: boolean;
  supportsReasoning: boolean;
};

type RawModel = {
  id: string;
  name: string;
  context_length?: number;
  pricing?: { prompt?: string; completion?: string };
  architecture?: { input_modalities?: string[]; output_modalities?: string[] };
  supported_parameters?: string[];
};

const providerNames: Record<string, string> = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  google: "Google",
  "x-ai": "xAI",
  deepseek: "DeepSeek",
  "meta-llama": "Meta",
  mistralai: "Mistral",
  qwen: "Qwen",
  perplexity: "Perplexity",
  cohere: "Cohere",
};

export function normalizeCatalog(raw: { data: RawModel[] }): CatalogModel[] {
  return raw.data
    .filter((m) => !m.id.includes(":batch"))
    .filter((m) => (m.architecture?.output_modalities ?? ["text"]).includes("text"))
    .map((m) => {
      const provider = m.id.split("/")[0] ?? "";
      const params = m.supported_parameters ?? [];
      return {
        id: m.id,
        name: m.name.replace(/^[^:]+:\s*/, ""),
        provider: providerNames[provider] ?? provider,
        contextLength: m.context_length ?? 0,
        promptPerMillion: perMillion(m.pricing?.prompt),
        completionPerMillion: perMillion(m.pricing?.completion),
        inputs: m.architecture?.input_modalities ?? ["text"],
        supportsTools: params.includes("tools"),
        supportsReasoning: params.includes("reasoning"),
      };
    })
    .sort((a, b) => a.provider.localeCompare(b.provider) || a.name.localeCompare(b.name));
}

function perMillion(perToken: string | undefined) {
  const n = Number(perToken ?? 0);
  return Number.isFinite(n) ? Math.round(n * 1_000_000 * 100) / 100 : 0;
}

export async function fetchCatalog(): Promise<CatalogModel[]> {
  const res = await fetch("https://openrouter.ai/api/v1/models", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`OpenRouter catalog failed: ${res.status}`);
  return normalizeCatalog((await res.json()) as { data: RawModel[] });
}

/** Formats a per-million price the way a person reads it: "$3 / M". */
export function formatPerMillion(value: number) {
  if (value === 0) return "free";
  const text = value >= 1 ? value.toFixed(value % 1 === 0 ? 0 : 2) : value.toFixed(2);
  return `$${text} / M`;
}
