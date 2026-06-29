import {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.js";
import { IProductRepository } from "@/interfaces/products/product.repository.interface.js";
import { IProductService } from "@/interfaces/products/product.service.interface.js";
import { ProductResponseDto } from "@/dtos/product.dto.js";
import { toProductResponseDto } from "@/mappers/product.mapper.js";
import { ProductRepository } from "@/repositories/product.repository.js";
import { ApiError } from "@/utils/api-error.js";

export class ProductService implements IProductService {
  constructor(private readonly repo: IProductRepository) {}

  async getAll(): Promise<ProductResponseDto[]> {
    const products = await this.repo.findMany();

    return products.map(toProductResponseDto);
  }

  async getById(id: string): Promise<ProductResponseDto> {
    const product = await this.repo.findById(id);

    if (!product) {
      throw ApiError.notFound({ details: { id } });
    }

    return toProductResponseDto(product);
  }

  async create(data: CreateProductInput): Promise<ProductResponseDto> {
    const product = await this.repo.create({
      ...data,
      featured: data.featured ?? false,
    });

    return toProductResponseDto(product);
  }

  async updateById({
    id,
    data,
  }: {
    id: string;
    data: UpdateProductInput;
  }): Promise<ProductResponseDto> {
    const product = await this.repo.update(id, data);

    return toProductResponseDto(product);
  }

  async deleteById(id: string): Promise<ProductResponseDto> {
    const product = await this.repo.delete(id);

    return toProductResponseDto(product);
  }
}

const productRepository = new ProductRepository();
export const productService = new ProductService(productRepository);
