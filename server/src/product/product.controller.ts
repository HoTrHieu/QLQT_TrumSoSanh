import { Body, Controller, Get, NotFoundException, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { BooleanResponse } from 'src/common/dtos/boolean-response.dto';
import { UpdateStatusRequest } from 'src/common/dtos/update-status-request.dto';
import { Product } from 'src/common/entities/product.entity';
import { UserRole } from 'src/common/entities/user.entity';
import { SearchProductRequest } from './dto/search-product-request.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/search')
  @ApiResponse({
    type: Product,
    isArray: true,
  })
  @Public()
  search(@Query() request: SearchProductRequest) {
    return this.productService.search(request);
  }

  @Get('/detail-by-id/:id')
  @ApiResponse({
    type: Product,
  })
  @Public()
  async getDetailById(@Param('id') id: number) {
    const product = await this.productService.findOneById(id);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
  }

  @Get('/detail-by-slug/:slug')
  @ApiResponse({
    type: Product,
  })
  @Public()
  async getDetailBySlug(@Param('slug') slug: string) {
    const product = await this.productService.findOneBySlug(slug);
    if (!product) {
      throw new NotFoundException();
    }
    return product;
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
