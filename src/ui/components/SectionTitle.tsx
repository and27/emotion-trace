type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
};

export function SectionTitle({
  as: Tag = "h2",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <Tag
      className={`text-lg font-semibold tracking-tight text-foreground ${
        className ?? ""
      }`}
      {...props}
    />
  );
}
