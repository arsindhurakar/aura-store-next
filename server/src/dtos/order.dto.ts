import type { OrderStatus } from "@prisma/client";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderItemResponseDto {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface OrderResponseDto {
  id: string;
  referenceId: string;
  customerId: string;
  items: OrderItemResponseDto[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
