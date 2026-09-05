import { describe, expect, it } from "vitest";
import { speakable } from "./speakable";

describe("speakable", () => {
  it("drops markdown marks and links", () => {
    expect(speakable("## Hi\n\nSome **bold** and *soft* text with a [link](https://x.y).")).toBe(
      "Hi\nSome bold and soft text with a link.",
    );
  });

  it("replaces code blocks and unwraps inline code", () => {
    expect(speakable("Run `pnpm test`:\n```sh\npnpm test\n```\nDone.")).toBe(
      "Run pnpm test:\n(code)\nDone.",
    );
  });

  it("strips list bullets and quotes", () => {
    expect(speakable("- one\n- two\n> said")).toBe("one\ntwo\nsaid");
  });

  it("cuts long text at a sentence boundary", () => {
    const text = "First sentence. ".repeat(50).trim();
    const cut = speakable(text, 200);
    expect(cut.length).toBeLessThanOrEqual(200);
    expect(cut.endsWith(".")).toBe(true);
  });
});
