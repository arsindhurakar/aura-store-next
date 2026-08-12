import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "@/controllers/product.controller.js";
import { validateBody, validateParams } from "@/middlewares/validator.js";
import {
  createProductSchema,
  updateProductSchema,
} from "@/schemas/product.schema.js";
import { authenticateToken } from "@/middlewares/auth/authenticate.js";
import { paramIdSchema, productSlugParamsSchema } from "@/schemas/index.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", validateParams(paramIdSchema), getProductById);
productRouter.get(
  "/slug/:slug",
  validateParams(productSlugParamsSchema),
  getProductBySlug,
);
productRouter.post(
  "/",
  authenticateToken,
  validateBody(createProductSchema),
  createProduct,
);
productRouter.patch(
  "/:id",
  authenticateToken,
  validateParams(paramIdSchema),
  validateBody(updateProductSchema),
  updateProduct,
);
productRouter.delete(
  "/:id",
  authenticateToken,
  validateParams(paramIdSchema),
  deleteProduct,
);

export default productRouter;
