import { AuthResponseDto, UserResponseDto } from "@/dtos/auth.dto.js";
import { RegisterInput, LoginInput } from "@/schemas/auth.schema.js";
import {
  RefreshSessionRequest,
  AuthTokens,
  RequestMeta,
} from "@/types/auth.types.js";

export interface IAuthService {
  register(data: RegisterInput): Promise<UserResponseDto>;
  login(
    data: LoginInput,
    options?: { meta?: RequestMeta },
  ): Promise<AuthResponseDto>;
  logout(): Promise<null>;
  refresh(
    data: RefreshSessionRequest,
    options?: { meta?: RequestMeta },
  ): Promise<AuthTokens>;
}
