import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { SearchRequest } from 'src/common/dtos/search-request.dto';
import { RequestUtil } from 'src/common/utils/request.util';

export class SearchProductRequest extends SearchRequest {
  @ApiPropertyOptional({ type: [Number] })
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @Type(() => Number)
  @IsOptional()
  brandIds?: number[];

  @ApiPropertyOptional({ type: [Number] })
  @IsNumber({}, { each: true })
  @Min(1, { each: true })
  @Type(() => Number)
  @IsOptional()
  categoryIds?: number[];

  getBrandIds() {
    return RequestUtil.parseArray(this.brandIds);
  }

  getCategoryIds() {
    return RequestUtil.parseArray(this.categoryIds);
  }

  get isBrandIdsExists() {
    return !!this.getBrandIds() && this.getBrandIds().length > 0;
  }

  get isCategoryIdsExists() {
    return !!this.getCategoryIds() && this.getCategoryIds().length > 0;
  }

  get isSearching() {
    return (
      this.isSearchTermExists ||
      this.isBrandIdsExists ||
      this.isCategoryIdsExists
    );
  }
}
