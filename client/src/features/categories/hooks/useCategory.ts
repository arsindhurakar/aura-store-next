import { useQuery } from "@tanstack/react-query";

import { categoryService } from "../services/category.service";

export const categoryKeys = {
  all: ["categories"] as const,
  list: () => ["categories", "list"] as const,
};

export const useCategories = () =>
  useQuery({
    queryKey: categoryKeys.list(),
    queryFn: () => categoryService.getCategories(),
  });
