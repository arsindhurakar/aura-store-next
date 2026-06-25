"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Truck, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/features/products/components/ProductCard";
import { Product } from "@/features/products/types";
import { useCart } from "@/store/cart.store";
import { STATUS_LABEL, formatPrice } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductViewProps {
  product: Product;
  related?: Product[];
}

export function ProductView({
  product,
  related = [],
}: ProductViewProps) {
  const add = useCart((s) => s.add);

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const onSale = product.salePrice && product.salePrice < product.price;
  const price = product.salePrice ?? product.price;
  const selectedColor = activeColor ?? product.colors?.[0]?.name;

  return (
    <>
      <Container className="py-10">
        <nav className="text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link href="/shop" className="hover:text-foreground">
            Shop
          </Link>

          <span className="mx-2">/</span>

          <span className="text-foreground">{product.name}</span>
        </nav>
      </Container>

      <Container className="grid gap-12 pb-20 lg:grid-cols-[1.1fr_1fr]">
        {/* Gallery */}

        <div className="space-y-4">
          <div className="product-frame relative aspect-square">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover animate-fade-in-up"
            />
          </div>

          <div className="grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImage(i)}
                className={cn(
                  "product-frame relative aspect-square overflow-hidden transition",
                  activeImage === i
                    ? "ring-2 ring-accent"
                    : "opacity-70 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}

        <div className="flex flex-col">
          <div className="text-eyebrow">{product.brand}</div>

          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl text-balance">
            {product.name}
          </h1>

          {product.tagline && (
            <p className="mt-3 text-lg text-muted-foreground">
              {product.tagline}
            </p>
          )}

          <div className="mt-8 flex items-baseline gap-3">
            <div className="font-display text-4xl">{formatPrice(price)}</div>

            {onSale && (
              <div className="text-base text-muted-foreground line-through">
                {formatPrice(product.price)}
              </div>
            )}
          </div>

          <div
            className={cn(
              "mt-3 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs",
              product.stockStatus === "out_of_stock"
                ? "border-destructive/40 text-destructive"
                : "border-border text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                product.stockStatus === "in_stock" && "bg-success",
                product.stockStatus === "low_stock" && "bg-accent",
                product.stockStatus === "out_of_stock" && "bg-destructive",
              )}
            />

            {STATUS_LABEL[product.stockStatus]}
          </div>

          <p className="mt-8 max-w-prose text-base text-muted-foreground">
            {product.description}
          </p>

          {/* Color Selector */}

          {product.colors?.length ? (
            <div className="mt-10">
              <div className="flex items-baseline justify-between">
                <div className="text-eyebrow">Color</div>

                <div className="text-sm text-muted-foreground">
                  {selectedColor}
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const isActive = selectedColor === color.name;

                  return (
                    <button
                      key={color.name}
                      type="button"
                      aria-label={color.name}
                      aria-pressed={isActive}
                      title={color.name}
                      onClick={() => setActiveColor(color.name)}
                      className={cn(
                        "relative h-10 w-10 rounded-full border transition",
                        isActive
                          ? "border-foreground ring-2 ring-foreground/20 ring-offset-2 ring-offset-background"
                          : "border-border hover:border-foreground/40",
                      )}
                    >
                      <span
                        className="absolute inset-1 rounded-full"
                        style={{
                          backgroundColor: color.hex,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Qty + CTA */}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div className="flex h-12 items-center rounded-full border border-border">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-muted-foreground cursor-pointer hover:text-foreground"
              >
                <Minus className="h-4 w-4" />
              </button>

              <span className="w-8 text-center font-mono text-sm">{qty}</span>

              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-12 w-12 items-center justify-center text-muted-foreground cursor-pointer hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              type="button"
              disabled={product.stockStatus === "out_of_stock"}
              onClick={() => {
                const color = product.colors?.length
                  ? selectedColor
                  : undefined;

                add(product, qty, color);

                toast.success("Added to cart", {
                  description: color
                    ? `${product.name} - ${color}`
                    : product.name,
                });
              }}
              size="lg"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to cart - {formatPrice(price * qty)}
            </Button>
          </div>

          {/* Benefits */}

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="hairline flex items-center gap-3 rounded-xl p-4 text-sm">
              <Truck className="h-4 w-4 text-accent" />
              Free expedited shipping
            </div>

            <div className="hairline flex items-center gap-3 rounded-xl p-4 text-sm">
              <ShieldCheck className="h-4 w-4 text-accent" />
              2-year warranty
            </div>
          </div>

          {/* Specifications */}

          <div className="mt-12">
            <div className="mb-4 text-eyebrow">Specifications</div>

            <dl className="grid grid-cols-1 divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-y-0">
              {product.specifications.map((spec, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center justify-between py-4 sm:px-4",
                    index % 2 === 0 ? "sm:border-r sm:border-border" : "",
                  )}
                >
                  <dt className="text-sm text-muted-foreground">
                    {spec.label}
                  </dt>

                  <dd className="text-sm font-medium">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>

      {/* Related Products */}

      {related.length > 0 && (
        <Container className="border-t border-border py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              You may also like
            </h2>

            <Link
              href="/shop"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Shop all →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
