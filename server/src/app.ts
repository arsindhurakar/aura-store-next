import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";

import { errorHandler } from "@/middlewares/error-handler.js";
import { notFoundHandler } from "@/middlewares/not-found.js";
import { logger } from "@/logger/index.js";
import authRouter from "@/routes/auth.route.js";
import productRouter from "@/routes/product.route.js";
import orderRouter from "@/routes/order.route.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.disable("etag");
}

app.use(
  pinoHttp({
    logger,
    autoLogging: false,
  }),
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ success: true, data: { message: "API is running!" } });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
