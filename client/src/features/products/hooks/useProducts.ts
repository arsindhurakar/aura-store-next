import { useQuery } from "@tanstack/react-query";
import { productService } from "@/features/products/services/product.service";
import type { ProductQuery } from "@/types/api.types";

export const productKeys = {
  all: ["products"] as const,
  list: (q: ProductQuery) => ["products", "list", q] as const,
  detail: (slug: string) => ["products", "detail", slug] as const,
  featured: ["products", "featured"] as const,
  related: (slug: string) => ["products", "related", slug] as const,
};

export const useProducts = (query: ProductQuery = {}) =>
  useQuery({
    queryKey: productKeys.list(query),
    queryFn: () => productService.getProducts(query),
  });

export const useProduct = (slug: string) =>
  useQuery({
    queryKey: productKeys.detail(slug),
    queryFn: () => productService.getProductBySlug(slug),
    enabled: !!slug,
  });

export const useFeatured = () =>
  useQuery({
    queryKey: productKeys.featured,
    queryFn: () => productService.getFeaturedProducts(),
  });

export const useRelated = (slug: string) =>
  useQuery({
    queryKey: productKeys.related(slug),
    queryFn: () => productService.getRelated(slug),
    enabled: !!slug,
  });
