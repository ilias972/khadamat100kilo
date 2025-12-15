import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../../common/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// 👇 C'est cette ligne qui manquait !
import { JwtStrategy } from './jwt.strategy'; 

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'MA_SUPER_CLE_SECRETE_123', // Doit correspondre à celle dans jwt.strategy.ts
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService], // ✅ Maintenant il le connait
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}