import jwt, { VerifyOptions, type SignOptions } from "jsonwebtoken";
import { createHash } from "node:crypto";

import { ApiError } from "@/utils/api-error.js";
import { config } from "@/config/index.js";
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  TokenType,
} from "@/types/auth.types.js";

const JWT_ALGORITHM = "HS256" as const;

const BASE_JWT_CLAIMS = {
  issuer: config.jwtIssuer,
  audience: config.jwtAudience,
} as const;

function getJwtSecret(type: TokenType): string {
  const isTypeAccessToken = type === "access";

  const secret = isTypeAccessToken
    ? config.jwtAccessSecret
    : config.jwtRefreshSecret;

  if (!secret) {
    throw ApiError.internal({
      message: `${isTypeAccessToken ? "JWT_ACCESS_SECRET" : "JWT_REFRESH_SECRET"} is not defined`,
    });
  }

  return secret;
}

function getSignOptions(type: TokenType): SignOptions {
  return {
    ...BASE_JWT_CLAIMS,
    algorithm: JWT_ALGORITHM,
    expiresIn: (type === "access"
      ? config.jwtAccessSecretExpiresIn
      : config.jwtRefreshSecretExpiresIn) as SignOptions["expiresIn"],
  };
}

export function signToken(args: {
  payload: AccessTokenPayload;
  type: "access";
}): string;

export function signToken(args: {
  payload: RefreshTokenPayload;
  type: "refresh";
}): string;

export function signToken({
  payload,
  type,
}: {
  payload: AccessTokenPayload | RefreshTokenPayload;
  type: TokenType;
}): string {
  return jwt.sign(payload, getJwtSecret(type), getSignOptions(type));
}

function getVerifyOptions(_type: TokenType): VerifyOptions {
  return {
    ...BASE_JWT_CLAIMS,
    algorithms: [JWT_ALGORITHM],
    clockTolerance: 5, // allow 5s clock skew between servers/clients
  };
}

function invalidTokenError(): ApiError {
  return ApiError.unauthorized({
    message: "Invalid token",
    code: "INVALID_TOKEN",
  });
}

function verifyToken({
  token,
  type,
}: {
  token: string;
  type: TokenType;
}): AccessTokenPayload | RefreshTokenPayload {
  try {
    const decoded = jwt.verify(
      token,
      getJwtSecret(type),
      getVerifyOptions(type),
    );

    if (typeof decoded === "string" || decoded === null) {
      throw invalidTokenError();
    }

    return decoded as AccessTokenPayload | RefreshTokenPayload;
  } catch (err) {
    if (err instanceof ApiError) throw err;

    if (err instanceof jwt.TokenExpiredError) {
      throw ApiError.unauthorized({
        message: "Token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      throw invalidTokenError();
    }

    throw err;
  }
}

export const verifyAccessToken = (token: string): AccessTokenPayload =>
  verifyToken({ token, type: "access" }) as AccessTokenPayload;

export const verifyRefreshToken = (token: string): RefreshTokenPayload =>
  verifyToken({ token, type: "refresh" }) as RefreshTokenPayload;

export function hashRefreshToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
