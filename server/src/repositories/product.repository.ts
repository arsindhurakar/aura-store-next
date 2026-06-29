import { IProductRepository } from "@/interfaces/products/product.repository.interface.js";
import prisma from "@/lib/prisma.js";
import {
  CreateProductInput,
  UpdateProductInput,
} from "@/schemas/product.schema.js";
import { Product } from "@prisma/client";

export class ProductRepository implements IProductRepository {
  findMany(): Promise<Product[]> {
    return prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { id } });
  }

  create(data: CreateProductInput): Promise<Product> {
    return prisma.product.create({ data });
  }

  update(id: string, data: UpdateProductInput): Promise<Product> {
    return prisma.product.update({ where: { id }, data });
  }

  delete(id: string): Promise<Product> {
    return prisma.product.delete({ where: { id } });
  }
}
