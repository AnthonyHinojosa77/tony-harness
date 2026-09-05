import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "press" | "stamp" | "soft" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

const variants: Record<ButtonVariant, string> = {
  // The main action. Grass green with a darker bottom edge that flattens on press.
  press:
    "bg-grass text-white shadow-[var(--shadow-press)] hover:brightness-105 active:translate-y-[3px] active:shadow-none",
  // Emphasis. Ink outline with a solid offset shadow.
  stamp:
    "bg-card text-ink border-2 border-ink shadow-[var(--shadow-stamp-sm)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  // Everyday. Cream with a tan edge.
  soft:
    "bg-card text-ink border-2 border-tan shadow-[var(--shadow-press-tan)] active:translate-y-[2px] active:shadow-none",
  // Quiet. No chrome until hovered.
  ghost: "bg-transparent text-ink-soft hover:bg-card",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-[13px] gap-1.5",
  md: "h-11 px-4 text-sm gap-2",
  lg: "h-12 px-5 text-[15px] gap-2.5",
};

export function Button({
  variant = "press",
  size = "md",
  icon,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-pill font-extrabold transition-[transform,box-shadow,filter] duration-100 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  label: string;
  children: ReactNode;
};

/** A round button holding only an icon. `label` is read by screen readers. */
export function IconButton({
  variant = "soft",
  label,
  className = "",
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex size-11 items-center justify-center rounded-full transition-[transform,box-shadow] duration-100 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
