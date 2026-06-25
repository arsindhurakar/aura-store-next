"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { useCart } from "@/store/cart.store";
import {
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
} from "@/lib/constants";
import { EmptyState } from "@/components/common/EmptyState";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const updateQty = useCart((s) => s.updateQty);
  const remove = useCart((s) => s.remove);

  const subtotal = lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );

  const shipping =
    subtotal === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const total = subtotal + shipping;

  return (
    <Container className="py-16">
      <div className="text-eyebrow">Bag</div>

      <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
        Your cart
      </h1>

      {lines.length === 0 ? (
        <div className="mt-16">
          <EmptyState
            icon={<ShoppingBag className="h-5 w-5" />}
            title="Your cart is empty"
            description="When you find something exceptional, it'll live here."
            action={
              <Link
                href="/shop"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background"
              >
                Browse the catalogue
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
          <ul className="space-y-4">
            {lines.map((line) => (
              <li
                key={`${line.productId}-${line.color ?? ""}`}
                className="surface-elev flex items-center gap-5 rounded-2xl p-4 sm:p-5"
              >
                <Link
                  href={`/shop/${line.slug}`}
                  className="product-frame relative h-24 w-24 shrink-0 sm:h-28 sm:w-28"
                >
                  <Image
                    src={line.image}
                    alt={line.name}
                    height={112}
                    width={112}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/shop/${line.slug}`}
                    className="truncate font-medium hover:underline"
                  >
                    {line.name}
                  </Link>

                  {line.color && (
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      Color: {line.color}
                    </div>
                  )}

                  <div className="mt-1 text-xs text-muted-foreground">
                    {formatPrice(line.unitPrice)} each
                  </div>

                  <div className="mt-3 inline-flex items-center rounded-full border border-border">
                    <button
                      onClick={() =>
                        updateQty(line.productId, line.quantity - 1)
                      }
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground cursor-pointer hover:text-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>

                    <span className="w-7 text-center text-sm">
                      {line.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(line.productId, line.quantity + 1)
                      }
                      className="flex h-8 w-8 items-center justify-center text-muted-foreground cursor-pointer hover:text-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="font-medium">
                    {formatPrice(line.unitPrice * line.quantity)}
                  </div>

                  <button
                    onClick={() => remove(line.productId)}
                    className="text-muted-foreground cursor-pointer hover:text-destructive"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="surface-elev rounded-2xl p-6">
              <div className="text-eyebrow mb-4">Summary</div>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                </div>

                <div className="my-4 h-px bg-border" />

                <div className="flex items-baseline justify-between">
                  <dt className="text-base">Total</dt>
                  <dd className="font-display text-2xl">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>

              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <div className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                  Spend {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more
                  for free shipping.
                </div>
              )}

              <Link
                href="/checkout"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm font-medium text-background transition hover:opacity-90"
              >
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/shop"
                className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground"
              >
                Continue shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </Container>
  );
}
