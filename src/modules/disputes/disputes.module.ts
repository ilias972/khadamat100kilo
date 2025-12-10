import { Module } from '@nestjs/common';
import { DisputesController } from './disputes.controller';
import { DisputesService } from './disputes.service';
import { PrismaService } from '../../common/prisma.service';
import { BusinessLoggerService } from '../../common/logger/business-logger.service';
import { RateLimiterService } from '../../common/rate-limiter/rate-limiter.service';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [DisputesController],
  providers: [
    DisputesService,
    PrismaService,
    BusinessLoggerService,
    RateLimiterService,
  ],
})
export class DisputesModule {}
