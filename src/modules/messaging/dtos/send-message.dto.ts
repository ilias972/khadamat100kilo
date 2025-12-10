import { IsString, IsOptional, IsArray, IsUUID } from 'class-validator';

export class SendMessageDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}

export class CreateConversationDto {
  @IsUUID()
  participant2Id: string;

  @IsOptional()
  @IsUUID()
  bookingId?: string;
}
