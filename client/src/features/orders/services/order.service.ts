import { orderApi } from "../api/order.api";

export const orderService = {
  createOrder: orderApi.create,
  getOrder: orderApi.getById,
  getOrders: orderApi.list,
};
