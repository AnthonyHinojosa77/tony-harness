"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalFlag } from "@/lib/client-store";
import { speakable } from "./speakable";

export type VoiceSource = "speechify" | "device";

type Options = {
  /** The user's preference from Settings. */
  voice: VoiceSource;
  /** Whether the server has a Speechify key. Without it, the device voice is used. */
  speechifyAvailable: boolean;
};

/**
 * Reads text aloud with Speechify when available and chosen, otherwise the
 * device's own voice. Tracks which message is playing and a hands-free
 * switch remembered per device.
 */
export function useReadAloud({ voice, speechifyAvailable }: Options) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [handsFree, setHandsFreeFlag] = useLocalFlag("work-park:hands-free");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const useSpeechify = voice === "speechify" && speechifyAvailable;

  const stop = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
    setPlayingId(null);
  }, []);

  const play = useCallback(
    async (id: string, text: string) => {
      stop();
      if (!text.trim()) return;
      setPlayingId(id);

      if (useSpeechify) {
        try {
          const res = await fetch("/api/speech", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ text }),
          });
          if (res.ok) {
            const url = URL.createObjectURL(await res.blob());
            const audio = new Audio(url);
            audioRef.current = audio;
            audio.onended = () => {
              URL.revokeObjectURL(url);
              setPlayingId((current) => (current === id ? null : current));
            };
            audio.onerror = () => setPlayingId(null);
            await audio.play();
            return;
          }
        } catch {
          // Fall through to the device voice.
        }
      }

      if (typeof speechSynthesis === "undefined") {
        setPlayingId(null);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(speakable(text));
      utterance.rate = 1.05;
      utterance.onend = () => setPlayingId((current) => (current === id ? null : current));
      utterance.onerror = () => setPlayingId(null);
      speechSynthesis.speak(utterance);
    },
    [stop, useSpeechify],
  );

  const setHandsFree = useCallback(
    (on: boolean) => {
      setHandsFreeFlag(on);
      if (!on) stop();
    },
    [setHandsFreeFlag, stop],
  );

  useEffect(() => stop, [stop]);

  return {
    play,
    stop,
    playingId,
    handsFree,
    setHandsFree,
    source: useSpeechify ? "speechify" : "device",
  };
}
