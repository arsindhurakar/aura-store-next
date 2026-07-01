import prisma from "@/lib/prisma.js";
import { RefreshSessionResponseDto, UserResponseDto } from "@/dtos/auth.dto.js";
import {
  IRefreshSessionRepository,
  IUserRepository,
} from "@/interfaces/auth/auth.repository.interface.js";
import { toUserResponseDto } from "@/mappers/user.mapper.js";
import { RegisterInput } from "@/schemas/auth.schema.js";
import { User } from "@prisma/client";
import { RefreshSessionInput, RequestMeta } from "@/types/auth.types.js";

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
  ): Promise<RefreshSessionResponseDto> {
    const refreshSession = await prisma.refreshSession.create({ data });

    return {
      id: refreshSession.id,
      userId: refreshSession.userId,
      expiresAt: refreshSession.expiresAt.toISOString(),
      createdAt: refreshSession.createdAt.toISOString(),
      ipAddress: refreshSession.ipAddress,
      userAgent: refreshSession.userAgent,
      deviceName: refreshSession.deviceName,
    };
  }
}
