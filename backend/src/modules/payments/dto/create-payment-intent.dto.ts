import { IsNumber, IsObject, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreatePaymentIntentDto {
  @IsString()
  @Length(1, 100)
  userId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  description?: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}
