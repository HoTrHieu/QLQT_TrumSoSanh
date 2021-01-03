import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class WithIdRequest {
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @ApiProperty()
  id: number;
}
