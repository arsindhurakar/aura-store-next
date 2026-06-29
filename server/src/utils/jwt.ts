import jwt, { type SignOptions } from "jsonwebtoken";

import { ApiError } from "@/utils/api-error.js";
import { config } from "@/config/index.js";

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

function getJwtSecret(): string {
  const secret = config.jwtSecret;

  if (!secret) {
    throw ApiError.internal({ message: "JWT_SECRET is not defined" });
  }

  return secret;
}

function getSignOptions(): SignOptions {
  return {
    expiresIn: (config.jwtExpiresIn ?? "7d") as SignOptions["expiresIn"],
  };
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), getSignOptions());
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
}
