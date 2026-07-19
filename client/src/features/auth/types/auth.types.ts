export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface Login {
  user: User;
  tokens: AuthTokens;
}

export interface LoginDto {
  email: string;
  password: string;
}

export type UserRole = "admin";

export interface UserResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  refreshToken: string;
  accessToken: string;
}

export interface AuthResponseDto {
  user: UserResponseDto;
  tokens: AuthTokens;
}
