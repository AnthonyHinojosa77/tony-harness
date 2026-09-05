"use client";

import { useCallback, useSyncExternalStore } from "react";

const changeEvent = "work-park:local-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(changeEvent, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(changeEvent, callback);
  };
}

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** A per-device on/off switch remembered in localStorage. Off during server rendering. */
export function useLocalFlag(key: string): [boolean, (on: boolean) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key) === "on",
    () => false,
  );
  const set = useCallback(
    (on: boolean) => {
      try {
        localStorage.setItem(key, on ? "on" : "off");
      } catch {
        // Storage blocked: the change still applies until the page reloads.
      }
      window.dispatchEvent(new Event(changeEvent));
    },
    [key],
  );
  return [value, set];
}

/** A snapshot of something about the browser, computed once on the client. */
export function useClientSnapshot<T>(compute: () => T, serverValue: T): T {
  return useSyncExternalStore(
    () => () => {},
    compute,
    () => serverValue,
  );
}
