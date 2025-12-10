import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisCacheService } from './redis-cache.service';

@Global()
@Module({
  providers: [PrismaService, RedisCacheService],
  exports: [PrismaService, RedisCacheService],
})
export class DatabaseModule {}