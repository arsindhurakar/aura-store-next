import { ApiError } from "@/utils/api-error.js";
import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod/v3";

const parse = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw ApiError.badRequest({
      message: "Validation failed",
      code: "VALIDATION_FAILED",
      details: result.error.flatten(),
    });
  }

  return result.data;
};

export const validateBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = parse(schema, req.body);
      next();
    } catch (err) {
      next(err);
    }
  };

export const validateParams =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = parse(schema, req.params);
      next();
    } catch (err) {
      next(err);
    }
  };
