"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-tight">NOIR</div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            A focused catalogue of premium mobile devices and accessories. Free
            expedited shipping on orders over $250. Two-year hardware warranty
            included.
          </p>
        </div>

        <div>
          <div className="text-eyebrow mb-4">Shop</div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/shop" className="hover:text-foreground">
                All products
              </Link>
            </li>

            <li>
              <Link href="/categories" className="hover:text-foreground">
                Categories
              </Link>
            </li>

            <li>
              <Link href="/search" className="hover:text-foreground">
                Search
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-eyebrow mb-4">Company</div>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <Link href="/admin" className="hover:text-foreground">
                Admin
              </Link>
            </li>

            <li>
              <a className="hover:text-foreground" href="#">
                Press
              </a>
            </li>

            <li>
              <a className="hover:text-foreground" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            © {new Date().getFullYear()} NOIR Devices. All rights reserved.
          </div>
          <div className="font-mono tracking-wider uppercase">
            v1.0 · Demo build
          </div>
        </div>
      </div>
    </footer>
  );
}
