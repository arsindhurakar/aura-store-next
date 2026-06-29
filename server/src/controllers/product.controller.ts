import type { Request, Response } from "express";

import { productService } from "@/services/product.service.js";
import { asyncHandler } from "@/utils/async-handler.js";
import { ok } from "@/utils/response.js";
import {
  UpdateProductInput,
  type CreateProductInput,
} from "@/schemas/product.schema.js";
import { IProductService } from "@/interfaces/products/product.service.interface.js";

const service: IProductService = productService;

export const getProducts = asyncHandler(
  async (_req: Request, res: Response) => {
    const data = await service.getAll();

    res.json(ok(data));
  },
);

export const getProductById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const data = await service.getById(id);

    res.json(ok(data));
  },
);

export const createProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await service.create(req.body as CreateProductInput);

    res.status(201).json(ok(data));
  },
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const data = await service.updateById({
      id,
      data: req.body as UpdateProductInput,
    });

    res.json(ok(data));
  },
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const data = await service.deleteById(id);

    res.json(ok(data));
  },
);
