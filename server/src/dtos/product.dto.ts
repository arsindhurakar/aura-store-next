import { type Category, type StockStatus } from "@/types/product.types.js";

export interface ProductDto {
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
}
