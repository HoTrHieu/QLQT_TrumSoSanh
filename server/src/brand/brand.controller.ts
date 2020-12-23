import { Body, CacheInterceptor, CACHE_MANAGER, Controller, Get, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Cache } from "cache-manager";
import { Role } from "src/common/decorators/role.decorator";
import { BooleanResponse } from "src/common/dtos/boolean-response.dto";
import { StdResponse } from "src/common/dtos/std-response.dto";
import { UpdateStatusRequest } from "src/common/dtos/update-status-request.dto";
import { Category } from "src/common/entities/category.entity";
import { UserRole } from "src/common/entities/user.entity";
import { StdResponseCode } from "src/common/enums/StdResponseCode";
import { BrandService } from "./brand.service";
import { AddBrandRequest } from "./dto/add-brand-request.dto";

@ApiTags('Brand')
@Controller('/brand')
export class BrandController {
  constructor(
    private brandService: BrandService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/all')
  @ApiResponse({
    type: Category,
    isArray: true,
  })
  @UseInterceptors(CacheInterceptor)
  findAllCategory() {
    return this.brandService.findAll();
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
    const isSuccess = await this.brandService.updateStatus(
      id,
      body.status,
    );
    if (isSuccess) {
      this.cacheManager.del('/all');
    }
    return BooleanResponse.of(isSuccess);
  }
}