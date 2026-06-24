"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useCategories } from "../hooks/useCategory";

export default function CategoriesList() {
  const { data: categories } = useCategories();

  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {(categories ?? []).map((c) => (
        <Link
          key={c.id}
          href={`/shop?category=${c.id}`}
          className="product-frame group relative aspect-16/10 flex items-end p-8 transition hover:border-border-strong"
        >
          <Image
            src={c.image}
            alt={c.name}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />

          <div className="relative w-full">
            <div className="text-eyebrow">{c.description}</div>

            <div className="mt-2 flex justify-between items-center">
              <div className="font-display text-3xl md:text-4xl">{c.name}</div>

              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
