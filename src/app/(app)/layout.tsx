export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-5xl px-6 py-8">{children}</div>
    </section>
  );
}