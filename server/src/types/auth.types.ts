export type UserRole = "admin";

export type TokenType = "access" | "refresh";

export interface AccessTokenPayload {
  sub: string;
  email: string;
  role: string;
}

export interface RefreshTokenPayload {
  sub: string;
  jti: string;
}

export interface RefreshSessionRequest {
  refreshToken: string;
}

export interface AuthTokens extends RefreshSessionRequest {
  accessToken: string;
}

export type RefreshSessionInput = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
};

export type RequestMeta = {
  ipAddress?: string;
  userAgent?: string;
  deviceName?: string;
};
