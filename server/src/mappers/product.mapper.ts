import { ProductDto } from "@/dtos/product.dto.js";
import { Product } from "@prisma/client";

export function toProductDto(product: Product): ProductDto {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price.toNumber(),
    salePrice: product.salePrice?.toNumber() ?? null,
    description: product.description,
    tagline: product.tagline,
    category: product.category,
    brand: product.brand,
    stockStatus: product.stockStatus,
    images: product.images,
    featured: product.featured,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}
