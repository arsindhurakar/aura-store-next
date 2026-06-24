"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LayoutGrid, List, PackageOpen } from "lucide-react";
import Image from "next/image";

import { useProducts } from "@/features/products/hooks/useProducts";
import { useCategories } from "@/features/categories/hooks/useCategory";
import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/features/products/components/ProductCard";
import { ProductGridSkeleton } from "@/features/products/components/ProductGridSkeleton";
import { EmptyState } from "@/components/common/EmptyState";
import { CATEGORY_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ProductQuery } from "@/types/api.types";
import { ProductSort } from "@/types";
import { useBrands } from "@/features/brands/hooks/useBrand";

const DEFAULT_SORT: ProductSort = "newest";

function isValidSort(value: string | null): value is ProductSort {
  return (
    value === "newest" ||
    value === "price_asc" ||
    value === "price_desc" ||
    value === "featured"
  );
}

export default function ShopPageClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [view, setView] = useState<"grid" | "list">("grid");

  const search: ProductQuery = useMemo(() => {
    const sort = params.get("sort");

    return {
      category: params.get("category") ?? undefined,
      brand: params.get("brand") ?? undefined,
      sort: isValidSort(sort) ? sort : DEFAULT_SORT,
    };
  }, [params]);

  const update = (patch: Partial<ProductQuery>) => {
    const next = {
      ...search,
      ...patch,
    };

    const query = new URLSearchParams();

    if (next.category) query.set("category", next.category);

    if (next.brand) query.set("brand", next.brand);

    if (next.sort) query.set("sort", next.sort);

    router.push(`/shop?${query.toString()}`);
  };

  const resetFilters = () => {
    router.push("/shop");
  };

  const { data: products, isLoading } = useProducts(search);

  const { data: categories } = useCategories();

  const { data: brands } = useBrands();

  return (
    <Container className="py-12 md:py-16">
      {/* Header */}

      <div className="flex flex-col gap-4">
        <div className="text-eyebrow">Catalogue</div>

        <h1 className="font-display text-4xl tracking-tight md:text-6xl">
          {search.category
            ? (CATEGORY_LABELS[search.category] ?? "Shop")
            : "All products"}
        </h1>

        <p className="max-w-xl text-muted-foreground">
          A curated catalogue. Every product passes a long checklist before it
          earns a place here.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        {/*' Filters */}

        <aside className="space-y-8">
          {/* Category */}

          <div>
            <div className="text-eyebrow mb-3">Category</div>

            <ul className="space-y-2">
              <li>
                <button
                  onClick={() =>
                    update({
                      category: undefined,
                    })
                  }
                  className={cn(
                    "block w-full text-left text-sm transition",
                    !search.category
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  All
                </button>
              </li>

              {categories?.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() =>
                      update({
                        category: c.id,
                      })
                    }
                    className={cn(
                      "block w-full text-left text-sm transition",
                      search.category === c.id
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand */}

          <div>
            <div className="text-eyebrow mb-3">Brand</div>

            <ul className="space-y-2">
              <li>
                <button
                  onClick={() =>
                    update({
                      brand: undefined,
                    })
                  }
                  className={cn(
                    "block w-full text-left text-sm transition",
                    !search.brand
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  All brands
                </button>
              </li>

              {brands?.map((brand) => (
                <li key={brand}>
                  <button
                    onClick={() =>
                      update({
                        brand,
                      })
                    }
                    className={cn(
                      "block w-full text-left text-sm transition",
                      search.brand === brand
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {brand}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Results */}

        <div>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="text-sm text-muted-foreground">
              {products ? `${products.length} products` : "Loading..."}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={search.sort}
                onChange={(e) =>
                  update({
                    sort: e.target.value as ProductSort,
                  })
                }
                className="h-9 rounded-full border border-border bg-transparent px-3 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="featured">Featured</option>
                <option value="price_asc">Price low-high</option>
                <option value="price_desc">Price high-low</option>
              </select>

              <div className="flex h-9 items-center rounded-full border border-border p-0.5">
                <button
                  onClick={() => setView("grid")}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    view === "grid" && "bg-foreground text-background",
                  )}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>

                <button
                  onClick={() => setView("list")}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    view === "list" && "bg-foreground text-background",
                  )}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : !products || products.length === 0 ? (
            <EmptyState
              icon={<PackageOpen className="h-5 w-5" />}
              title="Nothing here yet"
              description="Try a different category or brand."
              action={
                <button
                  onClick={resetFilters}
                  className="inline-flex h-10 items-center rounded-full border border-border-strong px-5 text-sm"
                >
                  Reset filters
                </button>
              }
            />
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  className="surface-elev group flex items-center gap-6 rounded-2xl p-4 transition hover:border-border-strong"
                >
                  <div className="product-frame h-28 w-28 shrink-0">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      height={112}
                      width={112}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-eyebrow">{p.brand}</div>

                    <div className="truncate font-medium">{p.name}</div>

                    <div className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                      {p.tagline}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-medium">${p.salePrice ?? p.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
