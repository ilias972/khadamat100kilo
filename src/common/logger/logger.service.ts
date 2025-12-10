import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor(private configService?: ConfigService) {
    const isProduction = process.env.NODE_ENV === 'production';

    this.logger = winston.createLogger({
      level: isProduction ? 'info' : 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      defaultMeta: { service: 'khadamat-api' },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        // Always add file transports for better observability
        new winston.transports.File({
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          filename: 'combined.log',
        }),
      ],
    });
  }

  log(message: any, context?: string) {
    this.logger.info(this.sanitizeMessage(message), { context });
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(this.sanitizeMessage(message), { trace, context });
  }

  warn(message: any, context?: string) {
    this.logger.warn(this.sanitizeMessage(message), { context });
  }

  debug(message: any, context?: string) {
    this.logger.debug(this.sanitizeMessage(message), { context });
  }

  verbose(message: any, context?: string) {
    this.logger.verbose(this.sanitizeMessage(message), { context });
  }

  private sanitizeMessage(message: any): any {
    // If it's a string that looks like JSON, try to parse and sanitize it
    if (typeof message === 'string') {
      // Check if it looks like JSON
      const trimmed = message.trim();
      if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
          (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
        try {
          const parsed = JSON.parse(message);
          return JSON.stringify(this.sanitizeMessage(parsed));
        } catch {
          // If parsing fails, treat as regular string
        }
      }

      // Remove potential sensitive data patterns
      return message
        .replace(/password["\s]*:[\s"]*[^,\s}"]+/gi, 'password: [REDACTED]')
        .replace(/token["\s]*:[\s"]*[^,\s}"]+/gi, 'token: [REDACTED]')
        .replace(/secret["\s]*:[\s"]*[^,\s}"]+/gi, 'secret: [REDACTED]')
        .replace(/email["\s]*:[\s"]*[^,\s,}]+@[^\s,}]+/gi, 'email: [REDACTED]');
    }

    if (typeof message === 'object' && message !== null) {
      const sanitized = { ...message };
      const sensitiveKeys = ['password', 'token', 'secret', 'email'];

      for (const key of Object.keys(sanitized)) {
        if (sensitiveKeys.includes(key.toLowerCase())) {
          sanitized[key] = '[REDACTED]';
        } else if (typeof sanitized[key] === 'object') {
          sanitized[key] = this.sanitizeMessage(sanitized[key]);
        }
      }

      return sanitized;
    }

    return message;
  }
}
