import { describe, expect, it } from "vitest";
import { formatPerMillion, normalizeCatalog } from "./catalog";

const raw = {
  data: [
    {
      id: "anthropic/claude-sonnet-5",
      name: "Anthropic: Claude Sonnet 5",
      context_length: 1000000,
      pricing: { prompt: "0.000003", completion: "0.000015" },
      architecture: { input_modalities: ["text", "image"], output_modalities: ["text"] },
      supported_parameters: ["tools", "reasoning"],
    },
    {
      id: "anthropic/claude-sonnet-5:batch",
      name: "Anthropic: Claude Sonnet 5 (batch)",
    },
    {
      id: "openai/gpt-image-2",
      name: "OpenAI: GPT Image 2",
      architecture: { input_modalities: ["text"], output_modalities: ["image"] },
    },
    {
      id: "acme/free-model",
      name: "Acme: Free",
      pricing: { prompt: "0", completion: "0" },
    },
  ],
};

describe("normalizeCatalog", () => {
  it("drops batch variants and non-text models, keeps the rest", () => {
    const models = normalizeCatalog(raw);
    expect(models.map((m) => m.id)).toEqual([
      "acme/free-model",
      "anthropic/claude-sonnet-5",
    ]);
  });

  it("converts prices to dollars per million and strips the vendor prefix", () => {
    const claude = normalizeCatalog(raw).find((m) => m.id.startsWith("anthropic"))!;
    expect(claude.name).toBe("Claude Sonnet 5");
    expect(claude.provider).toBe("Anthropic");
    expect(claude.promptPerMillion).toBe(3);
    expect(claude.completionPerMillion).toBe(15);
    expect(claude.supportsTools).toBe(true);
    expect(claude.supportsReasoning).toBe(true);
    expect(claude.inputs).toContain("image");
  });
});

describe("formatPerMillion", () => {
  it("reads naturally", () => {
    expect(formatPerMillion(0)).toBe("free");
    expect(formatPerMillion(3)).toBe("$3 / M");
    expect(formatPerMillion(0.15)).toBe("$0.15 / M");
    expect(formatPerMillion(12.5)).toBe("$12.50 / M");
  });
});
