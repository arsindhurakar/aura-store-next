"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Receipt,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/common/ThemeToggle";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: Receipt },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar p-6 md:flex md:flex-col">
        <Link
          href="/admin/dashboard"
          className="font-display text-2xl tracking-tight"
        >
          NOIR <span className="text-eyebrow ml-1">/ admin</span>
        </Link>

        <nav className="mt-10 flex-1 space-y-1">
          {nav.map((n) => {
            const active = pathname.startsWith(n.to);
            const Icon = n.icon;

            return (
              <Link
                key={n.to}
                href={n.to}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-between border-t border-border pt-4">
          <ThemeToggle />

          <button
            onClick={() => router.push("/admin")}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex h-14 items-center justify-between border-b border-border px-6 md:hidden">
          <Link href="/admin/dashboard" className="font-display text-xl">
            NOIR / admin
          </Link>

          <ThemeToggle />
        </header>

        <main className="p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
