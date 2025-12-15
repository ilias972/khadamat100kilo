import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from '../../../common/prisma.service';

export interface NotificationJobData {
  userId: string;
  type: string;
  title: string;
  message: string;
  payload?: any;
  channel?: 'email' | 'push' | 'in-app';
}

@Injectable()
@Processor('notification')
export class NotificationProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationProcessor.name);

  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<NotificationJobData>): Promise<void> {
    this.logger.debug(`Processing notification job ${job.id}`);

    const { userId, type, title, message, payload, channel } = job.data;

    try {
      // Create in-app notification
      await this.prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          channel: channel || 'in-app',
          payload: payload ? JSON.stringify(payload) : null,
        },
      });

      // If email channel is specified, queue email job
      if (channel === 'email') {
        // Get user email
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
          select: { email: true },
        });

        if (user?.email) {
          // Here you would inject and use the email queue
          // For now, we'll just log it
          this.logger.log(
            `Would send email notification to ${user.email}: ${title}`,
          );
        }
      }

      // If push channel is specified, handle push notifications
      if (channel === 'push') {
        // Handle push notification logic here
        this.logger.log(
          `Would send push notification to user ${userId}: ${title}`,
        );
      }

      this.logger.log(`Notification created for user ${userId}: ${type}`);
      return;
    } catch (error) {
      this.logger.error(
        `Failed to process notification for user ${userId}:`,
        error,
      );
      throw error;
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<NotificationJobData>) {
    this.logger.debug(`Notification job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<NotificationJobData>, err: Error) {
    this.logger.error(`Notification job ${job.id} failed:`, err);
  }

  @OnWorkerEvent('active')
  onActive(job: Job<NotificationJobData>) {
    this.logger.debug(`Notification job ${job.id} is now active`);
  }
}
