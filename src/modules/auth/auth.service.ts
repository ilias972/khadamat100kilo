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

  // --- LOGIN (AVEC LOGS DE DEBUG) ---
  async login(email: string, pass: string) {
    console.log('\n--- 🕵️‍♂️ TENTATIVE DE CONNEXION ---');
    console.log(`1. Email reçu du front : "${email}"`);
    console.log(`2. Mot de passe reçu   : "${pass}"`);

    const user = await this.prisma.user.findUnique({ 
      where: { email },
      include: {
        clientProfile: true,
        proProfile: true
      }
    });

    if (!user) {
      console.log('❌ ERREUR : Utilisateur introuvable dans la DB via Prisma.');
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    
    console.log(`3. Utilisateur trouvé  : ID ${user.id}`);
    
    // Vérification de sécurité sur le hash
    if (!user.passwordHash) {
      console.log('❌ ERREUR : Pas de hash sur cet utilisateur.');
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    console.log(`4. Hash en base        : ${user.passwordHash.substring(0, 15)}...`);

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    console.log(`5. Résultat comparaison bcrypt : ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);

    if (!isMatch) {
      console.log('❌ ERREUR : Le mot de passe ne correspond pas au hash.');
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    console.log('✅ SUCCÈS : Génération du token...');

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