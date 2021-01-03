import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';
import { PagingRequest } from 'src/common/dtos/paging-request.dto';

export class SearchShopRequest extends PagingRequest {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  productId: number;
}
