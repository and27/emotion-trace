"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Check-in" },
  { href: "/protocol", label: "Protocol" },
  { href: "/history", label: "History" },
  { href: "/learn", label: "Learn" },
  { href: "/settings", label: "Settings" },
];

export function HeaderMenu() {
  const pathname = usePathname();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-foreground shadow-sm"
          aria-label="Open menu"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
          </svg>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 top-0 z-50 w-full border-b border-surface-border bg-background shadow-lg">
          <div className="mx-auto w-full max-w-5xl px-3 md:px-10 py-6">
            <div className="flex items-center justify-between">
            <Dialog.Title className="text-sm font-semibold uppercase tracking-[3px] text-text-muted">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-foreground shadow-sm"
                aria-label="Close menu"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12" />
                  <path d="M18 6l-12 12" />
                </svg>
              </button>
            </Dialog.Close>
            </div>

            <nav className="mt-6 grid w-full gap-3 text-base font-semibold">
              {items.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Dialog.Close key={item.href} asChild>
                    <Link
                      href={item.href}
                      className={`rounded-2xl border px-5 py-4 text-lg transition ${
                        isActive
                          ? "border-accent bg-accent text-accent-contrast"
                          : "border-surface-border bg-surface text-foreground hover:bg-surface/70"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </Dialog.Close>
                );
              })}
            </nav>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
