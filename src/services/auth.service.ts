import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(emailOrPhone: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      },
      include: {
        clientProfile: true,
        proProfile: true,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error('Invalid credentials');
    }

    return user;
  }

  async register(data: {
    email: string;
    phone: string;
    password: string;
    role: string;
    firstName: string;
    lastName: string;
    profession?: string;
    bio?: string;
  }) {
    const { email, phone, password, role, firstName, lastName, profession, bio } = data;

    // Check if user exists
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
    if (existing) {
      throw new Error('User already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Map string role to enum
    const userRole = role === 'pro' ? Role.PRO : Role.CLIENT;

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        phone,
        passwordHash,
        role: userRole,
        ...(userRole === Role.CLIENT && {
          clientProfile: { create: { firstName, lastName } },
        }),
        ...(userRole === Role.PRO && {
          proProfile: {
            create: { firstName, lastName, profession: profession!, bio },
          },
        }),
      },
      include: {
        clientProfile: true,
        proProfile: true,
      },
    });

    return user;
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        clientProfile: true,
        proProfile: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}