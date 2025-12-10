import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import { createHash } from 'crypto';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse<Response>();
    const method = request.method;
    const url = request.url;

    // Only cache GET requests
    if (method !== 'GET') {
      return next.handle();
    }

    // Check if endpoint should be cached (you can add custom logic here)
    const shouldCache = this.shouldCacheEndpoint(url);
    if (!shouldCache) {
      return next.handle();
    }

    // Generate cache key
    const cacheKey = this.generateCacheKey(request);

    // Check for If-None-Match header (ETag)
    const ifNoneMatch = request.headers['if-none-match'];
    if (ifNoneMatch) {
      const cachedData = await this.cacheManager.get(cacheKey);
      if (cachedData) {
        const etag = this.generateETag(cachedData);
        if (ifNoneMatch === etag) {
          response.status(304).send();
          return of(null);
        }
      }
    }

    // Check cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      const etag = this.generateETag(cachedData);
      response.set({
        'ETag': etag,
        'Cache-Control': 'public, max-age=300', // 5 minutes
        'X-Cache': 'HIT',
      });
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(async (data) => {
        // Cache the response
        if (data) {
          await this.cacheManager.set(cacheKey, data, 300000); // 5 minutes in ms
        }
      }),
      map((data) => {
        if (data) {
          const etag = this.generateETag(data);
          response.set({
            'ETag': etag,
            'Cache-Control': 'public, max-age=300', // 5 minutes
            'X-Cache': 'MISS',
          });
        }
        return data;
      }),
    );
  }

  private shouldCacheEndpoint(url: string): boolean {
    // Cache public endpoints that return relatively static data
    const cacheableEndpoints = [
      '/locations',
      '/services/categories',
      '/services',
      '/reviews',
    ];

    return cacheableEndpoints.some((endpoint) => url.includes(endpoint));
  }

  private generateCacheKey(request: any): string {
    const { method, url, query, user } = request;
    const keyData = {
      method,
      url,
      query,
      userId: user?.id,
    };
    return `api:${createHash('md5').update(JSON.stringify(keyData)).digest('hex')}`;
  }

  private generateETag(data: any): string {
    const hash = createHash('md5').update(JSON.stringify(data)).digest('hex');
    return `"${hash}"`;
  }
}