import { Injectable, Logger } from '@nestjs/common';
import { AppLoggerService } from './logger.service';

export interface BusinessEvent {
  event: string;
  entityId: string;
  entityType: string;
  userId?: string;
  userRole?: string;
  oldValue?: any;
  newValue?: any;
  metadata?: Record<string, any>;
  timestamp: string;
}

@Injectable()
export class BusinessLoggerService {
  private readonly logger = new Logger('BusinessEvent');

  constructor(private appLogger: AppLoggerService) {}

  logBookingStatusChange(
    bookingId: string,
    oldStatus: string,
    newStatus: string,
    userId: string,
    userRole: string,
    metadata?: Record<string, any>,
  ) {
    const event: BusinessEvent = {
      event: 'BOOKING_STATUS_CHANGED',
      entityId: bookingId,
      entityType: 'booking',
      userId,
      userRole,
      oldValue: { status: oldStatus },
      newValue: { status: newStatus },
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.appLogger.log(JSON.stringify(event), 'BusinessEvent');
  }

  logDisputeCreated(
    disputeId: string,
    bookingId: string,
    userId: string,
    userRole: string,
    reason: string,
    metadata?: Record<string, any>,
  ) {
    const event: BusinessEvent = {
      event: 'DISPUTE_CREATED',
      entityId: disputeId,
      entityType: 'dispute',
      userId,
      userRole,
      newValue: { bookingId, reason },
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.appLogger.log(JSON.stringify(event), 'BusinessEvent');
  }

  logDisputeResolved(
    disputeId: string,
    adminId: string,
    oldStatus: string,
    newStatus: string,
    resolution?: string,
    metadata?: Record<string, any>,
  ) {
    const event: BusinessEvent = {
      event: 'DISPUTE_RESOLVED',
      entityId: disputeId,
      entityType: 'dispute',
      userId: adminId,
      userRole: 'admin',
      oldValue: { status: oldStatus },
      newValue: { status: newStatus, resolution },
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.appLogger.log(JSON.stringify(event), 'BusinessEvent');
  }

  logReviewCreated(
    reviewId: string,
    bookingId: string,
    clientId: string,
    proId: string,
    rating: number,
    metadata?: Record<string, any>,
  ) {
    const event: BusinessEvent = {
      event: 'REVIEW_CREATED',
      entityId: reviewId,
      entityType: 'review',
      userId: clientId,
      userRole: 'client',
      newValue: { bookingId, proId, rating },
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.appLogger.log(JSON.stringify(event), 'BusinessEvent');
  }

  logConversationCreated(
    conversationId: string,
    bookingId: string,
    participant1Id: string,
    participant2Id: string,
    metadata?: Record<string, any>,
  ) {
    const event: BusinessEvent = {
      event: 'CONVERSATION_CREATED',
      entityId: conversationId,
      entityType: 'conversation',
      newValue: { bookingId, participant1Id, participant2Id },
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.appLogger.log(JSON.stringify(event), 'BusinessEvent');
  }

  logSecurityEvent(
    event: string,
    userId: string,
    ipAddress?: string,
    userAgent?: string,
    metadata?: Record<string, any>,
  ) {
    const securityEvent: BusinessEvent = {
      event: `SECURITY_${event.toUpperCase()}`,
      entityId: userId,
      entityType: 'security',
      userId,
      metadata: {
        ipAddress,
        userAgent,
        ...metadata,
      },
      timestamp: new Date().toISOString(),
    };

    this.appLogger.warn(JSON.stringify(securityEvent), 'BusinessEvent');
  }

  logError(
    operation: string,
    error: Error,
    userId?: string,
    metadata?: Record<string, any>,
  ) {
    const errorEvent = {
      event: 'ERROR_OCCURRED',
      operation,
      userId,
      error: {
        name: error.name,
        message: error.message,
        // Don't log stack trace in production for security
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      metadata,
      timestamp: new Date().toISOString(),
    };

    this.appLogger.error(JSON.stringify(errorEvent), 'BusinessEvent');
  }
}
