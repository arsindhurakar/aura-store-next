"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { EmptyState } from "@/components/common/EmptyState";
import { ProductGridSkeleton } from "@/features/products/components/ProductGridSkeleton";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";

const SUGGESTIONS = [
  "Aether Pro",
  "Headphones",
  "Smartwatch",
  "Wireless charger",
  "Leather case",
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") ?? "";

  const { data, isLoading } = useProducts({
    search: q,
  });

  const handleSearch = (formData: FormData) => {
    const query = String(formData.get("q") ?? "").trim();

    if (!query) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-eyebrow text-center">Search</div>

        <h1 className="mt-3 text-center font-display text-4xl tracking-tight md:text-5xl">
          Find something exceptional.
        </h1>

        <form action={(formData) => handleSearch(formData)} className="mt-10">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              key={q}
              name="q"
              defaultValue={q}
              autoFocus
              placeholder="Search phones, audio, accessories…"
              className="h-14 w-full rounded-full border border-border bg-surface pl-12 pr-5 text-base outline-none transition focus:border-border-strong focus:ring-2 focus:ring-accent/30"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Try:</span>

            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() =>
                  router.push(`/search?q=${encodeURIComponent(suggestion)}`)
                }
                className="rounded-full border border-border px-3 py-1 transition hover:border-border-strong hover:text-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </form>
      </div>

      <div className="mt-16">
        {!q ? (
          <EmptyState
            icon={<SearchIcon className="h-5 w-5" />}
            title="Search the catalogue"
            description="Find a product by name, brand, or category."
          />
        ) : isLoading ? (
          <ProductGridSkeleton count={3} />
        ) : !data?.length ? (
          <EmptyState
            icon={<SearchIcon className="h-5 w-5" />}
            title="No matches"
            description={`We couldn't find anything for "${q}". Try a broader term.`}
            action={
              <Link
                href="/shop"
                className="inline-flex h-10 items-center rounded-full border border-border-strong px-5 text-sm"
              >
                Browse all
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
