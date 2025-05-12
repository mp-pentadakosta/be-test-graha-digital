import { ArgumentsHost, Catch } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class CustomPrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message = exception.message.replace(/\n/g, '');

    let code = '99';
    let additional = null;

    switch (exception.code) {
      case 'P2000': {
        code = '89';
        message = 'Data not found';
        additional = exception.message.replace(/\n/g, '');
        break;
      }
      case 'P2002': {
        code = '89';
        message = 'Data already exists';
        additional = exception.message.replace(/\n/g, '');
        break;
      }
      case 'P2025': {
        code = '89';
        message = 'Data already exists';
        additional = exception.message.replace(/\n/g, '');
        break;
      }
    }

    response.status(500).json({
      code: code,
      message: message,
      additional: additional,
      result: null,
    });
  }
}
