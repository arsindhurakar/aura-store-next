"use client";

import { AdminShell } from "@/features/admin/components/AdminShell";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname === "/admin/") return children;

  return <AdminShell>{children}</AdminShell>;
}
