import { AuthResponseDto, UserResponseDto } from "@/dtos/auth.dto.js";
import { registerInput, loginInput } from "@/schemas/auth.schema.js";

export interface IAuthService {
  register(data: registerInput): Promise<UserResponseDto>;
  login(data: loginInput): Promise<AuthResponseDto>;
  logout(): Promise<null>;
}
