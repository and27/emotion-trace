export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-10 py-5 md:py-8">
        {children}
      </div>
    </section>
  );
}
