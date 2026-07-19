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
  images: StaticImageData[] | string[];
  featured: boolean;
  colors?: ProductColor[];
  tagline?: string;
  createdAt: string;
}

export interface ProductResponseDto {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  description: string;
  category: ProductCategory;
  brand: string;
  stockStatus: StockStatus;
  images: string[];
  featured: boolean;
  tagline?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDto {
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  description: string;
  tagline: string;
  category: ProductCategory;
  brand: string;
  stockStatus: StockStatus;
  images: string[];
  featured: boolean;
}

export type UpdateProductDto = CreateProductDto;
