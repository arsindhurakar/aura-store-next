import { AuthResponseDto, UserResponseDto } from "@/dtos/auth.dto.js";
import { IAuthRepository } from "@/interfaces/auth/auth.repository.interface.js";
import { IAuthService } from "@/interfaces/auth/auth.service.interface.js";
import { AuthRepository } from "@/repositories/auth.repository.js";
import { registerInput, loginInput } from "@/schemas/auth.schema.js";
import { ApiError } from "@/utils/api-error.js";
import { toUserResponseDto } from "@/mappers/user.mapper.js";
import { comparePassword, hashPassword } from "@/utils/password.js";
import { signToken } from "@/utils/jwt.js";

export class AuthService implements IAuthService {
  constructor(private readonly repo: IAuthRepository) {}

  async register(data: registerInput): Promise<UserResponseDto> {
    const hashedPassword = await hashPassword(data.password);

    const user = await this.repo.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async login(data: loginInput): Promise<AuthResponseDto> {
    const user = await this.repo.findByEmail(data.email);
    const badCredentialMessage = "Invalid username or password";

    if (!user) {
      throw ApiError.unauthorized({ message: badCredentialMessage });
    }

    const valid = await comparePassword(data.password, user.password);

    if (!valid) {
      throw ApiError.unauthorized({ message: badCredentialMessage });
    }

    const token = signToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: toUserResponseDto(user), token };
  }

  async logout(): Promise<null> {
    return null;
  }
}

const authRepository = new AuthRepository();
export const authService = new AuthService(authRepository);
