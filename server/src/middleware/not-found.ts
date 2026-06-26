import type { RequestHandler } from "express";

import { ApiError } from "@/utils/api-error.js";

export const notFoundHandler: RequestHandler = (_req, _res, next) => {
  next(ApiError.notFound("Route not found"));
};
