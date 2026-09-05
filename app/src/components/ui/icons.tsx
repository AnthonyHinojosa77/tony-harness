import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
}

export function LeafIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 21v-7" />
      <path d="M6 14c-2.2 0-4-1.8-4-4 0-1.8 1.2-3.3 2.8-3.8C5.2 3.6 7.4 2 10 2c2 0 3.8 1 4.8 2.6C17.7 4.9 20 7.2 20 10c0 2.2-1.8 4-4 4H6z" />
    </svg>
  );
}

export function ChatIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.4A8 8 0 1 1 21 12z" />
    </svg>
  );
}

export function ParkIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function WorkflowsIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="12" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8.5 6h4a3 3 0 0 1 3 3v0M8.5 18h4a3 3 0 0 0 3-3v0" />
    </svg>
  );
}

export function SettingsIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
      <circle cx="16" cy="7" r="2.5" />
      <circle cx="8" cy="17" r="2.5" />
    </svg>
  );
}

export function SendIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function MicIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function PaperclipIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M21 12.5l-8.5 8.5a5.5 5.5 0 0 1-7.8-7.8L13.5 4.4a3.5 3.5 0 0 1 5 5L9.7 18.2a1.5 1.5 0 0 1-2.1-2.1L15.5 8" />
    </svg>
  );
}

export function PlayIcon(p: IconProps) {
  return (
    <svg {...base(p)} fill="currentColor" stroke="none">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function SearchIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function LayersIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3l9 4-9 4-9-4 9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />
    </svg>
  );
}

export function CompareIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 6h7M3 12h7M3 18h7M14 6h7M14 12h7M14 18h7" />
    </svg>
  );
}

export function PlusIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function SpeakerIcon(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}
