import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ProService } from './pro.service';
import { CreateProServiceDto } from './dtos/create-pro-service.dto';
import { UpdateProServiceDto } from './dtos/update-pro-service.dto';
import { UpdateProProfileDto } from './dtos/update-pro-profile.dto';
import { GetProsFilterDto } from './dtos/get-pros-filter.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('pro')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.PRO)
export class ProController {
  constructor(private readonly proService: ProService) {}

  // Profile endpoints
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.proService.getProProfile(userId);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() data: UpdateProProfileDto) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.proService.updateProProfile(userId, data);
  }

  // Services endpoints
  @Post('services')
  async createService(@Request() req, @Body() dto: CreateProServiceDto) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.proService.createProService(userId, dto);
  }

  @Get('services')
  async getServices(@Request() req) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.proService.getProServices(userId);
  }

  @Put('services/:serviceId')
  async updateService(
    @Request() req,
    @Param('serviceId') serviceId: string,
    @Body() dto: UpdateProServiceDto,
  ) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.proService.updateProService(userId, serviceId, dto);
  }

  @Delete('services/:serviceId')
  async deleteService(@Request() req, @Param('serviceId') serviceId: string) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.proService.deleteProService(userId, serviceId);
  }

  // Stats endpoint
  @Get('stats')
  async getStats(@Request() req) {
    const userId = req.user.sub || req.user.userId || req.user.id;
    return this.proService.getProStats(userId);
  }

  // Public search endpoint
  @Get('search')
  @UseGuards()
  async searchPros(@Query() dto: GetProsFilterDto) {
    return this.proService.getPros(dto);
  }
}
