import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
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
import { Role, User } from '@prisma/client';
import { Request } from 'express';

// ✅ CORRECTION : Interface pour typer la requête
interface RequestWithUser extends Request {
  user: User;
}

@Controller('pro')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.PRO)
export class ProController {
  constructor(private readonly proService: ProService) {}

  // Profile endpoints
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    // ✅ CORRECTION : Utilisation directe de .id (le seul champ valide du User Prisma)
    return this.proService.getProProfile(req.user.id);
  }

  @Put('profile')
  async updateProfile(
    @Req() req: RequestWithUser, 
    @Body() data: UpdateProProfileDto
  ) {
    return this.proService.updateProProfile(req.user.id, data);
  }

  // Services endpoints
  @Post('services')
  async createService(
    @Req() req: RequestWithUser, 
    @Body() dto: CreateProServiceDto
  ) {
    return this.proService.createProService(req.user.id, dto);
  }

  @Get('services')
  async getServices(@Req() req: RequestWithUser) {
    return this.proService.getProServices(req.user.id);
  }

  @Put('services/:serviceId')
  async updateService(
    @Req() req: RequestWithUser,
    @Param('serviceId') serviceId: string,
    @Body() dto: UpdateProServiceDto,
  ) {
    return this.proService.updateProService(req.user.id, serviceId, dto);
  }

  @Delete('services/:serviceId')
  async deleteService(
    @Req() req: RequestWithUser, 
    @Param('serviceId') serviceId: string
  ) {
    return this.proService.deleteProService(req.user.id, serviceId);
  }

  // Stats endpoint
  @Get('stats')
  async getStats(@Req() req: RequestWithUser) {
    return this.proService.getProStats(req.user.id);
  }

  // Public search endpoint
  @Get('search')
  @UseGuards() // Empty guard overrides class-level guards -> Public endpoint
  async searchPros(@Query() dto: GetProsFilterDto) {
    return this.proService.getPros(dto);
  }
}