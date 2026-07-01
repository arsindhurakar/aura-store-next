import { RefreshSessionResponseDto, UserResponseDto } from "@/dtos/auth.dto.js";
import { RegisterInput } from "@/schemas/auth.schema.js";
import { RefreshSessionInput, RequestMeta } from "@/types/auth.types.js";
import { User } from "@prisma/client";

export interface IUserRepository {
  create(data: RegisterInput): Promise<UserResponseDto>;
  findByEmail(email: string): Promise<User | null>;
}

export interface IRefreshSessionRepository {
  create(
    data: RefreshSessionInput & RequestMeta,
  ): Promise<RefreshSessionResponseDto>;
}
