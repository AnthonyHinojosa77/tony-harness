import { ChevronDownIcon } from "./icons";

type ModelPillProps = {
  name: string;
  /** Static for now. Becomes a menu when the model picker arrives. */
  onClick?: () => void;
};

/** Shows the model in use. A green dot means it is reachable. */
export function ModelPill({ name, onClick }: ModelPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-1.5 rounded-pill border-2 border-tan bg-card pr-3 pl-3.5 text-[13px] font-extrabold shadow-[var(--shadow-press-tan)] active:translate-y-[2px] active:shadow-none"
    >
      <span aria-hidden="true" className="size-2.5 rounded-full bg-grass" />
      {name}
      <ChevronDownIcon size={16} className="text-muted" />
    </button>
  );
}
