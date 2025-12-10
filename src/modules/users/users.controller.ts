import { Controller, Get, Put, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { CacheTTL, CacheKey } from '@nestjs/cache-manager';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @CacheTTL(300) // 5 minutes
  async getProfile(@Request() req) {
    return this.usersService.findProfile(req.user.id);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() data: UpdateUserProfileDto) {
    return this.usersService.updateProfile(req.user.id, data);
  }

  @Patch('me')
  async updateMe(@Request() req, @Body() data: { firstName?: string; lastName?: string; bio?: string; phone?: string }) {
    return this.usersService.updateProfile(req.user.id, data);
  }

  @Patch('change-password')
  async changePassword(@Request() req, @Body() data: { currentPassword: string; newPassword: string }) {
    return this.usersService.changePassword(req.user.id, data.currentPassword, data.newPassword);
  }
}
