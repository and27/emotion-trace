"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Check-in" },
  { href: "/learn", label: "Learn" },
  { href: "/settings", label: "Settings" },
];

export function HeaderMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-foreground shadow-sm"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sr-only">Menu</span>
        <span className="flex h-4 w-5 flex-col justify-between">
          <span className="h-0.5 w-full rounded bg-current" />
          <span className="h-0.5 w-full rounded bg-current" />
          <span className="h-0.5 w-full rounded bg-current" />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-surface-border bg-surface shadow-lg">
          <div className="flex flex-col py-2 text-sm">
            {items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 transition ${
                    isActive
                      ? "bg-accent text-accent-contrast"
                      : "text-foreground hover:bg-surface"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
