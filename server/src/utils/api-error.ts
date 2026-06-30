export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest({
    message,
    code = "BAD_REQUEST",
    details,
  }: {
    message: string;
    code?: string;
    details?: unknown;
  }) {
    return new ApiError(400, message, code, details);
  }

  static notFound({
    message = "Record not found",
    code = "NOT_FOUND",
    details,
  }: {
    message?: string;
    code?: string;
    details?: unknown;
  }) {
    return new ApiError(404, message, code, details);
  }

  static internal({
    message = "Internal server error",
    code = "INTERNAL_ERROR",
  }: {
    message: string;
    code?: string;
  }) {
    return new ApiError(500, message, code);
  }

  static conflict({
    message,
    code = "CONFLICT",
  }: {
    message: string;
    code?: string;
  }) {
    return new ApiError(409, message, code);
  }

  static unauthorized({
    message,
    code = "UNAUTHORIZED",
  }: {
    message: string;
    code?: string;
  }) {
    return new ApiError(401, message, code);
  }

  static forbidden({
    message,
    code = "FORBIDDEN",
  }: {
    message: string;
    code?: string;
  }) {
    return new ApiError(403, message, code);
  }
}
