import type { ApiResponse, ProductQuery } from "@/types/api.types";
import { products, brands } from "@/mocks/products.mock";
import {
  adaptProduct,
  adaptProducts,
} from "@/features/products/adapters/product.adapter";
import {
  CreateProductDto,
  Product,
  ProductResponseDto,
  UpdateProductDto,
} from "@/features/products/types/product.types";
import api from "@/services/axios";
import { API_ENDPOINTS } from "@/constants/api.constants";

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

export const productApi = {
  async list(query: ProductQuery = {}): Promise<Product[]> {
    const response = await api.get<ApiResponse<ProductResponseDto[]>>(
      API_ENDPOINTS.PRODUCTS,
      {
        params: query,
      },
    );
    return adaptProducts(response.data.data);
  },

  async getBySlug(slug: string) {
    await wait();

    return products.find((p) => p.slug === slug) ?? null;
  },

  async featured() {
    await wait();

    return products.filter((p) => p.featured);
  },

  async related(slug: string): Promise<Product[]> {
    await wait();
    const current = products.find((p) => p.slug === slug);
    if (!current) return [];
    return products
      .filter((p) => p.category === current.category && p.slug !== slug)
      .slice(0, 4);
  },

  async brands() {
    await wait();

    return brands;
  },

  async create(body: CreateProductDto): Promise<Product> {
    const response = await api.post<ApiResponse<ProductResponseDto>>(
      API_ENDPOINTS.PRODUCTS,
      body,
    );

    return adaptProduct(response.data.data);
  },

  async update({
    id,
    body,
  }: {
    id: string;
    body: UpdateProductDto;
  }): Promise<Product> {
    const response = await api.patch<ApiResponse<ProductResponseDto>>(
      `${API_ENDPOINTS.PRODUCTS}/${id}`,
      body,
    );
    return adaptProduct(response.data.data);
  },

  async delete(id: string): Promise<Product> {
    const response = await api.delete<ApiResponse<ProductResponseDto>>(
      `${API_ENDPOINTS.PRODUCTS}/${id}`,
    );

    return adaptProduct(response.data.data);
  },
};
