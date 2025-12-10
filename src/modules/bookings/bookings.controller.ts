import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingStatus, Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from '../auth/enums/user-role.enum';

interface AuthenticatedUser {
  sub: string;
  userId?: string;
  role: Role;
}

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  private extractUser(req: { user: AuthenticatedUser }): AuthenticatedUser {
    if (!req.user) {
      throw new BadRequestException('User not authenticated');
    }
    const user: AuthenticatedUser = req.user;
    if (!user.sub && !user.userId) {
      throw new BadRequestException('User ID not found in token');
    }
    if (!user.role) {
      throw new BadRequestException('User role not found in token');
    }
    return user;
  }

  private getUserId(user: AuthenticatedUser): string {
    return user.sub || user.userId!;
  }

  @Post()
  async createBooking(@Request() req, @Body() dto: CreateBookingDto) {
    const user = this.extractUser(req);
    if (user.role !== 'CLIENT') {
      throw new ForbiddenException('Only clients can create bookings');
    }
    const userId = this.getUserId(user);
    return this.bookingsService.createBooking(userId, dto);
  }

  @Get()
  async getUserBookings(@Request() req) {
    const user = this.extractUser(req);
    if (user.role !== Role.CLIENT && user.role !== Role.PRO) {
      throw new ForbiddenException('Only clients and professionals can view their bookings');
    }
    const userId = this.getUserId(user);
    return this.bookingsService.findUserBookings(userId, user.role as 'CLIENT' | 'PRO');
  }

  @Patch(':id/status')
  async updateBookingStatus(
    @Param('id') id: string,
    @Body('status') status: BookingStatus,
    @Request() req,
  ) {
    const user = this.extractUser(req);
    const userId = this.getUserId(user);
    return this.bookingsService.updateStatus(id, status, userId, user.role);
  }
}
