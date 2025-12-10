import { IsUUID, IsOptional, IsBoolean } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  subscriptionPlanId: string;

  @IsOptional()
  @IsBoolean()
  autoRenew?: boolean = true;
}
