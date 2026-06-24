import type { ProductQuery } from "@/types/api.types";
import { products, brands } from "@/mocks/products.mock";
import { Product } from "../types";

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const productApi = {
  async list(query: ProductQuery = {}): Promise<Product[]> {
    await wait();
    let result = [...products];
    if (query.category)
      result = result.filter((p) => p.category === query.category);
    if (query.brand) result = result.filter((p) => p.brand === query.brand);
    if (query.search) {
      const q = query.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    switch (query.sort) {
      case "price_asc":
        result.sort(
          (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price),
        );
        break;
      case "price_desc":
        result.sort(
          (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price),
        );
        break;
      case "featured":
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
      case "newest":
      default:
        result.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    }
    return result;
  },

  async getBySlug(slug: string) {
    await wait();

    return products.find((p) => p.slug === slug) ?? null;
  },

  async featured() {
    await wait();

    return products.filter((p) => p.featured);
  },

  async related(slug: string): Promise<Product[]> {
    await wait();
    const current = products.find((p) => p.slug === slug);
    if (!current) return [];
    return products
      .filter((p) => p.category === current.category && p.slug !== slug)
      .slice(0, 4);
  },

  async brands() {
    await wait();

    return brands;
  },
};
