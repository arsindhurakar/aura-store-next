import { AdminShell } from "@/features/admin/components/AdminShell";
import { usePathname } from "next/navigation";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname === "/admin/") {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
