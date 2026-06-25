"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useFeatured } from "@/features/products/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";
import heroPhone from "@/assets/images/jpg/hero-phone.jpg";
import { useCategories } from "@/features/categories/hooks/useCategory";
import { Category } from "@/features/categories/types";
import { Product } from "@/features/products/types";

export default function PublicPage() {
  const { data: featured, isLoading } = useFeatured();
  const { data: categories } = useCategories();

  return (
    <>
      {/* HERO */}

      <section
        className="relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <Container className="relative grid gap-12 py-20 md:grid-cols-2 md:py-32">
          <div className="flex flex-col justify-center animate-fade-in-up">
            <div className="text-eyebrow">New · 2026 Collection</div>

            <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl">
              Devices, considered down to the gram.
            </h1>

            <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
              A focused catalogue of flagship phones and the few accessories
              worth owning. Engineered materials, honest pricing, two-year
              warranty.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/categories"
                className="inline-flex h-12 items-center rounded-full border border-border-strong px-6 text-sm font-medium text-foreground transition hover:bg-surface"
              >
                Browse categories
              </Link>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--accent)_30%,transparent),transparent_70%)] blur-3xl" />

            <Image
              src={heroPhone}
              alt="Aether Pro 15 - flagship smartphone"
              priority
              height={520}
              width={520}
              className="aspect-square w-full max-w-130 animate-float rounded-4xl object-cover"
            />
          </div>
        </Container>

        {/* TRUST */}

        <div className="border-y border-border/60 bg-background/40 backdrop-blur">
          <Container className="grid grid-cols-1 gap-6 py-6 text-sm md:grid-cols-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Truck className="h-4 w-4 text-accent" />
              Free expedited shipping over $250
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Two-year hardware warranty
            </div>

            <div className="flex items-center gap-3 text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              30-day no-questions returns
            </div>
          </Container>
        </div>
      </section>

      {/* CATEGORIES */}

      <Container className="py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-eyebrow">Explore</div>

            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Shop by category
            </h2>
          </div>

          <Link
            href="/categories"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(categories ?? []).map((c: Category) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.id}`}
              className="relative group product-frame aspect-4/5 flex flex-col justify-end p-6 overflow-hidden"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="absolute object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/30 to-transparent" />

              <div className="relative">
                <div className="text-eyebrow">{c.description}</div>

                <div className="mt-1 font-display text-2xl">{c.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </Container>

      {/* FEATURED */}

      <Container className="py-24">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-eyebrow">Featured</div>

            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              Hand-picked this season
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            Shop all →
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-square w-full rounded-2xl" />
                  <Skeleton className="mt-5 h-4 w-1/2" />
                </div>
              ))
            : (featured ?? []).map((p: Product, i: number) => (
                <ProductCard key={p.id} product={p} priority={i < 3} />
              ))}
        </div>
      </Container>

      {/* PROMO */}

      <Container className="pb-24">
        <div className="surface-elev relative overflow-hidden rounded-3xl p-10 md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <div className="text-eyebrow">Trade-in program</div>

            <h3 className="mt-4 font-display text-3xl tracking-tight md:text-5xl">
              Get up to $600 toward your next device.
            </h3>

            <p className="mt-4 text-muted-foreground">
              Send us your current phone, we&apos;ll handle the rest. Instant
              credit at checkout.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90"
            >
              Start a trade-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
