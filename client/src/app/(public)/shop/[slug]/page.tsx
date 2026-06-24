import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { productService } from "@/features/products/services/product.service";
import ProductView from "./ProductView";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await productService.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} — NOIR`,
    description: product.tagline ?? product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await productService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await productService.getRelated(slug);

  return <ProductView product={product} related={related} />;
}
