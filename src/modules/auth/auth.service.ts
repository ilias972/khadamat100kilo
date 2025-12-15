import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  // --- REGISTER ---
  async register(data: any) {
    const { email, password, phone, role, firstName, lastName } = data;

    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
    
    if (existing) throw new ConflictException('Un utilisateur avec cet email ou téléphone existe déjà');

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role === 'pro' || role === 'PRO' ? 'PRO' : 'CLIENT';

    await this.prisma.user.create({
      data: {
        email,
        phone,
        passwordHash: hashedPassword,
        role: userRole as any,
        clientProfile: userRole === 'CLIENT' ? { create: { firstName, lastName } } : undefined,
        proProfile: userRole === 'PRO' ? { create: { firstName, lastName, profession: data.profession || 'Pro', bio: '' } } : undefined,
      },
    });

    return this.login(email, password);
  }

  // --- LOGIN (PROPRE) ---
  async login(email: string, pass: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      include: {
        clientProfile: true,
        proProfile: true
      }
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.clientProfile?.firstName || user.proProfile?.firstName || 'Utilisateur',
        lastName: user.clientProfile?.lastName || user.proProfile?.lastName || '',
      }
    };
  }
}