import { Controller, Get } from '@nestjs/common';
import { register } from 'prom-client';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(): Promise<string> {
    // Collect default metrics
    const metrics = await register.metrics();
    return metrics;
  }
}