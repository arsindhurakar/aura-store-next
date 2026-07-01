import type { NextFunction, Request, Response } from "express";

import { ApiError } from "@/utils/api-error.js";
import { verifyAccessToken } from "@/utils/jwt.js";

export const authenticateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return next(
      ApiError.unauthorized({
        message: "Authentication token is required",
      }),
    );
  }

  try {
    req.user = verifyAccessToken(accessToken);
    return next();
  } catch (err) {
    return next(err);
  }
};
