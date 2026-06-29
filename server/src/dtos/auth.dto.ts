import { type UserRole } from "@/types/auth.types.js";

export type UserResponseDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponseDto = {
  user: UserResponseDto;
  token: string;
};
