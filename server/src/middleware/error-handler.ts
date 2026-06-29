import type { ErrorRequestHandler } from "express";

import type { ApiErrorResponse } from "@/types/api.types.js";
import { ApiError } from "@/utils/api-error.js";
import { Prisma } from "@prisma/client";
import { getConflictFields } from "@/utils/prisma.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    const body: ApiErrorResponse = {
      success: false,
      error: {
        message: err.message,
        code: err.code,
        ...(err.details !== undefined && { details: err.details }),
      },
    };
    res.status(err.statusCode).json(body);
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": {
        // Unique constraint (e.g. duplicate slug)
        const fields = getConflictFields(err);

        const body: ApiErrorResponse = {
          success: false,
          error: {
            message: fields?.length
              ? `A record with this ${fields.join(", ")} already exists`
              : "A record with these values already exists",
            code: "CONFLICT",
            details: { fields },
          },
        };
        res.status(409).json(body);
        return;
      }

      case "P2025": {
        // Record not found (update/delete on missing row)
        const body: ApiErrorResponse = {
          success: false,
          error: {
            message: "Record not found",
            code: "NOT_FOUND",
          },
        };
        res.status(404).json(body);
        return;
      }

      case "P2003": {
        // Foreign key constraint failed
        const body: ApiErrorResponse = {
          success: false,
          error: {
            message: "Related record not found",
            code: "BAD_REQUEST",
          },
        };
        res.status(400).json(body);
        return;
      }

      default:
        break; // fall through to 500
    }
  }

  console.error(err);

  const body: ApiErrorResponse = {
    success: false,
    error: {
      message: "Internal server error",
      code: "INTERNAL_ERROR",
    },
  };
  res.status(500).json(body);
};
