import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAllCategories() {
    return this.prisma.serviceCategory.findMany({
      where: { isActive: true },
    });
  }

  async findCategoryById(id: string) {
    return this.prisma.serviceCategory.findUnique({
      where: { id },
    });
  }

  async findAll(search?: string, categoryId?: string, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const where: any = {
      isActive: true,
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryId) {
      where.serviceCategoryId = categoryId;
    }

    const [services, total] = await Promise.all([
      this.prisma.proService.findMany({
        where,
        include: {
          proProfile: {
            select: {
              firstName: true,
              lastName: true,
              averageRating: true,
              totalReviews: true,
            },
          },
          serviceCategory: true,
          city: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.proService.count({ where }),
    ]);

    return {
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
