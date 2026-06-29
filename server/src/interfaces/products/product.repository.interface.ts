import type { Product } from "@prisma/client";
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.js";

export interface IProductRepository {
  findMany(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(data: CreateProductInput): Promise<Product>;
  update(id: string, data: UpdateProductInput): Promise<Product>;
  delete(id: string): Promise<Product>;
}
