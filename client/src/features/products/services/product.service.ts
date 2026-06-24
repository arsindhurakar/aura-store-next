import { productApi } from "../api/product.api";

export const productService = {
  getProducts: productApi.list,
  getProductBySlug: productApi.getBySlug,
  getFeaturedProducts: productApi.featured,
  getRelated: productApi.related,
  getBrands: productApi.brands,
};
