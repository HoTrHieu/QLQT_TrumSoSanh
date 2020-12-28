import {
  Body,
  CacheInterceptor,
  CACHE_MANAGER,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { BooleanResponse } from 'src/common/dtos/boolean-response.dto';
import { SearchRequest } from 'src/common/dtos/search-request.dto';
import { StdResponse } from 'src/common/dtos/std-response.dto';
import { UpdateStatusRequest } from 'src/common/dtos/update-status-request.dto';
import { Brand } from 'src/common/entities/brand.entity';
import { UserRole } from 'src/common/entities/user.entity';
import { StdResponseCode } from 'src/common/enums/StdResponseCode';
import { BrandService } from './brand.service';
import { AddBrandRequest } from './dto/add-brand-request.dto';

@ApiTags('Brand')
@Controller('/brand')
export class BrandController {
  constructor(
    private brandService: BrandService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/search')
  @ApiResponse({
    type: Brand,
    isArray: true,
  })
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @Public()
  searchBrand(@Query() request: SearchRequest) {
    return this.brandService.search(request);
  }

  @Role(UserRole.ADMIN)
  @Post()
  @ApiResponse({
    type: StdResponse,
  })
  @ApiBearerAuth()
  async addBrand(@Body() body: AddBrandRequest) {
    const category = await this.brandService.addBrand(body.name);
    this.cacheManager.del('/all');
    return StdResponse.of(StdResponseCode.SUCCESS, category.id);
  }

  @Role(UserRole.ADMIN)
  @Put('/update-status/:id')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async upcateStatus(
    @Param('id') id: number,
    @Body() body: UpdateStatusRequest,
  ) {
    const isSuccess = await this.brandService.updateStatus(id, body.status);
    if (isSuccess) {
      this.cacheManager.del('/all');
    }
    return BooleanResponse.of(isSuccess);
  }
}
