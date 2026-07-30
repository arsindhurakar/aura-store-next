import { getOrderById, getOrders } from "@/controllers/order.controller.js";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrderById);

export default orderRouter;
