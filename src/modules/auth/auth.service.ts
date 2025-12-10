import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma.service';
import { EmailService } from './email.service';
import { BusinessLoggerService } from '../../common/logger/business-logger.service';
import { AppLoggerService } from '../../common/logger/logger.service';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import {
  VerifyEmailDto,
  ResendVerificationDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dtos/verify-email.dto';

@Injectable()
export class AuthService {
constructor(
private prisma: PrismaService,
private jwtService: JwtService,
private emailService: EmailService,
private businessLogger: BusinessLoggerService,
private appLogger: AppLoggerService,
) {}

async signup(dto: SignupDto) {
  const startTime = Date.now();
  console.log(`🚀 [PERF] Starting signup for ${dto.email}...`);

  const {
    email,
    phone,
    password,
    role,
    firstName,
    lastName,
    profession,
    bio,
  } = dto;

  // Map string role to enum
  const userRole = role === 'PRO' ? Role.PRO : Role.CLIENT;

  // Validate profession for pro role
  if (userRole === Role.PRO && !profession) {
    throw new BadRequestException('Profession is required for pro accounts');
  }

  // Hash password
  const hashStart = Date.now();
  const passwordHash = await bcrypt.hash(password, 10);
  const hashTime = Date.now() - hashStart;
  console.log(`⏱️ [PERF] Password hash: ${hashTime}ms`);

  // Generate email verification token
  const tokenStart = Date.now();
  const emailVerificationToken = randomBytes(32).toString('hex');
  const tokenTime = Date.now() - tokenStart;
  console.log(`⏱️ [PERF] Generate token: ${tokenTime}ms`);

  // Use transaction for atomic operations
  const txStart = Date.now();
  const user = await this.prisma.$transaction(async (tx) => {
    // Check if user exists inside transaction
    const checkStart = Date.now();
    const existing = await tx.user.findFirst({
      where: { OR: [{ email }, { phone }] },
    });
    const checkTime = Date.now() - checkStart;
    console.log(`⏱️ [PERF] Check existing user: ${checkTime}ms`);

    if (existing) {
      throw new ConflictException('User already exists');
    }

// Create user with profile
    const createStart = Date.now();
    const createdUser = await tx.user.create({
      data: {
        email,
        phone,
        passwordHash,
        role: userRole,
        emailVerificationToken,
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
    const createTime = Date.now() - createStart;
    console.log(`⏱️ [PERF] Create user: ${createTime}ms`);

    return createdUser;
  });
  const txTime = Date.now() - txStart;
  console.log(`⏱️ [PERF] Transaction total: ${txTime}ms`);

  // Log user registration
  const logStart = Date.now();
  this.businessLogger.logSecurityEvent(
    'USER_REGISTERED',
    user.id,
    undefined,
    undefined,
    { role, email },
  );
  const logTime = Date.now() - logStart;
  console.log(`⏱️ [PERF] Business logging: ${logTime}ms`);

  // Send verification email
  try {
    // await this.emailService.sendEmailVerification(email, emailVerificationToken);
  } catch (error) {
    this.businessLogger.logError(
      'EMAIL_VERIFICATION_SEND_FAILED',
      error as Error,
      user.id,
      { email },
    );
  }

  const tokenStart2 = Date.now();
  const tokens = this.generateTokens(user);
  const tokenTime2 = Date.now() - tokenStart2;
  console.log(`⏱️ [PERF] Generate JWT tokens: ${tokenTime2}ms`);

  const totalTime = Date.now() - startTime;
  console.log(`✅ [PERF] TOTAL SIGNUP TIME: ${totalTime}ms (${(totalTime/1000).toFixed(2)}s)`);

  // SECURITY FIX: Sanitize user object to remove passwordHash
  return { user: this.sanitizeUser(user), ...tokens };
}

async register(dto: RegisterDto) {
  const metrics = {
    start: Date.now(),
    checkEmail: 0,
    checkPhone: 0,
    hashPassword: 0,
    createUser: 0,
    generateTokens: 0,
    total: 0,
  };

  try {
    const t1 = Date.now();
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    metrics.checkEmail = Date.now() - t1;

    if (existingUser) {
      throw new ConflictException('Email déjà utilisé');
    }

    const t1b = Date.now();
    const existingPhone = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });
    metrics.checkPhone = Date.now() - t1b;

    if (existingPhone) {
      throw new ConflictException('Téléphone déjà utilisé');
    }

    const t2 = Date.now();
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    metrics.hashPassword = Date.now() - t2;

    const t3 = Date.now();
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hashedPassword,
        role: dto.role,
        phone: dto.phone,
        ...(dto.role === 'CLIENT' && {
          clientProfile: {
            create: {
              firstName: dto.firstName,
              lastName: dto.lastName,
            },
          },
        }),
        ...(dto.role === 'PRO' && {
          proProfile: {
            create: {
              firstName: dto.firstName,
              lastName: dto.lastName,
              profession: 'General Service Provider',
            },
          },
        }),
      },
      include: {
        clientProfile: true,
        proProfile: true,
      },
    });
    metrics.createUser = Date.now() - t3;

    const t4 = Date.now();
    const tokens = this.generateTokens(user);
    metrics.generateTokens = Date.now() - t4;

    metrics.total = Date.now() - metrics.start;

    this.appLogger.log(`[REGISTRATION METRICS] ${JSON.stringify(metrics)}`);

    if (metrics.total > 2000) {
      this.appLogger.warn(
        `[SLOW REGISTRATION] Total: ${metrics.total}ms - Email check: ${metrics.checkEmail}ms, Phone check: ${metrics.checkPhone}ms, Hash: ${metrics.hashPassword}ms, Create: ${metrics.createUser}ms, Tokens: ${metrics.generateTokens}ms`,
      );
    }

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  } catch (error) {
    metrics.total = Date.now() - metrics.start;
    this.appLogger.error(`[REGISTRATION ERROR] After ${metrics.total}ms: ${error.message}`);
    throw error;
  }
}

