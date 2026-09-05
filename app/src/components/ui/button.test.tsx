import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, IconButton } from "./button";

describe("Button", () => {
  it("renders its label and defaults to the press variant", () => {
    render(<Button>Listen</Button>);
    const button = screen.getByRole("button", { name: "Listen" });
    expect(button.className).toContain("bg-grass");
  });

  it("applies the stamp variant when asked", () => {
    render(<Button variant="stamp">Open</Button>);
    expect(screen.getByRole("button", { name: "Open" }).className).toContain(
      "border-ink",
    );
  });
});

describe("IconButton", () => {
  it("exposes its label to assistive technology", () => {
    render(
      <IconButton label="Send">
        <svg />
      </IconButton>,
    );
    expect(screen.getByRole("button", { name: "Send" })).toBeDefined();
  });
});
