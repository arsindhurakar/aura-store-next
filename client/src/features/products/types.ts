import { ProductCategory, StockStatus } from "@/types";
import { StaticImageData } from "next/image";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  description: string;
  specifications: ProductSpec[];
  category: ProductCategory;
  brand: string;
  stockStatus: StockStatus;
  images: StaticImageData[];
  featured: boolean;
  colors?: ProductColor[];
  tagline?: string;
  createdAt: string;
}
