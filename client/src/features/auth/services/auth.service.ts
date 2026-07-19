import { authApi } from "@/features/auth/api/auth.api";
import type { LoginDto } from "@/features/auth/types/auth.types";
import { tokenStorage } from "@/features/auth/utils/auth.utils";

export const authService = {
  async login(body: LoginDto) {
    const { tokens, user } = await authApi.login(body);

    if (!tokens.accessToken || !tokens.refreshToken) {
      throw new Error("Invalid login response");
    }

    const { accessToken, refreshToken } = tokens;
    tokenStorage.setTokens({ accessToken, refreshToken });

    return user;
  },

  async logout() {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      tokenStorage.clearTokens();
      return;
    }

    await authApi.logout({ refreshToken });
    tokenStorage.clearTokens();
  },
};
