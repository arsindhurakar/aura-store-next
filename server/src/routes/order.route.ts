import { getOrders } from "@/controllers/order.controller.js";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", getOrders);

export default orderRouter;
