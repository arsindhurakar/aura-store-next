import type { RequestHandler, Request, Response } from "express";

import { ApiError } from "@/utils/api-error.js";

export const notFoundHandler: RequestHandler = (
  _req: Request,
  _res: Response,
  next,
) => {
  next(ApiError.notFound({ message: "Route not found" }));
};
