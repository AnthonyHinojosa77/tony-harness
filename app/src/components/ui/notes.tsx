import type { ReactNode } from "react";
import { CheckIcon, LayersIcon } from "./icons";

/** The judge's finding under a Compare answer. Yellow so it is never missed. */
export function JudgeNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-chip bg-sun px-3 py-2.5 text-xs font-semibold leading-relaxed">
      <LayersIcon size={18} className="mt-px shrink-0" />
      <p>
        <span className="font-serif text-sm italic">Judge note.</span> {children}
      </p>
    </div>
  );
}

/** Appears on a response where a memory was saved, so nothing is remembered silently. */
export function RememberedPill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-pill border-2 border-tan bg-card px-3.5 py-2.5 text-xs font-extrabold text-grass-deep">
      <CheckIcon size={16} />
      <span>Remembered: {children}</span>
    </div>
  );
}
