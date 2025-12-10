import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ClientService } from './client.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { UpdateClientProfileDto } from './dtos/update-client-profile.dto';

@Controller('client')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.CLIENT)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  // Profile endpoints
  @Get('profile')
  async getProfile(@Request() req) {
    return this.clientService.getClientProfile(req.user.sub);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() data: UpdateClientProfileDto) {
    return this.clientService.updateClientProfile(req.user.sub, data);
  }

  // Dashboard endpoints
  @Get('stats')
  async getStats(@Request() req) {
    return this.clientService.getClientStats(req.user.sub);
  }

  @Get('recent-bookings')
  async getRecentBookings(@Request() req) {
    return this.clientService.getClientRecentBookings(req.user.sub);
  }

  @Get('favorite-pros')
  async getFavoritePros(@Request() req) {
    return this.clientService.getClientFavoritePros(req.user.sub);
  }
}
