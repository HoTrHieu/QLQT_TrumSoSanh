import { IsString } from 'class-validator';
import { PagingRequest } from 'src/common/dtos/paging-request.dto';

export class SearchUserRequest extends PagingRequest {
  @IsString()
  searchTerm: string;
}
