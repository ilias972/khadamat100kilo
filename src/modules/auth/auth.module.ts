import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { EmailService } from './email.service';
import { PrismaService } from '../../common/prisma.service';
import { LoggerModule } from '../../common/logger/logger.module';
import { BusinessLoggerService } from '../../common/logger/business-logger.service';

@Module({
  imports: [
    LoggerModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, EmailService, BusinessLoggerService],
  exports: [AuthService],
})
export class AuthModule {}
