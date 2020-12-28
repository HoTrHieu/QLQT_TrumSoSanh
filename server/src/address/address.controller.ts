import { Body, Controller, Get, Param, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators/public.decorator";
import { Role } from "src/common/decorators/role.decorator";
import { BooleanResponse } from "src/common/dtos/boolean-response.dto";
import { UpdateStatusRequest } from "src/common/dtos/update-status-request.dto";
import { UserRole } from "src/common/entities/user.entity";
import { AddressService } from "./address.service";

@ApiTags('Address')
@Controller('/address')
export class AddressController {

  constructor(private addressService: AddressService) {}

  @Get('/all')
  @Public()
  all() {
    return this.addressService.all();
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
    const isSuccess = await this.addressService.updateStatus(id, body.status);
    return BooleanResponse.of(isSuccess);
  }
}