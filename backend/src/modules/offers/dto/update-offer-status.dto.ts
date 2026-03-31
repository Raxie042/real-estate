import { IsEnum, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';
import { OfferStatus } from '@prisma/client';

export class UpdateOfferStatusDto {
  @IsEnum(OfferStatus)
  status: OfferStatus;

  @IsOptional()
  @IsNumber()
  @Min(1)
  counterAmount?: number;

  @IsOptional()
  @IsString()
  @Length(1, 1000)
  counterMessage?: string;
}
