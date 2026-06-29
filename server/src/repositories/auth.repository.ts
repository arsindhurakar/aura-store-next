import prisma from "@/lib/prisma.js";
import { UserResponseDto } from "@/dtos/auth.dto.js";
import { IAuthRepository } from "@/interfaces/auth/auth.repository.interface.js";
import { toUserResponseDto } from "@/mappers/user.mapper.js";
import { registerInput } from "@/schemas/auth.schema.js";
import { User } from "@prisma/client";

export class AuthRepository implements IAuthRepository {
  async create(data: registerInput): Promise<UserResponseDto> {
    const user = await prisma.user.create({ data });

    return toUserResponseDto(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  }
}
