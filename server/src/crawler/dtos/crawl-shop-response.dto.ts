import { ApiProperty } from "@nestjs/swagger";

export class CrawlShopResponse {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageSource: string;
}