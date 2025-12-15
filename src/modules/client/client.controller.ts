import { Controller, Get, Put, Body, UseGuards, Req } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role, User } from '@prisma/client';
import { UpdateClientProfileDto } from './dtos/update-client-profile.dto';
import { Request } from 'express';

// ✅ CORRECTION : Interface pour typer la requête avec le User Prisma
interface RequestWithUser extends Request {
  user: User;
}

@Controller('client')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CLIENT)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Profile endpoints
  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    // ✅ CORRECTION : req.user est l'objet User de la DB, donc on utilise .id, pas .sub
    return this.clientService.getClientProfile(req.user.id);
  }

  @Put('profile')
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() data: UpdateClientProfileDto,
  ) {
    return this.clientService.updateClientProfile(req.user.id, data);
  }

  // Dashboard endpoints
  @Get('stats')
  async getStats(@Req() req: RequestWithUser) {
    return this.clientService.getClientStats(req.user.id);
  }

  @Get('recent-bookings')
  async getRecentBookings(@Req() req: RequestWithUser) {
    return this.clientService.getClientRecentBookings(req.user.id);
  }

  @Get('favorite-pros')
  async getFavoritePros(@Req() req: RequestWithUser) {
    return this.clientService.getClientFavoritePros(req.user.id);
  }
}