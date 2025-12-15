import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { Prisma } from '@prisma/client';

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

  async findAll(
    search?: string,
    categoryId?: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    const where: Prisma.ProServiceWhereInput = {
      isActive: true,
    };

    if (search) {
      // ✅ CORRECTION : On a retiré 'name' qui n'existe pas dans le schema Prisma pour ProService
      // On cherche uniquement dans la description, ou on pourrait ajouter 'title' si ça existe.
      where.OR = [
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