import { IsISO8601, IsNumber, IsObject, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  @Length(1, 100)
  listingId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsString()
  @Length(3, 3)
  currency?: string;

  @IsOptional()
  @IsString()
  @Length(1, 2000)
  message?: string;

  @IsOptional()
  @IsObject()
  conditions?: Record<string, unknown>;

  @IsOptional()
  @IsISO8601()
  expiresAt?: string;
}
