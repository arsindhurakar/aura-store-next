import { RefreshSession, User } from "@prisma/client";
import { UserResponseDto } from "@/dtos/auth.dto.js";
import { RegisterInput } from "@/schemas/auth.schema.js";
import {
  RefreshSessionInput,
  RefreshSessionWithUser,
  RequestMeta,
} from "@/types/auth.types.js";

export interface IUserRepository {
  create(data: RegisterInput): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<User | null>;
}

export interface IRefreshSessionRepository {
  create(data: RefreshSessionInput & RequestMeta): Promise<RefreshSession>;
  findByTokenHash(tokenHash: string): Promise<RefreshSessionWithUser | null>;
  rotateToken({
    id,
    tokenHash,
    expiresAt,
  }: {
    id: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<RefreshSession>;
  revokeToken({
    id,
    revokedAt,
  }: {
    id: string;
    revokedAt: Date;
  }): Promise<RefreshSession>;
}
