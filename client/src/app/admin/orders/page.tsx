"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useOrders } from "@/hooks/useOrders";
import { formatPrice, STATUS_LABEL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function OrdersPage() {
  const { data: orders } = useOrders();

  return (
    <div className="space-y-8">
      <div>
        <div className="text-eyebrow">Fulfilment</div>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Orders</h1>
      </div>

      <div className="surface-elev overflow-hidden rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-widest text-muted-foreground">
              <th className="px-6 py-4 font-normal">Reference</th>

              <th className="hidden px-6 py-4 font-normal md:table-cell">
                Customer
              </th>

              <th className="hidden px-6 py-4 font-normal md:table-cell">
                Date
              </th>

              <th className="px-6 py-4 font-normal">Status</th>

              <th className="px-6 py-4 text-right font-normal">Total</th>

              <th className="px-6 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {(orders ?? []).map((order) => (
              <tr key={order.id} className="hover:bg-muted/30">
                <td className="px-6 py-4 font-mono text-xs">
                  {order.reference}
                </td>

                <td className="hidden px-6 py-4 text-sm md:table-cell">
                  {order.customer.fullName}
                </td>

                <td className="hidden px-6 py-4 text-sm text-muted-foreground md:table-cell">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-widest",
                      order.status === "delivered" &&
                        "border-success/40 text-success",
                      order.status === "shipped" &&
                        "border-accent/40 text-accent",
                      order.status === "processing" &&
                        "border-chart-4/40 text-chart-4",
                      order.status === "pending" &&
                        "border-border text-muted-foreground",
                      order.status === "cancelled" &&
                        "border-destructive/40 text-destructive",
                    )}
                  >
                    {STATUS_LABEL[order.status]}
                  </span>
                </td>

                <td className="px-6 py-4 text-right text-sm">
                  {formatPrice(order.total)}
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    View
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
