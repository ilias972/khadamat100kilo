import { Controller, Get, Param, Query } from '@nestjs/common';
import { CacheTTL, CacheKey } from '@nestjs/cache-manager';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('categories')
  @CacheKey('services:categories')
  @CacheTTL(600) // 10 minutes
  async getCategories() {
    return this.servicesService.findAllCategories();
  }

  @Get('categories/:id')
  async getCategory(@Param('id') id: string) {
    return this.servicesService.findCategoryById(id);
  }

  @Get()
  async getServices(
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;

    return this.servicesService.findAll(search, categoryId, pageNum, limitNum);
  }
}
