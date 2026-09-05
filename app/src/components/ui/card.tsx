import type { HTMLAttributes } from "react";

export type CardVariant = "stamp" | "soft" | "inset";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variants: Record<CardVariant, string> = {
  // The one card per screen that carries the ink outline and offset shadow.
  stamp: "bg-card border-2 border-ink shadow-[var(--shadow-stamp)]",
  // Everything else. Cream with a tan edge.
  soft: "bg-card border-2 border-tan",
  // A pocket inside another card.
  inset: "bg-paper",
};

export function Card({ variant = "soft", className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-card ${variants[variant]} ${className}`}
      {...rest}
    />
  );
}
