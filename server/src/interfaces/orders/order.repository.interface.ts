import type { OrderWithItems } from "@/types/order.types.js";

export interface IOrderRepository {
  findMany(): Promise<OrderWithItems[]>;
  findOne(id: string): Promise<OrderWithItems | null>;
}
