import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Jika menggunakan dotenv
    RedisModule.forRoot({
      options: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD || 'your-secure-password',
      },
      type: 'single',
    }),
  ],
  exports: [RedisModuleData],
  providers: [RedisService],
})
export class RedisModuleData {}
