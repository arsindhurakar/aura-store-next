import type { AuthTokens, UserRole } from "@/types/auth.types.js";

export type UserResponseDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponseDto = {
  user: UserResponseDto;
  tokens: AuthTokens;
};

export type RefreshSessionResponseDto = {
  id: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  deviceName?: string | null;
};
