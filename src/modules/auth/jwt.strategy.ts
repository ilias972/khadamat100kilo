import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'MA_SUPER_CLE_SECRETE_123', // ⚠️ Doit correspondre à celle de auth.module.ts
    });
  }

  async validate(payload: any) {
    // On vérifie que l'utilisateur existe toujours
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: {
        clientProfile: true, // On charge les profils pour le controller
        proProfile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    // Ce que tu retournes ici est injecté dans req.user
    return user;
  }
}