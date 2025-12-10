import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { BusinessLoggerService } from '../../common/logger/business-logger.service';
import { Role } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { UpdateUserProfileDto } from './dtos/update-user-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private businessLogger: BusinessLoggerService,
  ) {}

  async findProfile(userId: string) {
    const user = await this.prisma.findUserByIdCached(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(userId: string, data: UpdateUserProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        clientProfile: true,
        proProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Handle profile updates based on user role
    const updateData: Prisma.UserUpdateInput = {};

    // Handle direct profile fields
    const profileUpdate: Prisma.ClientProfileUpdateInput | Prisma.ProProfileUpdateInput = {};
    if (data.firstName !== undefined) profileUpdate.firstName = data.firstName;
    if (data.lastName !== undefined) profileUpdate.lastName = data.lastName;
    if (data.bio !== undefined && user.role === Role.PRO) (profileUpdate as Prisma.ProProfileUpdateInput).bio = data.bio;

    if (Object.keys(profileUpdate).length > 0) {
      if (user.role === Role.CLIENT) {
        updateData.clientProfile = { update: profileUpdate };
      } else if (user.role === Role.PRO) {
        updateData.proProfile = { update: profileUpdate };
      }
    }

    if (user.role === Role.CLIENT && data.clientProfile) {
      updateData.clientProfile = { update: data.clientProfile };
    }

    if (user.role === Role.PRO && data.proProfile) {
      updateData.proProfile = { update: data.proProfile };
    }

    // Update user-level fields if provided
    if (data.phone) updateData.phone = data.phone;

    return this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        clientProfile: true,
        proProfile: true,
      },
    });
  }

  async softDeleteUser(userId: string, adminId: string) {
    // Verify user exists and is not already deleted
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.deletedAt) {
      throw new ForbiddenException('User is already deleted');
    }

    // Soft delete the user
    const deletedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        status: 'deleted',
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Log the deletion
    this.businessLogger.logSecurityEvent(
      'USER_SOFT_DELETED',
      userId,
      undefined,
      undefined,
      { deletedBy: adminId, userEmail: user.email },
    );

    return deletedUser;
  }

  async restoreUser(userId: string, adminId: string) {
    // Verify user exists and is deleted
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.deletedAt) {
      throw new ForbiddenException('User is not deleted');
    }

    // Restore the user
    const restoredUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        status: 'active',
        deletedAt: null,
        updatedAt: new Date(),
      },
    });

    // Log the restoration
    this.businessLogger.logSecurityEvent(
      'USER_RESTORED',
      userId,
      undefined,
      undefined,
      { restoredBy: adminId, userEmail: user.email },
    );

    return restoredUser;
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
      throw new BadRequestException('Current password is incorrect');
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    return { message: 'Password changed successfully' };
  }
}
