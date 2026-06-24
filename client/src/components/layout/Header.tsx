"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";

// import { useCart } from "@/store/cart.store";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/search", label: "Search" },
];

export function Header() {
  // const count = useCart((s) => s.lines.reduce((a, l) => a + l.quantity, 0));
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-2xl tracking-tight">NOIR</span>
          <span className="hidden text-eyebrow sm:inline">/ devices</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              className={cn(
                "text-sm transition-colors",
                pathname.startsWith(n.to)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:text-foreground sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <Link
            href="/cart"
            className="relative inline-flex h-9 items-center gap-2 rounded-full border border-border-strong bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            {/* {count > 0 && (
              <span className="ml-1 rounded-full bg-background px-1.5 text-xs font-semibold text-foreground">
                {count}
              </span>
            )} */}
          </Link>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-muted-foreground transition hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
