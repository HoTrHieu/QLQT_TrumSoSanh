import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class CrawlShopRequest {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  productId: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  page: number;
}