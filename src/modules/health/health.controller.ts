import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Get application health status' })
  @ApiResponse({ status: 200, description: 'Application is healthy' })
  async getHealth() {
    return this.healthService.getHealthStatus();
  }

  @Get('db')
  @ApiOperation({ summary: 'Get database health status' })
  @ApiResponse({ status: 200, description: 'Database is healthy' })
  @ApiResponse({ status: 503, description: 'Database is unhealthy' })
  async getDatabaseHealth() {
    return this.healthService.getDatabaseHealth();
  }

  @Get('system')
  @ApiOperation({ summary: 'Get comprehensive system health status' })
  @ApiResponse({ status: 200, description: 'System health metrics' })
  @ApiResponse({ status: 503, description: 'System health check failed' })
  async getSystemHealth() {
    return this.healthService.getSystemHealth();
  }
}
