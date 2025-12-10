import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { CreateDisputeDto } from './dtos/create-dispute.dto';
import { ResolveDisputeDto } from './dtos/resolve-dispute.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('disputes')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Post()
  async createDispute(@Request() req, @Body() dto: CreateDisputeDto) {
    return this.disputesService.createDispute(
      req.user.sub,
      req.user.roles[0],
      dto,
    );
  }

  @Get()
  async getUserDisputes(@Request() req) {
    return this.disputesService.getUserDisputes(req.user.sub);
  }

  @Get(':id')
  async getDispute(@Param('id') id: string, @Request() req) {
    return this.disputesService.getDisputeById(
      id,
      req.user.sub,
      req.user.roles[0],
    );
  }

  @Put('admin/:id/resolve')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async resolveDispute(
    @Param('id') id: string,
    @Request() req,
    @Body() dto: ResolveDisputeDto,
  ) {
    return this.disputesService.resolveDispute(id, req.user.sub, dto);
  }
}
