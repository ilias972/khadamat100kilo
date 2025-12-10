import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../../common/prisma.service';
import { BusinessLoggerService } from '../../common/logger/business-logger.service';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, BusinessLoggerService],
})
export class ReviewsModule {}
