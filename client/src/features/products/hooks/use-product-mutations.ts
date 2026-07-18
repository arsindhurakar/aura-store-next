"use client";

import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { productKeys } from "@/features/products/hooks/use-product-queries";
import { productService } from "@/features/products/services/product.service";

function invalidateProducts(queryClient: QueryClient) {
  queryClient.invalidateQueries({
    queryKey: productKeys.all,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.createProduct,
    onSuccess: () => invalidateProducts(queryClient),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.updateProduct,
    onSuccess: () => invalidateProducts(queryClient),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess: () => invalidateProducts(queryClient),
  });
}
