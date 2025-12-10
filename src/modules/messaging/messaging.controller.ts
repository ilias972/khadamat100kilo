import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { SendMessageDto, CreateConversationDto } from './dtos/send-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('conversations')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get()
  async getConversations(@Request() req) {
    return this.messagingService.getUserConversations(req.user.id);
  }

  @Get(':id/messages')
  async getConversationMessages(
    @Param('id') conversationId: string,
    @Request() req,
  ) {
    const conversation = await this.messagingService.getConversation(
      conversationId,
      req.user.id,
    );

    // Mark messages as read when fetching
    await this.messagingService.markMessagesAsRead(conversationId, req.user.id);

    return conversation.messages;
  }

  @Post(':id/messages')
  async sendMessage(
    @Param('id') conversationId: string,
    @Request() req,
    @Body() dto: SendMessageDto,
  ) {
    return this.messagingService.sendMessage(conversationId, req.user.id, dto);
  }
}
