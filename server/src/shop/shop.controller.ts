import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PagingResponse } from 'src/common/dtos/paging-response.dto';
import { SearchShopRequest } from './dto/search-shop-request.dto';
import { ShopService } from './shop.service';

@ApiTags('Shop')
@Controller('/shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/search')
  @ApiResponse({
    type: PagingResponse,
  })
  @Public()
  search(@Query() request: SearchShopRequest) {
    return this.shopService.search(request);
  }
}
