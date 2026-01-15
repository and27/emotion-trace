import { BottomNav } from "@/src/ui/components/BottomNav";
import { HeaderMenu } from "@/src/ui/components/HeaderMenu";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-3 md:px-10 py-5 md:py-8 pb-24">
        <header className="mb-6 flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-[3px] text-text-muted">
            Emotion Selector
          </div>
          <HeaderMenu />
        </header>
        {children}
      </div>
      <BottomNav />
    </section>
  );
}
