import prisma from "@/lib/prisma.js";
import { IOrderRepository } from "@/interfaces/orders/order.repository.interface.js";
import { OrderWithItems } from "@/types/order.types.js";

export class OrderRepository implements IOrderRepository {
  findMany() {
    return prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
      },
    });
  }

  findOne(id: string): Promise<OrderWithItems | null> {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }
}
