import { AppProviders } from "../ui/providers/AppProviders";
import { ServiceWorkerRegistrar } from "../ui/components/ServiceWorkerRegistrar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#1f3a5f" />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
