import { orderService } from "@/features/orders/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const orderKeys = {
  all: ["orders"] as const,
  detail: (id: string) => ["orders", id] as const,
};

export const useOrders = () =>
  useQuery({
    queryKey: orderKeys.all,
    queryFn: () => orderService.getOrders(),
  });

export const useOrder = (id: string) =>
  useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => orderService.getOrder(id),
    enabled: !!id,
  });
