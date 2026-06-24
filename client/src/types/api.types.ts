import { ProductSort } from ".";

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
