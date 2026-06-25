import { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { CategoriesList } from "@/features/categories/components/CategoriesList";

export const metadata: Metadata = {
  title: "Categories - NOIR",
  description: "Explore premium categories: phones, audio, wearables, and accessories.",
};

export default function CategoriesPage() {
  return (
    <Container className="py-16">
      <div className="text-eyebrow">Categories</div>

      <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
        Browse the catalogue
      </h1>

      <p className="mt-4 max-w-xl text-muted-foreground">
        Four edits. Each one tightly curated.
      </p>

      <CategoriesList />
    </Container>
  );
}
