"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Phone, StickyNote } from "lucide-react";

import { useOrder } from "@/hooks/useOrders";
import { formatPrice, STATUS_LABEL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.slug as string;

  const { data: order, isLoading } = useOrder(id);

  if (isLoading) {
    return <div className="text-muted-foreground">Loading...</div>;
  }

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to orders
      </Link>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-eyebrow font-mono">{order.reference}</div>

          <h1 className="mt-2 font-display text-4xl tracking-tight">
            {order.customer.fullName}
          </h1>

          <div className="mt-1 text-sm text-muted-foreground">
            Placed {new Date(order.createdAt).toLocaleString()}
          </div>
        </div>

        <span
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-mono uppercase tracking-widest",
            order.status === "delivered" && "border-success/40 text-success",
            order.status === "shipped" && "border-accent/40 text-accent",
            order.status === "processing" && "border-chart-4/40 text-chart-4",
            order.status === "pending" && "border-border text-muted-foreground",
            order.status === "cancelled" &&
              "border-destructive/40 text-destructive",
          )}
        >
          {STATUS_LABEL[order.status]}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="surface-elev rounded-2xl">
          <div className="border-b border-border p-6">
            <div className="text-eyebrow">Items</div>
          </div>

          <ul className="divide-y divide-border">
            {order.items.map((item) => (
              <li
                key={item.productId}
                className="flex items-center justify-between px-6 py-5"
              >
                <div>
                  <div className="text-sm font-medium">{item.name}</div>

                  <div className="text-xs text-muted-foreground">
                    ×{item.quantity} · {formatPrice(item.unitPrice)} ea
                  </div>
                </div>

                <div className="text-sm">
                  {formatPrice(item.unitPrice * item.quantity)}
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-2 border-t border-border p-6 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>

              <span>{formatPrice(order.subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>

              <span>
                {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
              </span>
            </div>

            <div className="flex items-baseline justify-between pt-3 text-base">
              <span>Total</span>

              <span className="font-display text-2xl">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        <aside className="surface-elev rounded-2xl p-6">
          <div className="text-eyebrow">Customer</div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="font-medium">{order.customer.fullName}</div>

            <div className="flex items-start gap-2 text-muted-foreground">
              <Phone className="mt-0.5 h-3.5 w-3.5" />
              {order.customer.phone}
            </div>

            {order.customer.email && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <Mail className="mt-0.5 h-3.5 w-3.5" />
                {order.customer.email}
              </div>
            )}

            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-3.5 w-3.5" />
              {order.customer.address}
            </div>

            {order.customer.notes && (
              <div className="flex items-start gap-2 text-muted-foreground">
                <StickyNote className="mt-0.5 h-3.5 w-3.5" />
                {order.customer.notes}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
