import { Injectable, BadRequestException } from '@nestjs/common';

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

@Injectable()
export class RateLimiterService {
  private readonly limits = new Map<string, RateLimitEntry>();

  // Rate limit for messages: 10 messages per minute per user
  private readonly MESSAGE_LIMIT = 10;
  private readonly MESSAGE_WINDOW = 60 * 1000; // 1 minute

  // Rate limit for disputes: 3 disputes per day per user
  private readonly DISPUTE_LIMIT = 3;
  private readonly DISPUTE_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

  checkMessageRateLimit(userId: string): void {
    const key = `messages:${userId}`;
    const now = Date.now();

    const entry = this.limits.get(key);

    if (!entry || now > entry.resetTime) {
      // First message or window expired
      this.limits.set(key, {
        count: 1,
        resetTime: now + this.MESSAGE_WINDOW,
      });
      return;
    }

    if (entry.count >= this.MESSAGE_LIMIT) {
      const remainingTime = Math.ceil((entry.resetTime - now) / 1000);
      throw new BadRequestException(
        `Message rate limit exceeded. Try again in ${remainingTime} seconds.`,
      );
    }

    entry.count++;
  }

  checkDisputeRateLimit(userId: string): void {
    const key = `disputes:${userId}`;
    const now = Date.now();

    const entry = this.limits.get(key);

    if (!entry || now > entry.resetTime) {
      // First dispute or window expired
      this.limits.set(key, {
        count: 1,
        resetTime: now + this.DISPUTE_WINDOW,
      });
      return;
    }

    if (entry.count >= this.DISPUTE_LIMIT) {
      const remainingTime = Math.ceil((entry.resetTime - now) / (60 * 1000)); // minutes
      throw new BadRequestException(
        `Dispute rate limit exceeded. You can create ${this.DISPUTE_LIMIT} disputes per day. Try again in ${remainingTime} minutes.`,
      );
    }

    entry.count++;
  }

  // Clean up expired entries periodically (could be called by a cron job)
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key);
      }
    }
  }

  // Get current rate limit status for monitoring
  getRateLimitStatus(userId: string, type: 'messages' | 'disputes') {
    const key = `${type}:${userId}`;
    const entry = this.limits.get(key);
    const now = Date.now();

    if (!entry || now > entry.resetTime) {
      return {
        current: 0,
        limit: type === 'messages' ? this.MESSAGE_LIMIT : this.DISPUTE_LIMIT,
        remaining:
          type === 'messages' ? this.MESSAGE_LIMIT : this.DISPUTE_LIMIT,
        resetTime: null,
      };
    }

    const limit = type === 'messages' ? this.MESSAGE_LIMIT : this.DISPUTE_LIMIT;
    return {
      current: entry.count,
      limit,
      remaining: Math.max(0, limit - entry.count),
      resetTime: entry.resetTime,
    };
  }
}
