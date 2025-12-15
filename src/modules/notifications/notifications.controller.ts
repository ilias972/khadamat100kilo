import {
  Controller,
  Get,
  Put,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';  // ✅ AJOUTÉ
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getNotifications(
    @Request() req: ExpressRequest,  // ✅ TYPÉ
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    return this.notificationsService.getUserNotifications(
      req.user!.id,  // ✅ Utiliser .id au lieu de .sub
      parseInt(page),
      parseInt(limit),
    );
  }

  @Put(':notificationId/read')
  async markAsRead(
    @Param('notificationId') notificationId: string,
    @Request() req: ExpressRequest,  // ✅ TYPÉ
  ) {
    return this.notificationsService.markAsRead(notificationId, req.user!.id);  // ✅
  }

  @Put('read-all')
  async markAllAsRead(@Request() req: ExpressRequest) {  // ✅ TYPÉ
    return this.notificationsService.markAllAsRead(req.user!.id);  // ✅
  }

  @Get('unread-count')
  async getUnreadCount(@Request() req: ExpressRequest) {  // ✅ TYPÉ
    const count = await this.notificationsService.getUnreadCount(req.user!.id);  // ✅
    return { unreadCount: count };
  }
}