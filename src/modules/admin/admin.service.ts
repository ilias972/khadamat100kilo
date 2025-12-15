import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { Role, BookingStatus } from '@prisma/client';
import {
  BookingStatus as BookingStatusEnum,
  BOOKING_STATUS_VALUES,
} from '../bookings/enums/booking-status.enum';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Dashboard analytics
  async getDashboardStats() {
    const [
      totalUsers,
      totalPros,
      totalClients,
      totalBookings,
      completedBookings,
      totalRevenue,
      activeSubscriptions,
      unreadMessages,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: Role.PRO } }),
      this.prisma.user.count({ where: { role: Role.CLIENT } }),
      this.prisma.booking.count(),
      this.prisma.booking.count({ where: { status: BookingStatus.COMPLETED } }),
      this.prisma.booking.aggregate({
        where: { status: BookingStatus.COMPLETED },
        _sum: { finalPrice: true },
      }),
      this.prisma.proSubscription.count({ where: { status: 'active' } }),
      this.prisma.message.count({ where: { readAt: null } }),
    ]);

    return {
      users: {
        total: totalUsers,
        pros: totalPros,
        clients: totalClients,
      },
      bookings: {
        total: totalBookings,
        completed: completedBookings,
        completionRate:
          totalBookings > 0 ? (completedBookings / totalBookings) * 100 : 0,
      },
      revenue: {
        total: totalRevenue._sum.finalPrice || 0,
      },
      subscriptions: {
        active: activeSubscriptions,
      },
      messages: {
        unread: unreadMessages,
      },
    };
  }

  // User management
  async getAllUsers(page: number = 1, limit: number = 20, role?: string) {
    const skip = (page - 1) * limit;
    const where = role ? { role: role as Role } : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        include: {
          clientProfile: true,
          proProfile: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateUserStatus(userId: string, status: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { status },
      include: {
        clientProfile: true,
        proProfile: true,
      },
    });
  }

  async getUserDetails(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        clientProfile: true,
        proProfile: {
          include: {
            proServices: {
              include: {
                serviceCategory: true,
                city: true,
              },
            },
            subscriptions: {
              include: {
                subscriptionPlan: true,
              },
            },
          },
        },
        bookingsAsClient: {
          include: {
            pro: { include: { proProfile: true } },
            serviceCategory: true,
            city: true,
          },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
        bookingsAsPro: {
          include: {
            client: { include: { clientProfile: true } },
            serviceCategory: true,
            city: true,
          },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
        reviewsAsClient: {
          include: {
            booking: {
              include: {
                serviceCategory: true,
              },
            },
          },
        },
        reviewsAsPro: {
          include: {
            booking: {
              include: {
                serviceCategory: true,
              },
            },
          },
        },
      },
    });
  }

  // Booking management
  async getAllBookings(page: number = 1, limit: number = 20, status?: string) {
    if (
      status &&
      !BOOKING_STATUS_VALUES.includes(status as BookingStatusEnum)
    ) {
      throw new BadRequestException('Invalid status value');
    }

    const skip = (page - 1) * limit;
    const where = status ? { status: status as BookingStatus } : {};

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        include: {
          client: { include: { clientProfile: true } },
          pro: { include: { proProfile: true } },
          serviceCategory: true,
          city: true,
          review: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Revenue analytics
  async getRevenueStats(startDate?: Date, endDate?: Date) {
    const dateFilter =
      startDate && endDate
        ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
        : {};

    const [totalRevenue, bookingRevenue, subscriptionRevenue, monthlyRevenue] =
      await Promise.all([
        this.prisma.booking.aggregate({
          where: { ...dateFilter, status: BookingStatus.COMPLETED },
          _sum: { finalPrice: true },
        }),
        this.prisma.booking.aggregate({
          where: { ...dateFilter, status: BookingStatus.COMPLETED },
          _sum: { finalPrice: true },
        }),
        this.prisma.payment.aggregate({
          where: { ...dateFilter, status: 'completed' },
          _sum: { amount: true },
        }),
        this.prisma.booking.groupBy({
          by: ['createdAt'],
          where: { status: BookingStatus.COMPLETED },
          _sum: { finalPrice: true },
          orderBy: { createdAt: 'asc' },
        }),
      ]);

    return {
      totalRevenue: totalRevenue._sum?.finalPrice || 0,
      bookingRevenue: bookingRevenue._sum?.finalPrice || 0,
      subscriptionRevenue: subscriptionRevenue._sum?.amount || 0,
      monthlyBreakdown: monthlyRevenue,
    };
  }

  // Service category analytics
  async getServiceCategoryStats() {
    const stats = await this.prisma.booking.groupBy({
      by: ['serviceCategoryId'],
      where: { status: BookingStatus.COMPLETED },
      _count: { id: true },
      _sum: { finalPrice: true },
    });

    const categories = await this.prisma.serviceCategory.findMany({
      where: { id: { in: stats.map((s) => s.serviceCategoryId) } },
    });

    return stats.map((stat) => ({
      category: categories.find((c) => c.id === stat.serviceCategoryId),
      bookingCount: stat._count?.id || 0,
      totalRevenue: stat._sum?.finalPrice || 0,
    }));
  }

  // City analytics
  async getCityStats() {
    const stats = await this.prisma.booking.groupBy({
      by: ['cityId'],
      where: { status: BookingStatus.COMPLETED },
      _count: { id: true },
      _sum: { finalPrice: true },
    });

    const cities = await this.prisma.city.findMany({
      where: { id: { in: stats.map((s) => s.cityId) } },
    });

    return stats.map((stat) => ({
      city: cities.find((c) => c.id === stat.cityId),
      bookingCount: stat._count?.id || 0,
      totalRevenue: stat._sum?.finalPrice || 0,
    }));
  }
}
