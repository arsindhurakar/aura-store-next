import { OrderResponseDto } from "@/dtos/order.dto.js";
import { IOrderRepository } from "@/interfaces/orders/order.repository.interface.js";
import { IOrderService } from "@/interfaces/orders/order.service.interface.js";
import { toOrderResponseDto } from "@/mappers/order.mapper.js";
import { OrderRepository } from "@/repositories/order.repository.js";

export class OrderService implements IOrderService {
  constructor(private readonly repo: IOrderRepository) {}

  async getAll(): Promise<OrderResponseDto[]> {
    const orders = await this.repo.getMany();

    return orders.map(toOrderResponseDto);
  }
}

const orderRepository = new OrderRepository();

export const orderService = new OrderService(orderRepository);
