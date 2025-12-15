import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DisputesService } from './disputes.service';
import { CreateDisputeDto } from './dtos/create-dispute.dto';
import { ResolveDisputeDto } from './dtos/resolve-dispute.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role, User } from '@prisma/client';
import { Request } from 'express';

// ✅ CORRECTION : Interface standardisée
interface RequestWithUser extends Request {
  user: User;
}

@Controller('disputes')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class DisputesController {
  constructor(private readonly disputesService: DisputesService) {}

  @Post()
  async createDispute(
    @Req() req: RequestWithUser, 
    @Body() dto: CreateDisputeDto
  ) {
    return this.disputesService.createDispute(
      req.user.id,
      req.user.role, // ✅ CORRECTION : role est singulier dans ton Prisma schema
      dto,
    );
  }

  @Get()
  async getUserDisputes(@Req() req: RequestWithUser) {
    return this.disputesService.getUserDisputes(req.user.id);
  }

  @Get(':id')
  async getDispute(
    @Param('id') id: string, 
    @Req() req: RequestWithUser
  ) {
    return this.disputesService.getDisputeById(
      id,
      req.user.id,
      req.user.role, // ✅ CORRECTION : role singulier
    );
  }

  @Put('admin/:id/resolve')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async resolveDispute(
    @Param('id') id: string,
    @Req() req: RequestWithUser,
    @Body() dto: ResolveDisputeDto,
  ) {
    return this.disputesService.resolveDispute(id, req.user.id, dto);
  }
}