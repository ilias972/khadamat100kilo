import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLoggerService } from '../../common/logger/logger.service';
import { PrismaService } from '../../common/prisma.service';

export interface HealthStatus {
  status: 'ok' | 'error';
  timestamp: string;
  version: string;
  uptime: number;
  database?: {
    status: 'ok' | 'error';
    responseTime?: number;
    error?: string;
  };
}

@Injectable()
export class HealthService {
  constructor(
    private configService: ConfigService,
    private logger: AppLoggerService,
    private prisma: PrismaService,
  ) {}

  async getHealthStatus(): Promise<HealthStatus> {
    const startTime = Date.now();
    let dbStatus: HealthStatus['database'];

    try {
      // Simple DB health check - count users
      const dbStartTime = Date.now();
      await this.prisma.user.count({ take: 1 });
      const dbResponseTime = Date.now() - dbStartTime;

      dbStatus = {
        status: 'ok',
        responseTime: dbResponseTime,
      };

      this.logger.log(
        `Health check passed - DB response time: ${dbResponseTime}ms`,
      );
    } catch (error) {
      dbStatus = {
        status: 'error',
        error:
          error instanceof Error ? error.message : 'Unknown database error',
      };

      this.logger.error(
        `Health check failed - Database error: ${dbStatus.error}`,
      );
    }

    const healthStatus: HealthStatus = {
      status: dbStatus.status === 'ok' ? 'ok' : 'error',
      timestamp: new Date().toISOString(),
      version: this.configService.get('app.version') || '1.0.0',
      uptime: process.uptime(),
      database: dbStatus,
    };

    return healthStatus;
  }

  async getDatabaseHealth() {
    try {
      const startTime = Date.now();
      // Enhanced database health check with multiple queries
      const [userCount, serviceCount] = await Promise.all([
        this.prisma.user.count(),
        this.prisma.proService.count(),
      ]);

      const responseTime = Date.now() - startTime;

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        responseTime,
        message: 'Database connection successful',
        metrics: {
          userCount,
          serviceCount,
          averageResponseTime: responseTime,
        },
      };
    } catch (error) {
      this.logger.error(
        `Database health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );

      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        error:
          error instanceof Error ? error.message : 'Unknown database error',
        recoverySuggestion: 'Check database connection and credentials',
      };
    }
  }

  /**
   * Get load average in a cross-platform way
   */
  private getLoadAverage(): string[] | null {
    try {
      // Use dynamic access to avoid TypeScript errors
      const os = require('os');
      if (os.loadavg) {
        return os.loadavg().map((avg: number) => avg.toFixed(2));
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get comprehensive system health status including memory and CPU usage
   */
  async getSystemHealth() {
    try {
      const memoryUsage = process.memoryUsage();
      const cpuUsage = process.cpuUsage();
      const loadAverage = this.getLoadAverage();

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        systemMetrics: {
          memory: {
            rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
            heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
            external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
          },
          cpu: {
            user: `${cpuUsage.user / 1000} ms`,
            system: `${cpuUsage.system / 1000} ms`,
          },
          uptime: `${process.uptime().toFixed(2)} seconds`,
          ...(loadAverage ? { loadAverage } : {}),
        },
      };
    } catch (error) {
      this.logger.error(
        `System health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );

      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        error:
          error instanceof Error ? error.message : 'Unknown system error',
      };
    }
  }
}
