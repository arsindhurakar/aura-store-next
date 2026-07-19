import type { AuthResponseDto, Login } from "@/features/auth/types/auth.types";

export function adaptLogin(dto: AuthResponseDto): Login {
  return {
    user: {
      id: dto.user.id,
      email: dto.user.email,
      firstName: dto.user.firstName,
      lastName: dto.user.lastName,
      role: dto.user.role,
    },
    tokens: {
      accessToken: dto.tokens.accessToken,
      refreshToken: dto.tokens.refreshToken,
    },
  };
}
