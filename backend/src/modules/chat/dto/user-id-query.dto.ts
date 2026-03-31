import { IsString, Length } from 'class-validator';

export class UserIdQueryDto {
  @IsString()
  @Length(1, 100)
  userId: string;
}
