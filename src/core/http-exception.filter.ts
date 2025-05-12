import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message || 'Internal server error';

    let code = exception.getResponse()['code'] || '99'; // Menambahkan resultCode sesuai kebutuhan

    let additional = exception.getResponse()['description'] || null; // Menambahkan additional sesuai kebutuhan

    // Jika error berasal dari validasi (ValidationPipe)
    if (status === HttpStatus.BAD_REQUEST) {
      const exceptionResponse = exception.getResponse();
      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        const validationErrors = exceptionResponse['message']; // Pesan error dari ValidationPipe

        if (Array.isArray(validationErrors)) {
          // Ambil pesan pertama atau format sesuai kebutuhan
          message = validationErrors[0];
          additional = validationErrors.map((error) => ({
            field: error || null,
          }));
          code = '89';
        }
      }
    } else {
      message = exception.message || message;
      code = exception.getResponse()['code'] || code;
      additional = exception.getResponse()['description'] || additional;
    }

    response.status(status).json({
      code: code, // Menambahkan resultCode sesuai kebutuhan
      message,
      additional: additional,
      result: null, // Menambahkan result sesuai kebutuhan
    });
  }
}
