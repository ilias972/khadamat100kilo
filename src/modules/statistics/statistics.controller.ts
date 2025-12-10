import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('client')
  async getClientStatistics(@Request() req) {
    return this.statisticsService.getClientStatistics(req.user.sub);
  }

  @Get('pro')
  async getProStatistics(@Request() req) {
    return this.statisticsService.getProStatistics(req.user.sub);
  }
}