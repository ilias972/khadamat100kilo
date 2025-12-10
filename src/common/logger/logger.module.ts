import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerService } from './logger.service';
import { BusinessLoggerService } from './business-logger.service';

@Module({
  imports: [ConfigModule],
  providers: [AppLoggerService, BusinessLoggerService],
  exports: [AppLoggerService, BusinessLoggerService],
})
export class LoggerModule {}
