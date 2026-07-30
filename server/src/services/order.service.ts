import { OrderResponseDto } from "@/dtos/order.dto.js";
import { IOrderRepository } from "@/interfaces/orders/order.repository.interface.js";
import { IOrderService } from "@/interfaces/orders/order.service.interface.js";
import { toOrderResponseDto } from "@/mappers/order.mapper.js";
import { OrderRepository } from "@/repositories/order.repository.js";
import { ApiError } from "@/utils/api-error.js";

export class OrderService implements IOrderService {
  constructor(private readonly repo: IOrderRepository) {}

  async getAll(): Promise<OrderResponseDto[]> {
    const orders = await this.repo.findMany();

    return orders.map(toOrderResponseDto);
  }

  async getById(id: string): Promise<OrderResponseDto> {
    const order = await this.repo.findOne(id);

    if (!order) {
      throw ApiError.notFound({
        details: { id },
        message: "Order not found",
      });
    }

    return toOrderResponseDto(order);
  }
}

const orderRepository = new OrderRepository();

export const orderService = new OrderService(orderRepository);
