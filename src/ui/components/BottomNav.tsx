"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Check-in" },
  { href: "/learn", label: "Learn" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-1/2 z-10 w-[min(92vw,420px)] -translate-x-1/2 rounded-full border border-surface-border bg-surface/90 px-2 py-2 shadow-lg backdrop-blur">
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-center text-sm font-medium transition ${
                isActive
                  ? "bg-accent text-accent-contrast"
                  : "text-foreground hover:bg-surface"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
