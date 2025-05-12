import { HttpException, HttpStatus } from '@nestjs/common';

export interface ErrorResponse {
  code: string;
  message: string;
  status: HttpStatus;
  description?: string;
}

export class CustomHttpException extends HttpException {
  constructor(
    error: ErrorResponse,
    overrides?: {
      message?: string;
      description?: string;
      code?: string;
      status?: HttpStatus;
    },
  ) {
    const response = {
      code: overrides?.code || error.code, // Gunakan code dinamis jika ada
      message: overrides?.message || error.message, // Gunakan message dinamis jika ada
      description: overrides?.description || error.description, // Gunakan description dinamis jika ada
      status: overrides?.status || error.status, // Gunakan status dinamis jika ada
    };
    super(response, error.status);
  }
}
