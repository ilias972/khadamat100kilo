import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export interface DeadLetterJobData {
  originalQueue: string;
  originalJobId: string;
  failedReason: string;
  jobData: any;
  failedAt: Date;
}

@Injectable()
@Processor('dead-letter')
export class DeadLetterProcessor extends WorkerHost {
  private readonly logger = new Logger(DeadLetterProcessor.name);

  async process(job: Job<DeadLetterJobData>): Promise<void> {
    this.logger.warn(`Processing dead letter job ${job.id}`);

    const { originalQueue, originalJobId, failedReason, jobData } = job.data;

    // Log the dead letter job for monitoring
    this.logger.error(
      `Job ${originalJobId} from queue ${originalQueue} moved to dead letter queue. Reason: ${failedReason}`,
      {
        originalJobId,
        originalQueue,
        failedReason,
        jobData,
        failedAt: job.data.failedAt,
      },
    );

    // Here you could:
    // 1. Send alerts to administrators
    // 2. Store in a database for manual review
    // 3. Attempt recovery strategies
    // 4. Send notifications

    // For now, we'll just log it
    this.logger.warn(`Dead letter job processed: ${job.id}`);

    return;
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job<DeadLetterJobData>) {
    this.logger.debug(`Dead letter job ${job.id} processed successfully`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job<DeadLetterJobData>, err: Error) {
    this.logger.error(`Dead letter job ${job.id} failed to process:`, err);
  }
}
