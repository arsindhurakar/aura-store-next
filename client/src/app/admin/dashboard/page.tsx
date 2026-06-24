"use client";

import Link from "next/link";

import {
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  Package,
  Users,
} from "lucide-react";

import { useOrders } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/constants";
import { useProducts } from "@/features/products/hooks/useProducts";
import { StatusPill } from "@/features/dashboard/components/StatusPill";

export default function DashboardPage() {
  const { data: orders } = useOrders();
  const { data: products } = useProducts();

  const revenue = (orders ?? []).reduce((sum, order) => sum + order.total, 0);

  const stats = [
    {
      label: "Revenue",
      value: formatPrice(revenue),
      delta: "+12.4%",
      icon: DollarSign,
    },
    {
      label: "Orders",
      value: orders?.length ?? 0,
      delta: "+4",
      icon: ShoppingBag,
    },
    {
      label: "Products",
      value: products?.length ?? 0,
      delta: "Stable",
      icon: Package,
    },
    {
      label: "Customers",
      value: orders?.length ?? 0,
      delta: "+3",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <div className="text-eyebrow">Overview</div>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="surface-elev rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-eyebrow">{stat.label}</div>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="mt-4 font-display text-3xl">{stat.value}</div>

            <div className="mt-2 text-xs text-success">{stat.delta}</div>
          </div>
        ))}
      </div>

      <div className="surface-elev rounded-2xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <div className="text-eyebrow">Activity</div>
            <h2 className="mt-1 font-display text-2xl">Recent orders</h2>
          </div>

          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            View all
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="divide-y divide-border">
          {(orders ?? []).slice(0, 5).map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-4 transition hover:bg-muted/40"
            >
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">
                  {order.customer.fullName}
                </div>

                <div className="font-mono text-xs text-muted-foreground">
                  {order.reference}
                </div>
              </div>

              <StatusPill status={order.status} />

              <div className="text-right text-sm">
                {formatPrice(order.total)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
