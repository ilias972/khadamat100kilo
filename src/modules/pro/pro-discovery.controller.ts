import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProService } from './pro.service';
import { GetProsFilterDto } from './dtos/get-pros-filter.dto';

@Controller('pros')
export class ProDiscoveryController {
  constructor(private readonly proService: ProService) {}

  @Get()
  async getPros(@Query() dto: GetProsFilterDto) {
    return this.proService.getPros(dto);
  }

  @Get(':id')
  async getProById(@Param('id') id: string) {
    return this.proService.getProById(id);
  }
}
