import { Prisma } from "@prisma/client";

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: true;
  };
}>;
