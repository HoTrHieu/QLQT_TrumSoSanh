import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdateUserDisplayNameRequest {
  @IsString()
  @MinLength(4)
  @ApiProperty()
  displayName: string;
}
