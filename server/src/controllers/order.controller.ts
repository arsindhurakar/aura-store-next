import { Request, Response } from "express";

import { orderService } from "@/services/order.service.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { ok } from "@/utils/response.js";
import { IOrderService } from "@/interfaces/orders/order.service.interface.js";

const service: IOrderService = orderService;

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.getAll();

  res.json(ok(data));
});
