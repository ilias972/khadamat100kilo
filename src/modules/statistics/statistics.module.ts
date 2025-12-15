import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { PlatformController } from './platform.controller';
import { StatisticsService } from './statistics.service';
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [StatisticsController, PlatformController],
  providers: [StatisticsService, PrismaService],
})
export class StatisticsModule {}
