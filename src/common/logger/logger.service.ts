import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class AppLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
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

  // ✅ CORRECTION : Typage 'unknown' au lieu de 'any' et retour 'void'
  log(message: unknown, context?: string): void {
    this.logger.info(this.sanitizeMessage(message), { context });
  }

  error(message: unknown, trace?: string, context?: string): void {
    this.logger.error(this.sanitizeMessage(message), { trace, context });
  }

  warn(message: unknown, context?: string): void {
    this.logger.warn(this.sanitizeMessage(message), { context });
  }

  debug(message: unknown, context?: string): void {
    this.logger.debug(this.sanitizeMessage(message), { context });
  }

  verbose(message: unknown, context?: string): void {
    this.logger.verbose(this.sanitizeMessage(message), { context });
  }

  // ✅ CORRECTION : Logique de désinfection typée strictement
  private sanitizeMessage(message: unknown): any {
    // Cas 1 : C'est une chaîne de caractères
    if (typeof message === 'string') {
      const trimmed = message.trim();
      
      // Tentative de parsing JSON si ça ressemble à du JSON
      if (
        (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))
      ) {
        try {
          const parsed = JSON.parse(message);
          return JSON.stringify(this.sanitizeMessage(parsed));
        } catch {
          // Si ce n'est pas du JSON valide, on continue comme une string normale
        }
      }

      // Masquage des données sensibles dans la chaîne
      return message
        .replace(/password["\s]*:[\s"]*[^,\s}"]+/gi, 'password: [REDACTED]')
        .replace(/token["\s]*:[\s"]*[^,\s}"]+/gi, 'token: [REDACTED]')
        .replace(/secret["\s]*:[\s"]*[^,\s}"]+/gi, 'secret: [REDACTED]')
        .replace(/email["\s]*:[\s"]*[^,\s,}]+@[^\s,}]+/gi, 'email: [REDACTED]');
    }

    // Cas 2 : C'est un objet (et pas null)
    if (typeof message === 'object' && message !== null) {
      // On force le typage en Record pour pouvoir itérer sur les clés
      const sanitized = { ...(message as Record<string, unknown>) };
      const sensitiveKeys = ['password', 'token', 'secret', 'email'];

      for (const key of Object.keys(sanitized)) {
        if (sensitiveKeys.includes(key.toLowerCase())) {
          sanitized[key] = '[REDACTED]';
        } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
          sanitized[key] = this.sanitizeMessage(sanitized[key]);
        }
      }

      return sanitized;
    }

    // Cas 3 : Autre type (number, boolean, undefined...), on renvoie tel quel
    return message;
  }
}