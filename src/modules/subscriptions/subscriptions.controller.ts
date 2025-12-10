import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dtos/create-subscription.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
async createSubscription(@Request() req, @Body() dto: CreateSubscriptionDto) {
return this.subscriptionsService.createProSubscription(req.user.userId, dto);
}

@UseGuards(JwtAuthGuard)
@Get()
async getProSubscriptions(@Request() req) {
return this.subscriptionsService.getProSubscriptions(req.user.userId);
}

@UseGuards(JwtAuthGuard)
@Get('current')
async getCurrentSubscription(@Request() req) {
return this.subscriptionsService.getCurrentProSubscription(req.user.userId);
}

@UseGuards(JwtAuthGuard)
@Put(':subscriptionId/cancel')
async cancelSubscription(
@Request() req,
@Param('subscriptionId') subscriptionId: string,
) {
return this.subscriptionsService.cancelProSubscription(
req.user.userId,
subscriptionId,
);
}

@UseGuards(JwtAuthGuard)
@Put(':subscriptionId/renew')
async renewSubscription(
@Request() req,
@Param('subscriptionId') subscriptionId: string,
) {
return this.subscriptionsService.renewProSubscription(
req.user.userId,
subscriptionId,
);
}
}
