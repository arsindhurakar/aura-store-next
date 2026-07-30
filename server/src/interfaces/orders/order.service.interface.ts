import { OrderResponseDto } from "@/dtos/order.dto.js";

export interface IOrderService {
  getAll(): Promise<OrderResponseDto[]>;
  getById(id: string): Promise<OrderResponseDto>;
}
