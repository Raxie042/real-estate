import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateInvitationApplicationDto {
  @IsString()
  @Length(1, 80)
  firstName: string;

  @IsString()
  @Length(1, 80)
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Length(7, 30)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  company?: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  market?: string;

  @IsOptional()
  @IsString()
  @Length(1, 120)
  portfolioSize?: string;

  @IsOptional()
  @IsString()
  @Length(1, 3000)
  message?: string;
}
