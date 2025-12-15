import { Controller, Get, Param } from '@nestjs/common';
import { CacheTTL, CacheKey } from '@nestjs/cache-manager';
import { LocationsService } from './locations.service';
import { Roles } from '../auth/roles.decorator';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get('cities')
  @CacheKey('locations:cities')
  @CacheTTL(600) // 10 minutes
  async getCities() {
    return this.locationsService.findAllCities();
  }

  @Get('cities/:id')
  async getCity(@Param('id') id: string) {
    return this.locationsService.findCityById(id);
  }

  @Get('categories')
  async getCategories() {
    return this.locationsService.findAllCategories();
  }

  @Get('categories/:id')
  async getCategory(@Param('id') id: string) {
    return this.locationsService.findCategoryById(id);
  }
}
