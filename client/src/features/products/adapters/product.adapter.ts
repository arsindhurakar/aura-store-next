import {
  Product,
  ProductResponseDto,
} from "@/features/products/types/product.types";

export function adaptProduct(dto: ProductResponseDto): Product {
  return {
    ...dto,
    specifications: [{ label: "", value: "" }],
  };
}

export function adaptProducts(dtos: ProductResponseDto[]): Product[] {
  return dtos.map(adaptProduct);
}
