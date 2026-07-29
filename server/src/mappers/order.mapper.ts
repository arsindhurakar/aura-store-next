import { OrderItemResponseDto, OrderResponseDto } from "@/dtos/order.dto.js";
import type { OrderWithItems } from "@/types/order.types.js";
import { OrderItem } from "@prisma/client";

export const toOrderItemResponseDto = (
  data: OrderItem,
): OrderItemResponseDto => {
  return {
    id: data.id,
    orderId: data.orderId,
    productId: data.productId,
    quantity: data.quantity,
    price: data.price.toNumber(),
  };
};

export const toOrderResponseDto = (data: OrderWithItems): OrderResponseDto => {
  return {
    id: data.id,
    referenceId: data.referenceId,
    customerId: data.customerId,
    items: data.items.map(toOrderItemResponseDto),
    status: data.status,
    createdAt: data.createdAt.toISOString(),
    updatedAt: data.updatedAt.toISOString(),
  };
};
