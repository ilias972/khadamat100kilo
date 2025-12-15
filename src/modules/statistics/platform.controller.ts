import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('platform')
export class PlatformController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // Public endpoint used by the frontend for marketing/homepage
  @Get('stats')
  async getPlatformStats() {
    return this.statisticsService.getPlatformStats();
  }
}
