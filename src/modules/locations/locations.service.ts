import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findAllCities() {
    return this.prisma.findLocationsCached();
  }

  async findCityById(id: string) {
    return this.prisma.city.findUnique({
      where: { id },
    });
  }

  async findAllCategories() {
    return this.prisma.findServiceCategoriesCached();
  }

  async findCategoryById(id: string) {
    return this.prisma.serviceCategory.findUnique({
      where: { id },
    });
  }
}
