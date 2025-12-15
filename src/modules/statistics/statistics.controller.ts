import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { Request } from 'express';

@Controller('stats')
@UseGuards(JwtAuthGuard, RolesGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('client')
  @Roles(Role.CLIENT)
  async getClientStatistics(@Req() req: Request) {
    // @ts-ignore: user exists on req
    return this.statisticsService.getClientStats(req.user.id);
  }

  @Get('pro')
  @Roles(Role.PRO)
  async getProStatistics(@Req() req: Request) {
    // @ts-ignore: user exists on req
    return this.statisticsService.getProStats(req.user.id);
  }
}