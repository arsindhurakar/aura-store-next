import type { ApiSuccessResponse } from "@/types/api.types.js";

export function ok<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}
