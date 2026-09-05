"use client";

import { ChevronDownIcon } from "@/components/ui/icons";

type Props = {
  value: string;
  options: { id: string; name: string }[];
  onChange: (id: string) => void;
  disabled?: boolean;
};

/** A native select dressed as the model pill, so it works on every phone. */
export function ModelPicker({ value, options, onChange, disabled }: Props) {
  return (
    <label className="relative inline-flex h-10 items-center rounded-pill border-2 border-tan bg-card pr-9 pl-3.5 text-[13px] font-extrabold shadow-[var(--shadow-press-tan)]">
      <span aria-hidden="true" className="mr-1.5 size-2.5 rounded-full bg-grass" />
      <span className="sr-only">Model</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent pr-1 font-extrabold outline-none"
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
      <ChevronDownIcon size={16} className="pointer-events-none absolute right-3 text-muted" />
    </label>
  );
}
