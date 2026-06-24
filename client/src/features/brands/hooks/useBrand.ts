import { useQuery } from "@tanstack/react-query";
import { brandService } from "../services/brand.service";

export const brandKeys = {
  all: ["brands"] as const,
  list: ["brands", "list"] as const,
  detail: (id: string) => ["brands", "detail", id] as const,
};

export const useBrands = () =>
  useQuery({
    queryKey: brandKeys.list,
    queryFn: () => brandService.getBrands(),
  });
