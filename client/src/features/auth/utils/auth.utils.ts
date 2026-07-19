import type { AuthTokens, LoginDto } from "@/features/auth/types/auth.types";
import { LoginFormInput } from "@/lib/validators";

export function mapFormToLoginDto(values: LoginFormInput): LoginDto {
  return {
    email: values.email.trim(),
    password: values.password,
  };
}

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem("accessToken"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),

  setTokens: (token: AuthTokens) => {
    const { accessToken, refreshToken } = token;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
