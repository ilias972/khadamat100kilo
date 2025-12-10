import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, BookingStatus } from '@prisma/client';
import { RedisCacheService } from './redis-cache.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    @Inject(RedisCacheService)
    private cacheService: RedisCacheService,
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: any) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }

  // Cached query methods
  async findUserByIdCached(userId: string) {
    const cacheKey = RedisCacheService.generateUserKey(userId);
    return this.cacheService.getOrSet(
      cacheKey,
      () => this.user.findUnique({
        where: { id: userId, deletedAt: null },
        include: {
          clientProfile: true,
          proProfile: true,
        },
      }),
      3600, // 1 hour TTL
    );
  }

  async findLocationsCached(city?: string) {
    const cacheKey = RedisCacheService.generateLocationsKey(city);
    return this.cacheService.getOrSet(
      cacheKey,
      () => this.city.findMany({
        where: city ? { name: { contains: city } } : undefined,
        orderBy: { name: 'asc' },
      }),
      1800, // 30 minutes TTL
    );
  }

  async findServicesCached(categoryId?: string) {
    const cacheKey = RedisCacheService.generateServicesKey(categoryId);
    return this.cacheService.getOrSet(
      cacheKey,
      () => this.serviceCategory.findMany({
        where: categoryId ? { id: categoryId } : undefined,
        include: {
          proServices: {
            where: { isActive: true },
            include: {
              proProfile: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
        orderBy: { name: 'asc' },
      }),
      1800, // 30 minutes TTL
    );
  }

  async findServiceCategoriesCached() {
    const cacheKey = RedisCacheService.generateServiceCategoriesKey();
    return this.cacheService.getOrSet(
      cacheKey,
      () => this.serviceCategory.findMany({
        orderBy: { name: 'asc' },
      }),
      3600, // 1 hour TTL
    );
  }

  async findBookingsByUserCached(userId: string, status?: string) {
    const cacheKey = RedisCacheService.generateBookingsKey(userId, status);
    return this.cacheService.getOrSet(
      cacheKey,
      () => this.booking.findMany({
        where: {
          OR: [
            { clientId: userId },
            { proId: userId },
          ],
          ...(status && { status: status as any }),
        },
        include: {
          client: { include: { clientProfile: true } },
          pro: { include: { proProfile: true } },
          serviceCategory: true,
          review: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      600, // 10 minutes TTL
    );
  }

  async findReviewsCached(serviceId?: string, proId?: string) {
    const cacheKey = RedisCacheService.generateReviewsKey(serviceId, proId);
    return this.cacheService.getOrSet(
      cacheKey,
      () => this.review.findMany({
        where: {
          ...(serviceId && { serviceId }),
          ...(proId && { proId }),
        },
        include: {
          booking: {
            include: {
              serviceCategory: true,
              client: { include: { clientProfile: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      1800, // 30 minutes TTL
    );
  }

  // Cache invalidation methods
  async invalidateUserCache(userId: string) {
    await this.cacheService.invalidateUserCache(userId);
  }

  async invalidateLocationsCache() {
    await this.cacheService.invalidateLocationsCache();
  }

  async invalidateServicesCache() {
    await this.cacheService.invalidateServicesCache();
  }

  async invalidateServiceCategoriesCache() {
    await this.cacheService.invalidateServiceCategoriesCache();
  }

  async invalidateBookingsCache(userId: string) {
    await this.cacheService.invalidateBookingsCache(userId);
  }

  async invalidateReviewsCache(proId?: string, serviceId?: string) {
    await this.cacheService.invalidateReviewsCache(proId, serviceId);
  }

  // Override Prisma methods to include cache invalidation
  async createUser(data: any) {
    const result = await this.user.create(data);
    // Don't cache immediately, let it be cached on first read
    return result;
  }

  async updateUser(where: any, data: any) {
    const result = await this.user.update({ where, data });
    // Invalidate cache for this user
    if (where.id) {
      await this.invalidateUserCache(where.id);
    }
    return result;
  }

  async deleteUser(where: any) {
    const result = await this.user.delete(where);
    // Invalidate cache for this user
    if (where.id) {
      await this.invalidateUserCache(where.id);
    }
    return result;
  }

  async createLocation(data: any) {
    const result = await this.city.create(data);
    await this.invalidateLocationsCache();
    return result;
  }

  async updateLocation(where: any, data: any) {
    const result = await this.city.update({ where, data });
    await this.invalidateLocationsCache();
    return result;
  }

  async createServiceCategory(data: any) {
    const result = await this.serviceCategory.create(data);
    await this.invalidateServiceCategoriesCache();
    await this.invalidateServicesCache();
    return result;
  }

  async updateServiceCategory(where: any, data: any) {
    const result = await this.serviceCategory.update({ where, data });
    await this.invalidateServiceCategoriesCache();
    await this.invalidateServicesCache();
    return result;
  }

  async createBooking(data: any) {
    const result = await this.booking.create(data);
    // Invalidate bookings cache for both client and pro
    await this.invalidateBookingsCache(data.data.clientId);
    await this.invalidateBookingsCache(data.data.proId);
    return result;
  }

  async updateBooking(where: any, data: any) {
    const result = await this.booking.update({ where, data });
    // Invalidate bookings cache for both client and pro
    const booking = await this.booking.findUnique({
      where,
      select: { clientId: true, proId: true },
    });
    if (booking) {
      await this.invalidateBookingsCache(booking.clientId);
      await this.invalidateBookingsCache(booking.proId);
    }
    return result;
  }

  async createReview(data: any) {
    const result = await this.review.create(data);
    await this.invalidateReviewsCache(data.data.proId);
    return result;
  }
}
