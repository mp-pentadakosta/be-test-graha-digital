import { HttpStatus, Module } from '@nestjs/common';
import { PrismaService } from './db/prisma.service';
import { JwtAuthGuard } from './core/dto/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './core/jwt.strategy';
import { ThrottlerModule } from '@nestjs/throttler';
import { appModuleController } from './controller/app.module.controller';
import { appModuleService } from './services/app.module.service';
import { appModuleRepository } from './repository/app.module.repository';
import { appModelIntegration } from './integration/app.model.integration';
import { AxiosInterceptorCore } from './core/axios.interceptor.core';
// import { RedisModuleData } from './redis/redis.module';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { appModuleScheduler } from './scheduler/app.module.scheduler';
import { appModuleUtils } from './utils/app.module.utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_PUBLIC_KEY || '',
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        explicitConnect: configService.get('explicit'),
        prismaOptions: {
          errorFormat: 'pretty',
          log: ['info', 'query', 'error', 'warn'],
          datasources: {
            db: {
              url: configService.get('DATABASE_URL'),
            },
          },
        },
      }),
    }),
    ScheduleModule.forRoot(),
    // RedisModuleData,
  ],
  controllers: appModuleController,
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    PrismaService,
    AxiosInterceptorCore,
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter, {
          P2000: HttpStatus.BAD_REQUEST,
          P2002: HttpStatus.CONFLICT,
          P2025: HttpStatus.NOT_FOUND,
        });
      },
      inject: [HttpAdapterHost],
    },
    ...appModuleScheduler,
    ...appModuleRepository,
    ...appModuleService,
    ...appModelIntegration,
    ...appModuleUtils,
  ],
})
export class AppModule {}
