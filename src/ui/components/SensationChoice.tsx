import type { MouseEventHandler } from "react";

type SensationChoiceProps = {
  label: string;
  selected: boolean;
  onSelect: MouseEventHandler<HTMLButtonElement>;
};

export function SensationChoice({
  label,
  selected,
  onSelect,
}: SensationChoiceProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`px-3 py-1 rounded border text-sm transition ${
        selected
          ? "bg-foreground text-background border-foreground"
          : "border-surface-border text-foreground hover:bg-surface"
      }`}
    >
      {label}
    </button>
  );
}
