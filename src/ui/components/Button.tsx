import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  asChild?: boolean;
};

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-md px-2 md:px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";

const variantClassName: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-contrast",
  secondary: "bg-surface text-foreground border border-surface-border",
  ghost: "text-foreground hover:bg-surface",
};

export const Button = React.forwardRef<
  React.ComponentRef<"button">,
  ButtonProps
>(({ variant = "primary", asChild = false, className, ...props }, ref) => {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={ref}
      className={`${baseClassName} ${variantClassName[variant]} ${
        className ?? ""
      }`}
      {...props}
    />
  );
});

Button.displayName = "Button";
