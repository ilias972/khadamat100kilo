import { Module } from '@nestjs/common';
import { MessagingController } from './messaging.controller';
import { MessagingService } from './messaging.service'; // S'il existe, sinon retire-le
import { PrismaService } from '../../common/prisma.service';

@Module({
  controllers: [MessagingController],
  // Si tu n'as pas encore créé MessagingService, retire-le des providers pour l'instant
  providers: [MessagingService, PrismaService], 
})
export class MessagingModule {}