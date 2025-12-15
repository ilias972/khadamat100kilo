import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, JobsOptions } from 'bullmq'; // ✅ Ajout de JobsOptions
import { EmailJobData } from './processors/email.processor';
import { NotificationJobData } from './processors/notification.processor';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('email') private emailQueue: Queue,
    @InjectQueue('notification') private notificationQueue: Queue,
  ) {}

  // Email queue methods
  // ✅ CORRECTION : options est typé 'JobsOptions' au lieu de 'any'
  async addEmailJob(data: EmailJobData, options?: JobsOptions) {
    return this.emailQueue.add('send-email', data, {
      priority: 1,
      delay: 0,
      ...options,
    });
  }

  async addBulkEmailJobs(jobs: { data: EmailJobData; options?: JobsOptions }[]) {
    const bullJobs = jobs.map((job) => ({
      name: 'send-email',
      data: job.data,
      opts: {
        priority: 1,
        delay: 0,
        ...job.options,
      },
    }));
    return this.emailQueue.addBulk(bullJobs);
  }

  // Notification queue methods
  async addNotificationJob(
    data: NotificationJobData,
    options?: JobsOptions,
  ) {
    return this.notificationQueue.add('send-notification', data, {
      priority: 2,
      delay: 0,
      ...options,
    });
  }

  async addBulkNotificationJobs(
    jobs: { data: NotificationJobData; options?: JobsOptions }[],
  ) {
    const bullJobs = jobs.map((job) => ({
      name: 'send-notification',
      data: job.data,
      opts: {
        priority: 2,
        delay: 0,
        ...job.options,
      },
    }));
    return this.notificationQueue.addBulk(bullJobs);
  }

  // Queue management methods
  async getEmailQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.emailQueue.getWaiting(),
      this.emailQueue.getActive(),
      this.emailQueue.getCompleted(),
      this.emailQueue.getFailed(),
      this.emailQueue.getDelayed(),
    ]);

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      delayed: delayed.length,
    };
  }

  async getNotificationQueueStats() {
    const [waiting, active, completed, failed, delayed] = await Promise.all([
      this.notificationQueue.getWaiting(),
      this.notificationQueue.getActive(),
      this.notificationQueue.getCompleted(),
      this.notificationQueue.getFailed(),
      this.notificationQueue.getDelayed(),
    ]);

    return {
      waiting: waiting.length,
      active: active.length,
      completed: completed.length,
      failed: failed.length,
      delayed: delayed.length,
    };
  }

  async cleanOldJobs(
    queue: 'email' | 'notification',
    grace = 24 * 60 * 60 * 1000,
  ) {
    const targetQueue =
      queue === 'email' ? this.emailQueue : this.notificationQueue;
    
    // Note: clean is deprecated in newer BullMQ versions, but we keep logic for now
    // to avoid breaking functionality, just fixing types.
    await targetQueue.clean(grace, 100, 'completed');
    await targetQueue.clean(grace, 100, 'failed');
  }

  // Scheduled jobs
  async scheduleEmail(data: EmailJobData, delay: number) {
    return this.addEmailJob(data, { delay });
  }

  async scheduleNotification(data: NotificationJobData, delay: number) {
    return this.addNotificationJob(data, { delay });
  }
}