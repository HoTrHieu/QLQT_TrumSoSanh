import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AddBrandRequest {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  name: string;
}
