import { API_ENDPOINTS } from "@/constants/api.constants";
import { adaptLogin } from "@/features/auth/adapters/auth.adapter";
import type {
  AuthResponseDto,
  Login,
  LoginDto,
} from "@/features/auth/types/auth.types";
import api from "@/services/axios";
import type { ApiResponse } from "@/types/api.types";

export const authApi = {
  async login(body: LoginDto): Promise<Login> {
    const response = await api.post<ApiResponse<AuthResponseDto>>(
      `${API_ENDPOINTS.AUTH}/login`,
      body,
    );

    return adaptLogin(response.data.data);
  },

  async logout(body: { refreshToken: string }): Promise<null> {
    const response = await api.post<ApiResponse<null>>(
      `${API_ENDPOINTS.AUTH}/logout`,
      body,
    );

    return response.data.data;
  },
};
