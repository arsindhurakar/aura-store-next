import type { Request, Response } from "express";

import { productService } from "@/services/product.service.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { ok } from "@/utils/response.js";

export const getProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const data = await productService.getAll();

    res.json(ok(data));
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const data = await productService.getById(id);

    res.json(ok(data));
  },
);
