import { IconButton } from "./button";
import { MicIcon, PaperclipIcon, SendIcon } from "./icons";

type ComposerProps = {
  placeholder?: string;
  /** Wide layout gets a larger send button and more padding. */
  wide?: boolean;
};

/**
 * The message box. Carries the ink outline because it is the most
 * important control on the screen. Static for now; behavior arrives with chat.
 */
export function Composer({
  placeholder = "Ask anything",
  wide = false,
}: ComposerProps) {
  return (
    <div
      className={`flex items-center gap-2 rounded-pill border-2 border-ink bg-card shadow-[var(--shadow-stamp)] ${
        wide ? "min-h-15 py-1.5 pr-1.5 pl-5" : "min-h-13 py-1 pr-1 pl-4"
      }`}
    >
      <PaperclipIcon className="shrink-0 text-muted" />
      <input
        type="text"
        aria-label="Message"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent font-serif text-[17px] italic text-ink outline-none placeholder:text-placeholder"
      />
      <IconButton label="Speak" variant="ghost" className="size-10">
        <MicIcon className="text-muted" />
      </IconButton>
      <IconButton
        label="Send"
        variant="press"
        className="border-2 border-ink shadow-none active:translate-y-0"
      >
        <SendIcon className="text-white" />
      </IconButton>
    </div>
  );
}
