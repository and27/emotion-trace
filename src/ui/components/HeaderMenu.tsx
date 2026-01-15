"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Check-in" },
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
          <span className="sr-only">Menu</span>
          <span className="flex h-4 w-5 flex-col justify-between">
            <span className="h-0.5 w-full rounded bg-current" />
            <span className="h-0.5 w-full rounded bg-current" />
            <span className="h-0.5 w-full rounded bg-current" />
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-x-0 top-0 z-50 w-full border-b border-surface-border bg-background px-6 py-6 shadow-lg">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
            <Dialog.Title className="text-sm font-semibold uppercase tracking-[3px] text-text-muted">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface text-foreground shadow-sm"
                aria-label="Close menu"
              >
                <span className="text-lg">×</span>
              </button>
            </Dialog.Close>
          </div>

          <nav className="mx-auto mt-6 grid w-full max-w-5xl gap-3 text-base font-semibold">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
