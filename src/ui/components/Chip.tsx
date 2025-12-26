type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "accent";
};

const chipClassName: Record<NonNullable<ChipProps["tone"]>, string> = {
  neutral:
    "bg-surface text-foreground border border-surface-border",
  accent: "bg-accent text-accent-contrast",
};

export function Chip({ tone = "neutral", className, ...props }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-medium ${
        chipClassName[tone]
      } ${className ?? ""}`}
      {...props}
    />
  );
}
