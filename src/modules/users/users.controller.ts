import { Controller, Get, Patch, Body, UseGuards, Req, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user') // ⚠️ On reste sur le SINGULIER
@UseGuards(JwtAuthGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() req) {
    return this.usersService.findProfile(req.user.id);
  }

  @Patch('profile')
  async updateProfile(@Req() req, @Body() data: any) {
    // 🚨 LOG 1 : Est-ce que le Controller reçoit la demande ?
    console.log('\n---------------------------------------------------');
    console.log('🚨 [CONTROLLER] Requête reçue !');
    console.log('🚨 [CONTROLLER] User ID:', req.user.id);
    console.log('🚨 [CONTROLLER] Role:', req.user.role);
    console.log('🚨 [CONTROLLER] Data body:', data);
    console.log('---------------------------------------------------\n');

    return this.usersService.updateProfileSimple(req.user.id, req.user.role, data);
  }
}