import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.js";
import type { ProductResponseDto } from "@/dtos/product.dto.js";

export interface IProductService {
  getAll(): Promise<ProductResponseDto[]>;
  getById(id: string): Promise<ProductResponseDto>;
  create(data: CreateProductInput): Promise<ProductResponseDto>;
  updateById({
    id,
    data,
  }: {
    id: string;
    data: UpdateProductInput;
  }): Promise<ProductResponseDto>;
  deleteById(id: string): Promise<ProductResponseDto>;
}
