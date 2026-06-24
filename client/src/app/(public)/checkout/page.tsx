"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { Container } from "@/components/layout/Container";
import { useCart } from "@/store/cart.store";
import { checkoutSchema, type CheckoutInput } from "@/lib/validators";
import {
  formatPrice,
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_FEE,
} from "@/lib/constants";
import { EmptyState } from "@/components/common/EmptyState";

import { ShoppingBag, Lock } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { orderService } from "@/features/orders/services/order.service";

export default function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);

  const router = useRouter();

  const subtotal = lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

  const total = subtotal + shipping;

  const form = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
  });

  const placeOrder = useMutation({
    mutationFn: async (data: CheckoutInput) =>
      orderService.createOrder({
        items: lines.map((line) => ({
          productId: line.productId,
          name: line.name,
          image: line.image,
          unitPrice: line.unitPrice,
          quantity: line.quantity,
        })),
        customer: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email || undefined,
          address: data.address,
          notes: data.notes || undefined,
        },
        shipping,
      }),

    onSuccess: (order) => {
      clear();
      router.push(`/order-success?ref=${order.reference}`);
    },

    onError: () => {
      toast.error("Couldn't place order. Please try again.");
    },
  });

  if (lines.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<ShoppingBag className="h-5 w-5" />}
          title="Your cart is empty"
          description="Add something to your bag before checking out."
          action={
            <Link
              href="/shop"
              className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background"
            >
              Shop now
            </Link>
          }
        />
      </Container>
    );
  }

  return (
    <Container className="py-16">
      <div className="text-eyebrow">Checkout</div>

      <h1 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
        Delivery details
      </h1>

      <form
        onSubmit={form.handleSubmit((data) => placeOrder.mutate(data))}
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-6">
          <Field
            label="Full name"
            error={form.formState.errors.fullName?.message}
          >
            <input
              {...form.register("fullName")}
              className={input}
              placeholder="Jane Doe"
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Phone number"
              error={form.formState.errors.phone?.message}
            >
              <input
                {...form.register("phone")}
                className={input}
                placeholder="+1 415 555 0142"
              />
            </Field>

            <Field
              label="Email (optional)"
              error={form.formState.errors.email?.message}
            >
              <input
                {...form.register("email")}
                className={input}
                placeholder="you@example.com"
              />
            </Field>
          </div>

          <Field
            label="Delivery address"
            error={form.formState.errors.address?.message}
          >
            <textarea
              {...form.register("address")}
              rows={3}
              className={input}
              placeholder="Street, city, postal code"
            />
          </Field>

          <Field
            label="Additional notes"
            error={form.formState.errors.notes?.message}
          >
            <textarea
              {...form.register("notes")}
              rows={2}
              className={input}
              placeholder="Delivery instructions, gift message…"
            />
          </Field>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Your information is used only to fulfil this order.
          </div>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="surface-elev rounded-2xl p-6">
            <div className="text-eyebrow mb-4">Order summary</div>

            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.productId}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="product-frame h-12 w-12 shrink-0">
                    <Image
                      src={line.image}
                      alt=""
                      height={48}
                      width={48}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="truncate">{line.name}</div>

                    <div className="text-xs text-muted-foreground">
                      ×{line.quantity}
                    </div>
                  </div>

                  <div>{formatPrice(line.unitPrice * line.quantity)}</div>
                </li>
              ))}
            </ul>

            <div className="my-4 h-px bg-border" />

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>

              <div className="my-3 h-px bg-border" />

              <div className="flex items-baseline justify-between">
                <dt>Total</dt>

                <dd className="font-display text-2xl">{formatPrice(total)}</dd>
              </div>
            </dl>

            <button
              type="submit"
              disabled={placeOrder.isPending}
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
            >
              {placeOrder.isPending
                ? "Placing order..."
                : `Place order — ${formatPrice(total)}`}
            </button>
          </div>
        </aside>
      </form>
    </Container>
  );
}

const input =
  "w-full rounded-xl border border-border bg-transparent px-4 py-3 text-sm transition placeholder:text-muted-foreground focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent/30";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </div>

      {children}

      {error && <div className="mt-1.5 text-xs text-destructive">{error}</div>}
    </label>
  );
}
