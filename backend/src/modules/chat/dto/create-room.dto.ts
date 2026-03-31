import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, Length } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @Length(1, 100)
  listingId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  participants: string[];
}
