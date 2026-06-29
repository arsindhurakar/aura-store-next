import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "@/controllers/product.controller.js";
import { validate } from "@/middleware/validator.js";
import {
  createProductSchema,
  updateProductSchema,
} from "@/schemas/product.schema.js";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", validate(createProductSchema), createProduct);
productRouter.patch("/:id", validate(updateProductSchema), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
