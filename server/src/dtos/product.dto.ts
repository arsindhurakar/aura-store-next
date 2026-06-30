import type { Category, StockStatus } from "@/types/product.types.js";

export type ProductResponseDto = {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice: number | null;
  description: string;
  tagline: string | null;
  category: Category;
  brand: string;
  stockStatus: StockStatus;
  images: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};
