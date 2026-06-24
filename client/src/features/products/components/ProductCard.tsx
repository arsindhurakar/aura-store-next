"use client";

import Link from "next/link";
import Image from "next/image";

import { formatPrice, STATUS_LABEL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Product } from "../types";

export function ProductCard({
  product,
  priority,
}: {
  product: Product;
  priority?: boolean;
}) {
  const onSale = product.salePrice && product.salePrice < product.price;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block animate-fade-in-up"
    >
      <div className="product-frame relative aspect-square">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {onSale && (
          <span className="absolute left-4 top-4 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-background">
            Save {formatPrice(product.price - (product.salePrice ?? 0))}
          </span>
        )}

        {product.stockStatus === "low_stock" && (
          <span className="absolute right-4 top-4 rounded-full bg-background/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-foreground backdrop-blur">
            {STATUS_LABEL.low_stock}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-eyebrow">{product.brand}</div>

          <h3 className="mt-1 truncate text-base font-medium tracking-tight">
            {product.name}
          </h3>
        </div>

        <div className="text-right">
          {onSale ? (
            <>
              <div className="text-base font-medium">
                {formatPrice(product.salePrice!)}
              </div>

              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </div>
            </>
          ) : (
            <div className="text-base font-medium">
              {formatPrice(product.price)}
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "mt-2 text-xs",
          product.stockStatus === "out_of_stock"
            ? "text-destructive"
            : "text-muted-foreground",
        )}
      >
        {STATUS_LABEL[product.stockStatus]}
      </div>
    </Link>
  );
}
