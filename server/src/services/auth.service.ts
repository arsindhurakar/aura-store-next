import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";

import { AuthResponseDto, UserResponseDto } from "@/dtos/auth.dto.js";
import {
  IRefreshSessionRepository,
  IUserRepository,
} from "@/interfaces/auth/auth.repository.interface.js";
import { IAuthService } from "@/interfaces/auth/auth.service.interface.js";
import {
  AuthRepository,
  RefreshSessionRepository,
} from "@/repositories/auth.repository.js";
import { RegisterInput, LoginInput } from "@/schemas/auth.schema.js";
import { ApiError } from "@/utils/api-error.js";
import { toUserResponseDto } from "@/mappers/user.mapper.js";
import { comparePassword, hashPassword } from "@/utils/password.js";
import { hashRefreshToken, signToken } from "@/utils/jwt.js";
import {
  RefreshSessionRequest,
  AuthTokens,
  RequestMeta,
} from "@/types/auth.types.js";
import { config } from "@/config/index.js";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly refreshSessionRepo: IRefreshSessionRepository,
  ) {}

  async register(data: RegisterInput): Promise<UserResponseDto> {
    const hashedPassword = await hashPassword(data.password);

    const user = await this.userRepo.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async login(
    data: LoginInput,
    options: { meta?: RequestMeta },
  ): Promise<AuthResponseDto> {
    const user = await this.userRepo.findByEmail(data.email);
    const badCredentialMessage = "Invalid username or password";

    if (!user) {
      throw ApiError.unauthorized({ message: badCredentialMessage });
    }

    const valid = await comparePassword(data.password, user.password);

    if (!valid) {
      throw ApiError.unauthorized({ message: badCredentialMessage });
    }

    const accessToken = signToken({
      payload: {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      type: "access",
    });

    const refreshToken = signToken({
      payload: {
        sub: user.id,
        jti: randomUUID(),
      },
      type: "refresh",
    });

    const decoded = jwt.decode(refreshToken);
    if (!decoded || typeof decoded === "string" || !decoded.exp) {
      throw ApiError.internal({
        message: "Failed to decode refresh token expiry",
      });
    }

    await this.refreshSessionRepo.create({
      userId: user.id,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt: new Date(decoded.exp * 1000),
      ipAddress: options.meta?.ipAddress,
      userAgent: options.meta?.userAgent,
      deviceName: options.meta?.deviceName,
    });

    return {
      user: toUserResponseDto(user),
      tokens: { accessToken, refreshToken },
    };
  }

  async logout(): Promise<null> {
    return null;
  }

  async refresh(
    data: RefreshSessionRequest,
    options?: { meta?: RequestMeta },
  ): Promise<AuthTokens> {
    const { refreshToken } = data;

    return { accessToken: "", refreshToken };
  }
}

const authRepository = new AuthRepository();
const refreshSessionRepository = new RefreshSessionRepository();

export const authService = new AuthService(
  authRepository,
  refreshSessionRepository,
);
