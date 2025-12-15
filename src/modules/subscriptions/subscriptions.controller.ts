import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from '@prisma/client';

// ✅ CORRECTION : Interface standardisée
interface RequestWithUser extends Request {
  user: User;
}

// SECURITY FIX: Removed @UseGuards(JwtAuthGuard) from class level
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  // PUBLIC ENDPOINTS (No Guard)
  @Get('plans')
  async getSubscriptionPlans() {
    return this.subscriptionsService.getAllSubscriptionPlans();
  }

  @Get('plans/:planId')
  async getSubscriptionPlan(@Param('planId') planId: string) {
    return this.subscriptionsService.getSubscriptionPlanById(planId);
  }

  // PROTECTED ENDPOINTS (Guard Applied)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createSubscription(
    @Req() req: RequestWithUser, 
    @Body() dto: CreateSubscriptionDto
  ) {
    // ✅ CORRECTION : Utilisation de .id au lieu de .userId
    return this.subscriptionsService.createProSubscription(
      req.user.id,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProSubscriptions(@Req() req: RequestWithUser) {
    return this.subscriptionsService.getProSubscriptions(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  async getCurrentSubscription(@Req() req: RequestWithUser) {
    return this.subscriptionsService.getCurrentProSubscription(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':subscriptionId/cancel')
  async cancelSubscription(
    @Req() req: RequestWithUser,
    @Param('subscriptionId') subscriptionId: string,
  ) {
    return this.subscriptionsService.cancelProSubscription(
      req.user.id,
      subscriptionId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put(':subscriptionId/renew')
  async renewSubscription(
    @Req() req: RequestWithUser,
    @Param('subscriptionId') subscriptionId: string,
  ) {
    return this.subscriptionsService.renewProSubscription(
      req.user.id,
      subscriptionId,
    );
  }
}