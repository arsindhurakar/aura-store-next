import prisma from "@/lib/prisma.js";
import { UserResponseDto } from "@/dtos/auth.dto.js";
import {
  IRefreshSessionRepository,
  IUserRepository,
} from "@/interfaces/auth/auth.repository.interface.js";
import { toUserResponseDto } from "@/mappers/user.mapper.js";
import { RegisterInput } from "@/schemas/auth.schema.js";
import { RefreshSession, User } from "@prisma/client";
import {
  RefreshSessionInput,
  RefreshSessionWithUser,
  RequestMeta,
} from "@/types/auth.types.js";

export class AuthRepository implements IUserRepository {
  async create(data: RegisterInput): Promise<UserResponseDto> {
    const user = await prisma.user.create({ data });

    return toUserResponseDto(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }
}

export class RefreshSessionRepository implements IRefreshSessionRepository {
  async create(
    data: RefreshSessionInput & RequestMeta,
  ): Promise<RefreshSession> {
    const refreshSession = await prisma.refreshSession.create({ data });

    return refreshSession;
  }

  async findByTokenHash(
    tokenHash: string,
  ): Promise<RefreshSessionWithUser | null> {
    const refreshSession = await prisma.refreshSession.findUnique({
      where: { tokenHash },
      include: {
        user: true,
      },
    });

    return refreshSession;
  }

  async rotateToken({
    id,
    tokenHash,
    expiresAt,
  }: {
    id: string;
    tokenHash: string;
    expiresAt: Date;
  }): Promise<RefreshSession> {
    const refreshSession = await prisma.refreshSession.update({
      where: { id },
      data: { tokenHash, expiresAt, lastUsedAt: new Date() },
    });

    return refreshSession;
  }
}
