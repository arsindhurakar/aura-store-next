import { ApiError } from "@/utils/api-error.js";
import type { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod/v3";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        ApiError.badRequest({
          message: "Validation failed",
          code: "VALIDATION_FAILED",
          details: result.error.flatten(),
        }),
      );
    }

    req.body = result.data;

    return next();
  };
