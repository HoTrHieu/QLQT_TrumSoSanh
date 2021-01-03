import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AddCategoryRequest {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  @ApiProperty()
  name: string;
}
