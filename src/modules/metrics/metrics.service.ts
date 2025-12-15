import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  register,
  collectDefaultMetrics,
  Counter,
  Histogram,
  Gauge,
} from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
  // HTTP metrics
  private httpRequestTotal: Counter<string>;
  private httpRequestDuration: Histogram<string>;

  // Business metrics
  private userRegistrationsTotal: Counter<string>;
  private bookingsTotal: Counter<string>;
  private reviewsTotal: Counter<string>;
  private activeUsers: Gauge<string>;

  // System metrics
  private databaseConnections: Gauge<string>;
  private cacheHits: Counter<string>;
  private cacheMisses: Counter<string>;

  onModuleInit() {
    // Collect default Node.js metrics
    collectDefaultMetrics();

    // HTTP metrics
    this.httpRequestTotal = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status_code'],
    });

    this.httpRequestDuration = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['method', 'route'],
      buckets: [0.1, 0.5, 1, 2, 5, 10],
    });

    // Business metrics
    this.userRegistrationsTotal = new Counter({
      name: 'user_registrations_total',
      help: 'Total number of user registrations',
      labelNames: ['user_type'],
    });

    this.bookingsTotal = new Counter({
      name: 'bookings_total',
      help: 'Total number of bookings',
      labelNames: ['status', 'service_type'],
    });

    this.reviewsTotal = new Counter({
      name: 'reviews_total',
      help: 'Total number of reviews',
      labelNames: ['rating'],
    });

    this.activeUsers = new Gauge({
      name: 'active_users',
      help: 'Number of active users',
      labelNames: ['user_type'],
    });

    // System metrics
    this.databaseConnections = new Gauge({
      name: 'database_connections_active',
      help: 'Number of active database connections',
    });

    this.cacheHits = new Counter({
      name: 'cache_hits_total',
      help: 'Total number of cache hits',
    });

    this.cacheMisses = new Counter({
      name: 'cache_misses_total',
      help: 'Total number of cache misses',
    });
  }

  // HTTP metrics methods
  incrementHttpRequests(method: string, route: string, statusCode: number) {
    this.httpRequestTotal.inc({
      method,
      route,
      status_code: statusCode.toString(),
    });
  }

  recordHttpRequestDuration(method: string, route: string, duration: number) {
    this.httpRequestDuration.observe({ method, route }, duration);
  }

  // Business metrics methods
  incrementUserRegistrations(userType: string) {
    this.userRegistrationsTotal.inc({ user_type: userType });
  }

  incrementBookings(status: string, serviceType: string) {
    this.bookingsTotal.inc({ status, service_type: serviceType });
  }

  incrementReviews(rating: number) {
    this.reviewsTotal.inc({ rating: rating.toString() });
  }

  setActiveUsers(userType: string, count: number) {
    this.activeUsers.set({ user_type: userType }, count);
  }

  // System metrics methods
  setDatabaseConnections(count: number) {
    this.databaseConnections.set(count);
  }

  incrementCacheHits() {
    this.cacheHits.inc();
  }

  incrementCacheMisses() {
    this.cacheMisses.inc();
  }
}
