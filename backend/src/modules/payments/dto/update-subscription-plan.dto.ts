import { IsEnum } from 'class-validator';
import { SubscriptionPlan } from '@prisma/client';

export class UpdateSubscriptionPlanDto {
  @IsEnum(SubscriptionPlan)
  newPlan: SubscriptionPlan;
}
