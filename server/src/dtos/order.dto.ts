import type { OrderStatus } from "@prisma/client";

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  orders: OrderResponseDto[];
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
  items: OrderItem[];
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
