import prisma from "@/lib/prisma.js";
import { IOrderRepository } from "@/interfaces/orders/order.repository.interface.js";
import { Order } from "@prisma/client";

export class OrderRepository implements IOrderRepository {
  getMany() {
    return prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        items: true,
      },
    });
  }
}
