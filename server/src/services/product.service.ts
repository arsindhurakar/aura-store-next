import prisma from "@/lib/prisma.js";
import { ApiError } from "@/utils/api-error.js";
import { Product } from "@prisma/client";

export const productService = {
  async getAll(): Promise<Product[]> {
    return prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getById(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw ApiError.notFound("Product not found");
    }

    return product;
  },
};
