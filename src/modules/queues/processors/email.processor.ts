import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import * as nodemailer from 'nodemailer';
import { SentMessageInfo } from 'nodemailer'; // ✅ Import du type pour le résultat

export interface EmailJobData {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

@Injectable()
@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);
  private transporter: nodemailer.Transporter;

  constructor() {
    super();
    // Initialize email transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // ✅ CORRECTION : Retourne Promise<any> car on renvoie l'objet 'result' à la fin
  async process(job: Job<EmailJobData>): Promise<any> {
    this.logger.debug(`Processing email job ${job.id}`);

    const { to, subject, html, text, from } = job.data;

    try {
      const mailOptions = {
        from: from || process.env.SMTP_FROM || 'noreply@khadamat.com',
        to,
        subject,
        html,
        text,
      };

      // ✅ CORRECTION : Typage explicite du résultat pour éviter "unsafe member access"
      const result: SentMessageInfo = await this.transporter.sendMail(mailOptions);
      
      this.logger.log(`Email sent successfully to ${to}: ${result.messageId}`);

      return result;
    } catch (error) {
      // ✅ CORRECTION : Gestion propre de l'erreur inconnue
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Failed to send email to ${to}: ${errorMessage}`, error);
      throw error;
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<EmailJobData>) {
    this.logger.debug(`Email job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<EmailJobData>, err: Error) {
    this.logger.error(`Email job ${job.id} failed:`, err);
  }

  @OnWorkerEvent('active')
  onActive(job: Job<EmailJobData>) {
    this.logger.debug(`Email job ${job.id} is now active`);
  }
}