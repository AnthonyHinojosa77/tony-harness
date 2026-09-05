"use client";

import { PlayIcon, SpeakerIcon } from "@/components/ui/icons";

export function ListenButton({
  playing,
  onClick,
}: {
  playing: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={playing}
      className={`inline-flex h-9 items-center gap-2 rounded-pill pr-4 pl-3 text-[13px] font-extrabold text-white shadow-[var(--shadow-press)] active:translate-y-[3px] active:shadow-none ${
        playing ? "bg-grass-deep" : "bg-grass"
      }`}
    >
      {playing ? (
        <span aria-hidden="true" className="size-3 rounded-sm bg-white" />
      ) : (
        <PlayIcon size={15} />
      )}
      {playing ? "Stop" : "Listen"}
    </button>
  );
}

export function HandsFreeToggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (on: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Hands-free"
      title={on ? "Hands-free is on: every reply is read aloud" : "Hands-free: read every reply aloud"}
      onClick={() => onChange(!on)}
      className={`inline-flex h-10 items-center gap-2 rounded-pill border-2 px-3 text-[13px] font-extrabold ${
        on
          ? "border-ink bg-sun shadow-[var(--shadow-stamp-sm)]"
          : "border-tan bg-card text-muted shadow-[var(--shadow-press-tan)]"
      }`}
    >
      <SpeakerIcon size={18} />
      <span className="hidden sm:inline">Hands-free</span>
    </button>
  );
}