async login(dto: LoginDto) {
  const { email, password } = dto;

  const user = await this.prisma.user.findUnique({
    where: { email },
    include: {
      clientProfile: true,
      proProfile: true,
    },
  });

  const invalidCredentials =
    !user || !user.passwordHash || !(await bcrypt.compare(password, user.passwordHash));

  if (invalidCredentials) {
    this.businessLogger.logSecurityEvent(
      'LOGIN_FAILED',
      user?.id || 'unknown',
      undefined,
      undefined,
      { email },
    );
    throw new UnauthorizedException('Invalid credentials');
  }

  if (!user.isEmailVerified) {
    this.businessLogger.logSecurityEvent(
      'LOGIN_FAILED',
      user.id,
      undefined,
      undefined,
      { reason: 'EMAIL_NOT_VERIFIED', email },
    );
    throw new UnauthorizedException('Please verify your email before logging in');
  }

  this.businessLogger.logSecurityEvent(
    'LOGIN_SUCCESS',
    user.id,
    undefined,
    undefined,
    { email },
  );

  await this.prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  const tokens = this.generateTokens(user);
  return { user: this.sanitizeUser(user), ...tokens };
}

async refreshToken(refreshToken: string) {
try {
const payload = this.jwtService.verify(refreshToken, {
secret: process.env.JWT_REFRESH_SECRET,
});
const user = await this.prisma.user.findUnique({
where: { id: payload.sub },
include: {
clientProfile: true,
proProfile: true,
},
});
if (!user) throw new UnauthorizedException();

  const tokens = this.generateTokens(user);
  // SECURITY FIX: Sanitize user object
  return { user: this.sanitizeUser(user), ...tokens };
} catch {
  throw new UnauthorizedException();
}
}

  // Helper to remove sensitive fields
  private sanitizeUser(user: User) {
    const { passwordHash, emailVerificationToken, passwordResetToken, passwordResetExpires, ...sanitized } = user;
    return sanitized;
  }

  private generateTokens(user: User) {
const payload = { sub: user.id, role: user.role };
return {
access_token: this.jwtService.sign(payload, { expiresIn: '1h' }),
refresh_token: this.jwtService.sign(payload, {
expiresIn: '7d',
secret: process.env.JWT_REFRESH_SECRET,
}),
};
}

// Keep existing methods for verifyEmail, resendVerification, forgotPassword, resetPassword
// ... (Assume existing code for these methods remains unchanged unless you need them too)
async verifyEmail(dto: VerifyEmailDto) {
const user = await this.prisma.user.findUnique({ where: { emailVerificationToken: dto.token } });
if (!user) throw new BadRequestException('Invalid verification token');
if (user.isEmailVerified) throw new BadRequestException('Email already verified');
await this.prisma.user.update({ where: { id: user.id }, data: { isEmailVerified: true, emailVerificationToken: null } });
return { message: 'Email verified successfully' };
}

async resendVerification(dto: ResendVerificationDto) {
const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
if (!user) throw new BadRequestException('User not found');
if (user.isEmailVerified) throw new BadRequestException('Email already verified');
const emailVerificationToken = randomBytes(32).toString('hex');
await this.prisma.user.update({ where: { id: user.id }, data: { emailVerificationToken } });
return { message: 'Verification email sent' };
}

async forgotPassword(dto: ForgotPasswordDto) {
const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
if (!user) return { message: 'If the email exists, a reset link has been sent' };
const passwordResetToken = randomBytes(32).toString('hex');
const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
await this.prisma.user.update({ where: { id: user.id }, data: { passwordResetToken, passwordResetExpires } });
// Send email logic here
return { message: 'If the email exists, a reset link has been sent' };
}

async resetPassword(dto: ResetPasswordDto) {
const user = await this.prisma.user.findFirst({
where: { passwordResetToken: dto.token, passwordResetExpires: { gt: new Date() } },
});
if (!user) throw new BadRequestException('Invalid or expired reset token');
const passwordHash = await bcrypt.hash(dto.newPassword, 10);
await this.prisma.user.update({
where: { id: user.id },
data: { passwordHash, passwordResetToken: null, passwordResetExpires: null },
});
return { message: 'Password reset successfully' };
}
}
