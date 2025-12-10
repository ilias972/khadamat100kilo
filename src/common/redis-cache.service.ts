import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.logger.log('RedisCacheService initialized');
  }

  // Basic cache operations
  async get<T>(key: string): Promise<T | undefined> {
    try {
      const result = await this.cacheManager.get<T>(key);
      this.logger.debug(`Cache GET: ${key} - ${result !== undefined ? 'HIT' : 'MISS'}`);
      return result;
    } catch (error) {
      this.logger.error(`Cache GET failed for key ${key}: ${error.message}`);
      throw error;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async del(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async clear(): Promise<void> {
    // Note: cache-manager doesn't have a reset method in its interface
    // This would need to be implemented differently based on the store
  }

  // Cache with fallback (get from cache, if not found, execute function and cache result)
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.cacheManager.get<T>(key);
    if (cached !== undefined) {
      return cached;
    }

    // Cache miss - execute factory
    const result = await factory();
    await this.set(key, result, ttl);
    return result;
  }

  // Pattern-based operations
  async getByPattern(pattern: string): Promise<string[]> {
    // Note: This is a Redis-specific operation that may not be available in all cache stores
    // For Redis, we would need to use the Redis client directly
    // For now, we'll return an empty array as a placeholder
    return [];
  }

  async delByPattern(pattern: string): Promise<void> {
    // Similar to getByPattern, this would require Redis-specific operations
    // Implementation would depend on the cache store
  }

  // Cache key generators
  static generateUserKey(userId: string): string {
    return `user:${userId}`;
  }

  static generateUsersListKey(page: number, limit: number): string {
    return `users:list:${page}:${limit}`;
  }

  static generateLocationsKey(city?: string): string {
    return city ? `locations:city:${city}` : 'locations:all';
  }

  static generateServicesKey(categoryId?: string): string {
    return categoryId ? `services:category:${categoryId}` : 'services:all';
  }

  static generateServiceCategoriesKey(): string {
    return 'service-categories:all';
  }

  static generateBookingsKey(userId: string, status?: string): string {
    return status ? `bookings:user:${userId}:${status}` : `bookings:user:${userId}`;
  }

  static generateReviewsKey(serviceId?: string, proId?: string): string {
    if (serviceId) return `reviews:service:${serviceId}`;
    if (proId) return `reviews:pro:${proId}`;
    return 'reviews:all';
  }

  // Cache invalidation helpers
  async invalidateUserCache(userId: string): Promise<void> {
    const userKey = RedisCacheService.generateUserKey(userId);
    await this.del(userKey);
  }

  async invalidateUsersListCache(): Promise<void> {
    // Invalidate all users list cache keys
    // This is a simplified version - in production, you might want to use Redis SCAN
    await this.delByPattern('users:list:*');
  }

  async invalidateLocationsCache(): Promise<void> {
    await this.delByPattern('locations:*');
  }

  async invalidateServicesCache(): Promise<void> {
    await this.delByPattern('services:*');
  }

  async invalidateServiceCategoriesCache(): Promise<void> {
    await this.del(RedisCacheService.generateServiceCategoriesKey());
  }

  async invalidateBookingsCache(userId: string): Promise<void> {
    await this.delByPattern(`bookings:user:${userId}*`);
  }

  async invalidateReviewsCache(proId?: string, serviceId?: string): Promise<void> {
    if (proId) {
      await this.del(RedisCacheService.generateReviewsKey(undefined, proId));
    } else if (serviceId) {
      await this.del(RedisCacheService.generateReviewsKey(serviceId));
    } else {
      await this.delByPattern('reviews:*');
    }
  }

  // Cache warming
  async warmUserCache(userId: string, userData: any): Promise<void> {
    const key = RedisCacheService.generateUserKey(userId);
    await this.set(key, userData, 3600); // 1 hour TTL
  }

  async warmLocationsCache(locations: any[]): Promise<void> {
    const key = RedisCacheService.generateLocationsKey();
    await this.set(key, locations, 1800); // 30 minutes TTL
  }

  async warmServicesCache(services: any[]): Promise<void> {
    const key = RedisCacheService.generateServicesKey();
    await this.set(key, services, 1800); // 30 minutes TTL
  }

  async warmServiceCategoriesCache(categories: any[]): Promise<void> {
    const key = RedisCacheService.generateServiceCategoriesKey();
    await this.set(key, categories, 3600); // 1 hour TTL
  }

  // Cache statistics
  async getCacheStats(): Promise<{
    hitRatio: number;
    totalRequests: number;
    hits: number;
    misses: number;
  }> {
    // Note: Since we're using Prometheus counters, we can't directly query them here
    // This would need to be implemented differently or accessed through the metrics endpoint
    // For now, return a placeholder
    return {
      hitRatio: 0,
      totalRequests: 0,
      hits: 0,
      misses: 0,
    };
  }
}