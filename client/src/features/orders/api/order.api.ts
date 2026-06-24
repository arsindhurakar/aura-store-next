import type { Order, CustomerInfo, OrderItem } from "@/types/order.types";
import { ordersMock } from "@/mocks/orders.mock";

const wait = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const newReference = () =>
  `NOIR-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;

export const orderApi = {
  async list(): Promise<Order[]> {
    await wait();
    return [...ordersMock].sort(
      (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
    );
  },
  async getById(id: string): Promise<Order | null> {
    await wait();
    return ordersMock.find((o) => o.id === id) ?? null;
  },
  async create(input: {
    items: OrderItem[];
    customer: CustomerInfo;
    shipping: number;
  }): Promise<Order> {
    await wait(500);
    const subtotal = input.items.reduce(
      (s, i) => s + i.unitPrice * i.quantity,
      0,
    );
    const total = subtotal + input.shipping;
    const order: Order = {
      id: `o_${Date.now()}`,
      reference: newReference(),
      items: input.items,
      subtotal,
      shipping: input.shipping,
      total,
      status: "pending",
      customer: input.customer,
      createdAt: new Date().toISOString(),
    };
    ordersMock.unshift(order);
    return order;
  },
};
