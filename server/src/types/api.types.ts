export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorBody {
  message: string;
  code?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorBody;
}
