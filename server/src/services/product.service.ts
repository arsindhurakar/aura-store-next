import {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.js";
import { IProductRepository } from "@/interfaces/products/product.repository.interface.js";
import { IProductService } from "@/interfaces/products/product.service.interface.js";
import { ProductDto } from "@/dtos/product.dto.js";
import { toProductDto } from "@/mappers/product.mapper.js";
import { ProductRepository } from "@/repositories/product.repository.js";
import { ApiError } from "@/utils/api-error.js";

export class ProductService implements IProductService {
  constructor(private readonly repo: IProductRepository) {}

  async getAll(): Promise<ProductDto[]> {
    const products = await this.repo.findMany();

    return products.map(toProductDto);
  }

  async getById(id: string): Promise<ProductDto> {
    const product = await this.repo.findById(id);

    if (!product) {
      throw ApiError.notFound({ details: { id } });
    }

    return toProductDto(product);
  }

  async create(data: CreateProductInput): Promise<ProductDto> {
    const product = await this.repo.create({
      ...data,
      featured: data.featured ?? false,
    });

    return toProductDto(product);
  }

  async updateById({
    id,
    data,
  }: {
    id: string;
    data: UpdateProductInput;
  }): Promise<ProductDto> {
    const product = await this.repo.update(id, data);

    return toProductDto(product);
  }

  async deleteById(id: string): Promise<ProductDto> {
    const product = await this.repo.delete(id);

    return toProductDto(product);
  }
}

const productRepository = new ProductRepository();
export const productService = new ProductService(productRepository);
