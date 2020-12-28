import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators/public.decorator";
import { Role } from "src/common/decorators/role.decorator";
import { BooleanResponse } from "src/common/dtos/boolean-response.dto";
import { SearchRequest } from "src/common/dtos/search-request.dto";
import { UpdateStatusRequest } from "src/common/dtos/update-status-request.dto";
import { Shop } from "src/common/entities/shop.entity";
import { UserRole } from "src/common/entities/user.entity";
import { ShopService } from "./shop.service";

@ApiTags('Shop')
@Controller('/shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get('/search')
  @ApiResponse({
    type: Shop,
    isArray: true
  })
  @Public()
  search(@Query() request: SearchRequest) {
    return this.shopService.search(request);
  }

  @Role(UserRole.ADMIN)
  @Put('/update-status/:id')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async updateStatus(
    @Param('id') id: number,
    @Body() body: UpdateStatusRequest,
  ) {
    const isSuccess = await this.shopService.updateStatus(id, body.status);
    return BooleanResponse.of(isSuccess);
  }
}