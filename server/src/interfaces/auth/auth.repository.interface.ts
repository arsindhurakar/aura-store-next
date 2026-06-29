import { UserResponseDto } from "@/dtos/auth.dto.js";
import { registerInput } from "@/schemas/auth.schema.js";
import { User } from "@prisma/client";

export interface IAuthRepository {
  create(data: registerInput): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<User | null>;
}
