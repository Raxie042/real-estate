import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export enum InvitationStatusDto {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class UpdateInvitationStatusDto {
  @IsEnum(InvitationStatusDto)
  status: InvitationStatusDto;

  @IsOptional()
  @IsString()
  @Length(1, 2000)
  adminNotes?: string;
}
