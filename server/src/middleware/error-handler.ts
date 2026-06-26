import type { ErrorRequestHandler } from "express";

import type { ApiErrorResponse } from "@/types/api.types.js";
import { ApiError } from "@/utils/api-error.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) {
    const body: ApiErrorResponse = {
      success: false,
      error: {
        message: err.message,
        code: err.code,
      },
    };
    res.status(err.statusCode).json(body);
    return;
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
