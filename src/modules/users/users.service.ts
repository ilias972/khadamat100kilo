import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { clientProfile: true, proProfile: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfileSimple(userId: string, role: string, data: any) {
    console.log(`🚨 [SERVICE] Début update pour ${userId} (Role: ${role})`);

    // 1. Update USER (Téléphone)
    if (data.phone) {
      try {
        await this.prisma.user.update({
          where: { id: userId },
          data: { phone: data.phone },
        });
        console.log('🚨 [SERVICE] ✅ Téléphone mis à jour dans table User');
      } catch (e) {
        console.error('🚨 [SERVICE] ❌ Erreur update téléphone:', e);
      }
    }

    // 2. Préparation des données Profil
    const profileData: any = {};
    if (data.firstName) profileData.firstName = data.firstName;
    if (data.lastName) profileData.lastName = data.lastName;

    console.log('🚨 [SERVICE] Données à mettre à jour dans le profil:', profileData);

    // 3. Update PROFIL (Client ou Pro)
    if (Object.keys(profileData).length > 0) {
      if (role === 'CLIENT') {
        // Vérification d'existence (Conseil de Claude)
        const exists = await this.prisma.clientProfile.findUnique({ where: { userId } });
        
        if (!exists) {
            console.log('🚨 [SERVICE] ⚠️ ATTENTION: Le ClientProfile n\'existe pas ! Création automatique...');
            // Auto-repair : On le crée s'il manque
            await this.prisma.clientProfile.create({
                data: {
                    userId,
                    firstName: data.firstName || 'Inconnu',
                    lastName: data.lastName || 'Inconnu',
                }
            });
             console.log('🚨 [SERVICE] ✅ ClientProfile créé avec succès');
        } else {
            await this.prisma.clientProfile.update({
                where: { userId },
                data: profileData
            });
            console.log('🚨 [SERVICE] ✅ ClientProfile mis à jour');
        }
      } 
      else if (role === 'PRO') {
         // Même logique pour le Pro
         const exists = await this.prisma.proProfile.findUnique({ where: { userId } });
         if (!exists) {
            console.log('🚨 [SERVICE] ⚠️ Le ProProfile n\'existe pas !');
         } else {
            await this.prisma.proProfile.update({
                where: { userId },
                data: profileData
            });
            console.log('🚨 [SERVICE] ✅ ProProfile mis à jour');
         }
      }
    }

    console.log('🚨 [SERVICE] Fin de la procédure. Renvoi des données fraîches.');
    
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { clientProfile: true, proProfile: true },
    });
  }
}