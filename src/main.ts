import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appLogger } from './core/logger';
import { NextFunction, Request, Response } from 'express';
import { HttpExceptionFilter } from './core/http-exception.filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  const config = new DocumentBuilder()
    .setTitle('Auth API Documentation')
    .setDescription('API Documentation for Auth Service')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send.bind(res);

    res.send = function (body): Response {
      Logger.log('\n');
      Logger.log(`Request ${req.method} ${req.url}`);
      Logger.log(`Headers: ${JSON.stringify(req.headers)}`);
      Logger.log(`Body: ${JSON.stringify(req.body)}`);
      Logger.log('\n');
      Logger.log(`URL ${req.method} ${req.url}`);
      Logger.log(`Response Status: ${res.statusCode}`);
      Logger.log(`Response Body: ${body}`);
      Logger.log('\n');
      return originalSend(body); // Return the result of originalSend
    };

    if (err) {
      if (err.type === 'entity.too.large') {
        Logger.error(err);
        return res.status(413).json({
          code: '99',
          message: 'Request entity too large',
          additional: err,
          result: null,
        });
      }
    }

    next();
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send.bind(res);

    res.send = function (body): Response {
      Logger.log('\n');
      Logger.log(`Request ${req.method} ${req.url}`);
      Logger.log(`Headers: ${JSON.stringify(req.headers)}`);
      Logger.log(`Body: ${JSON.stringify(req.body)}`);
      Logger.log('\n');
      Logger.log(`URL ${req.method} ${req.url}`);
      Logger.log(`Response Status: ${res.statusCode}`);
      Logger.log(`Response Body: ${body}`);
      Logger.log('\n');
      return originalSend(body); // Return the result of originalSend
    };

    next();
  });

  app
    .listen(process.env.PORT, () => {
      appLogger.info(
        `Server started at ${process.env.NODE_ENV} ${process.env.BASE_URL}:${process.env.PORT}`,
      );
    })
    .then((r) => r);
}
bootstrap().then((r) => r);
