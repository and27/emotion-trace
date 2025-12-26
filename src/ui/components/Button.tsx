type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

const variantClassName: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-contrast",
  secondary: "bg-surface text-foreground border border-surface-border",
  ghost: "text-foreground hover:bg-surface",
};

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClassName} ${variantClassName[variant]} ${
        className ?? ""
      }`}
      {...props}
    />
  );
}
