import { HeaderMenu } from "@/src/ui/components/HeaderMenu";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="page-shell">
        <header className="mb-6 flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-[3px] text-text-muted">
            GUT
          </div>
          <HeaderMenu />
        </header>
        {children}
      </div>
    </section>
  );
}
