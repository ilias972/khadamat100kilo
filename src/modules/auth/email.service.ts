import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT ?? 587),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmailVerification(email: string, token: string) {
    // PATCH: Bypass email sending in development to prevent timeout
    if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_USER) {
      console.log('================================================');
      console.log('📧 MOCK EMAIL SERVICE (Dev Mode)');
      console.log(`To: ${email}`);
      console.log(`Context/Token:`, token);
      console.log('================================================');
      return true;
    }
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your Khadamat account',
      html: `
        <h1>Welcome to Khadamat!</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create an account, please ignore this email.</p>
      `,
    });
  }

  async sendPasswordReset(email: string, token: string) {
    // PATCH: Bypass email sending in development to prevent timeout
    if (process.env.NODE_ENV === 'development' || !process.env.EMAIL_USER) {
      console.log('================================================');
      console.log('📧 MOCK EMAIL SERVICE (Dev Mode)');
      console.log(`To: ${email}`);
      console.log(`Context/Token:`, token);
      console.log('================================================');
      return true;
    }
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset your Khadamat password',
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset for your Khadamat account.</p>
        <p>Please click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });
  }
}
