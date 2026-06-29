import express from "express";

import { errorHandler } from "@/middlewares/error-handler.js";
import { notFoundHandler } from "@/middlewares/not-found.js";
import productRouter from "./routes/product.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ success: true, data: { message: "API is running!" } });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
