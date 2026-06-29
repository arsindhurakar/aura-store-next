import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.js";
import type { ProductDto } from "@/dtos/product.dto.js";

export interface IProductService {
  getAll(): Promise<ProductDto[]>;
  getById(id: string): Promise<ProductDto>;
  create(data: CreateProductInput): Promise<ProductDto>;
  updateById({
    id,
    data,
  }: {
    id: string;
    data: UpdateProductInput;
  }): Promise<ProductDto>;
  deleteById(id: string): Promise<ProductDto>;
}
