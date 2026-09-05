import type { ReactNode } from "react";
import { ChatIcon, ParkIcon, SettingsIcon, WorkflowsIcon } from "./icons";

export type NavKey = "chats" | "park" | "workflows" | "settings";

export const navItems: { key: NavKey; label: string; icon: ReactNode }[] = [
  { key: "chats", label: "Chats", icon: <ChatIcon size={22} /> },
  { key: "park", label: "Park", icon: <ParkIcon size={22} /> },
  { key: "workflows", label: "Workflows", icon: <WorkflowsIcon size={22} /> },
  { key: "settings", label: "Settings", icon: <SettingsIcon size={22} /> },
];

/** Phone: the bar along the bottom. The active item wears the stamped green pad. */
export function BottomNav({ active }: { active: NavKey }) {
  return (
    <nav
      aria-label="Main"
      className="flex justify-around border-t-2 border-ink bg-card px-3 pt-2 pb-6"
    >
      {navItems.map((item) => {
        const isActive = item.key === active;
        return (
          <a
            key={item.key}
            href={`/${item.key}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex w-16 flex-col items-center gap-1 text-[11px] font-extrabold ${
              isActive ? "text-ink" : "text-muted"
            }`}
          >
            <span
              className={`flex h-8 w-11 items-center justify-center rounded-xl ${
                isActive ? "border-2 border-ink bg-grass text-white" : ""
              }`}
            >
              {item.icon}
            </span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

/** Laptop: the list in the left rail. The active item carries the ink outline. */
export function SideNav({ active }: { active: NavKey }) {
  return (
    <nav aria-label="Main" className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = item.key === active;
        return (
          <a
            key={item.key}
            href={`/${item.key}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 items-center gap-2.5 rounded-xl px-3 text-sm ${
              isActive
                ? "border-2 border-ink bg-card font-extrabold shadow-[var(--shadow-stamp-sm)]"
                : "font-bold text-muted hover:bg-card"
            }`}
          >
            {item.icon}
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
