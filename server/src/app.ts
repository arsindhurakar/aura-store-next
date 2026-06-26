import express from "express";

import { errorHandler } from "@/middleware/error-handler.js";
import { notFoundHandler } from "@/middleware/not-found.js";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ success: true, data: { message: "API is running!" } });
});

app.use("/api/products", productRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
