import { Body, Controller, Get, Param, Put, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "src/common/decorators/role.decorator";
import { BooleanResponse } from "src/common/dtos/boolean-response.dto";
import { UpdateStatusRequest } from "src/common/dtos/update-status-request.dto";
import { Product } from "src/common/entities/product.entity";
import { UserRole } from "src/common/entities/user.entity";
import { SearchProductRequest } from "./dto/search-product-request.dto";
import { ProductService } from "./product.service";

@ApiTags('Product')
@Controller('/product')
export class ProductController {
  constructor(
    private productService: ProductService
  ) {}

  @Get('/search')
  @ApiResponse({
    type: Product,
    isArray: true
  })
  search(@Query() body: SearchProductRequest) {
    return this.productService.search(body);
  }

  @Get('/detail-by-id/:id')
  @ApiResponse({
    type: Product
  })
  getDetailById(@Param('id') id: number) {
    return this.productService.findOneById(id);
  }

  @Get('/detail-by-slug/:slug')
  @ApiResponse({
    type: Product
  })
  getDetailBySlug(@Param('slug') slug: string) {
    return this.productService.findOneBySlug(slug);
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
    const isSuccess = await this.productService.updateStatus(id, body.status);
    return BooleanResponse.of(isSuccess);
  }
}