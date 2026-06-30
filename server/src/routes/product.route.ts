import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/controllers/product.controller.js";
import { validate } from "@/middlewares/validator.js";
import {
  createProductSchema,
  updateProductSchema,
} from "@/schemas/product.schema.js";
import { authenticateToken } from "@/middlewares/auth/authenticate.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post(
  "/",
  authenticateToken,
  validate(createProductSchema),
  createProduct,
);
productRouter.patch(
  "/:id",
  authenticateToken,
  validate(updateProductSchema),
  updateProduct,
);
productRouter.delete("/:id", authenticateToken, deleteProduct);

export default productRouter;
