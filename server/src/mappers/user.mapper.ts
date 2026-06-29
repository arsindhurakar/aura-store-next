import { UserResponseDto } from "@/dtos/auth.dto.js";
import { User } from "@prisma/client";

export function toUserResponseDto(user: User): UserResponseDto {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
