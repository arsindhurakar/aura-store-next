import { ProductQuery } from "@/types/api.types";
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "@/features/products/types/product.types";
import { productApi } from "@/features/products/api/product.api";

export const productService = {
  getProducts(query: ProductQuery = {}): Promise<Product[]> {
    return productApi.list(query);
  },

  getProductBySlug(slug: string) {
    return productApi.getBySlug(slug);
  },

  getFeaturedProducts() {
    return productApi.featured();
  },

  getRelated(slug: string) {
    return productApi.related(slug);
  },

  getBrands() {
    return productApi.brands();
  },

  createProduct(body: CreateProductDto): Promise<Product> {
    return productApi.create(body);
  },

  updateProduct({ id, body }: { id: string; body: UpdateProductDto }) {
    return productApi.update({ id, body });
  },

  deleteProduct(id: string): Promise<Product> {
    return productApi.delete(id);
  },
};
