import type { ProductSort } from "./shared.types";

export interface ApiListResult<T> {
  items: T[];
  total: number;
}

export interface ProductQuery {
  category?: string;
  brand?: string;
  search?: string;
  sort?: ProductSort;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
