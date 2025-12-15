import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messaging')
@UseGuards(JwtAuthGuard)
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  // 1. Récupérer la liste des conversations
  @Get('conversations')
  async getUserConversations(@Req() req) {
    return this.messagingService.getUserConversations(req.user.id);
  }

  // 2. Compter les non-lus
  @Get('unread-count')
  async getUnreadCount(@Req() req) {
    return this.messagingService.getUnreadCount(req.user.id);
  }

  // 3. ✅ NOUVELLE ROUTE : Récupérer UNE conversation (avec ses messages)
  @Get(':id')
  async getConversation(@Param('id') id: string, @Req() req) {
    return this.messagingService.getConversation(id, req.user.id);
  }

  // 4. Envoyer un message
  @Post(':id/messages')
  async sendMessage(
    @Param('id') conversationId: string,
    @Req() req,
    @Body() body: { content: string; attachments?: any[] }
  ) {
    return this.messagingService.sendMessage(
      conversationId,
      req.user.id,
      body.content,
      body.attachments
    );
  }
}