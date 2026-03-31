import { IsString, Length } from 'class-validator';

export class WithdrawOfferDto {
  @IsString()
  @Length(1, 100)
  buyerId: string;
}
