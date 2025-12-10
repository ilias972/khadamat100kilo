import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service';
import { PrismaService } from '../../common/prisma.service';
import { RateLimiterService } from '../../common/rate-limiter/rate-limiter.service';

@Module({
  controllers: [MessagingController],
  providers: [MessagingService, PrismaService, RateLimiterService],
})
export class MessagingModule {}
