import { getOrderById, getOrders } from "@/controllers/order.controller.js";
import { validateParams } from "@/middlewares/validator.js";
import { paramIdSchema } from "@/schemas/index.js";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:id", validateParams(paramIdSchema), getOrderById);

export default orderRouter;
