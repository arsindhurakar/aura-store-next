import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

import { config } from "@/config/index.js";
import { ApiError } from "@/utils/api-error.js";
import { JwtPayload } from "@/utils/jwt.js";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return next(
      ApiError.unauthorized({
        message: "Authentication token is required",
      }),
    );
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err || !decoded || typeof decoded === "string") {
      return next(
        ApiError.forbidden({
          message: "You don't have permission to access this resource",
        }),
      );
    }

    req.user = decoded as JwtPayload;

    return next();
  });
};
