import { StaticImageData } from "next/image";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  image: StaticImageData;
  unitPrice: number;
  quantity: number;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  reference: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  customer: CustomerInfo;
  createdAt: string;
}
