import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';
import { PagingRequest } from './paging-request.dto';

export class SearchRequest extends PagingRequest {
  @ApiPropertyOptional()
  @MinLength(2)
  @IsOptional()
  searchTerm?: string;

  get isSearchTermExists() {
    return !!this.searchTerm;
  }
}
