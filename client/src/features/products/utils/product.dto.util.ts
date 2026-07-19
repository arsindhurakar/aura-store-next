import {
  CreateProductDto,
  UpdateProductDto,
} from "@/features/products/types/product.types";
import { ProductFormInput } from "@/lib/validators";

export function mapFormToCreateProductDto(
  values: ProductFormInput,
): CreateProductDto {
  return {
    name: values.name.trim(),
    price: values.price,
    brand: values.brand.trim(),
    category: values.category,
    description: values.description.trim(),
    featured: false,
    images: [
      "https://nettturiyfvdosmoturf.supabase.co/storage/v1/object/sign/product-images/p-phone-2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjgzMTUyZi0xNmVlLTRjNGQtYjdkNi1mNDZkYzQ5YTYwMjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9kdWN0LWltYWdlcy9wLXBob25lLTIuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NDM3NDI5NSwiZXhwIjoxNzg0OTc5MDk1fQ.ncKMhvX9habMKRIQNq_R6CNZsqI2BbJB6e8rqa6a-4A",
    ],
    salePrice: values.salePrice,
    stockStatus: values.stockStatus,
    slug: "a-test-slug-1",
    tagline: "",
  };
}

export function mapFormToUpdateProductDto(
  values: ProductFormInput,
): UpdateProductDto {
  return {
    name: values.name.trim(),
    price: values.price,
    brand: values.brand.trim(),
    category: values.category,
    description: values.description.trim(),
    featured: false,
    images: [
      "https://nettturiyfvdosmoturf.supabase.co/storage/v1/object/sign/product-images/p-phone-2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV83NjgzMTUyZi0xNmVlLTRjNGQtYjdkNi1mNDZkYzQ5YTYwMjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9kdWN0LWltYWdlcy9wLXBob25lLTIuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NDM3NDI5NSwiZXhwIjoxNzg0OTc5MDk1fQ.ncKMhvX9habMKRIQNq_R6CNZsqI2BbJB6e8rqa6a-4A",
    ],
    salePrice: values.salePrice,
    stockStatus: values.stockStatus,
    slug: "a-test-slug-1",
    tagline: "",
  };
}
