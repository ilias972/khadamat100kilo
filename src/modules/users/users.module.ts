import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../../common/prisma.service';
import { BusinessLoggerService } from '../../common/logger/business-logger.service';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, BusinessLoggerService],
})
export class UsersModule {}
