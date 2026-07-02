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
import {
  getTokenExpiry,
  hashRefreshToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt.js";
import {
  RefreshSessionRequest,
  AuthTokens,
  RequestMeta,
} from "@/types/auth.types.js";

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

    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = signRefreshToken(user.id);

    await this.refreshSessionRepo.create({
      userId: user.id,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt: getTokenExpiry(refreshToken),
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

  async refresh(data: RefreshSessionRequest): Promise<AuthTokens> {
    const payload = verifyRefreshToken(data.refreshToken);
    const tokenHash = hashRefreshToken(data.refreshToken);

    const refreshSession =
      await this.refreshSessionRepo.findByTokenHash(tokenHash);

    if (
      !refreshSession ||
      refreshSession.userId !== payload.sub ||
      refreshSession.revokedAt
    ) {
      throw ApiError.unauthorized({ message: "Invalid refresh token" });
    }

    if (refreshSession.expiresAt < new Date()) {
      throw ApiError.unauthorized({ message: "Refresh token expired" });
    }

    const refreshToken = signRefreshToken(refreshSession.userId);

    await this.refreshSessionRepo.rotateToken({
      id: refreshSession.id,
      tokenHash: hashRefreshToken(refreshToken),
      expiresAt: getTokenExpiry(refreshToken),
    });

    const { id, email, role } = refreshSession.user;
    const accessToken = signAccessToken({ id, email, role });

    return { accessToken, refreshToken };
  }
}

const authRepository = new AuthRepository();
const refreshSessionRepository = new RefreshSessionRepository();

export const authService = new AuthService(
  authRepository,
  refreshSessionRepository,
);
