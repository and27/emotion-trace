type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-surface-border bg-surface p-6 ${
        className ?? ""
      }`}
      {...props}
    />
  );
}
