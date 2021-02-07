import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/role.decorator';
import { BooleanResponse } from 'src/common/dtos/boolean-response.dto';
import { PagingResponse } from 'src/common/dtos/paging-response.dto';
import { SearchRequest } from 'src/common/dtos/search-request.dto';
import { StdResponse } from 'src/common/dtos/std-response.dto';
import { UpdateStatusRequest } from 'src/common/dtos/update-status-request.dto';
import { UserRole } from 'src/common/entities/user.entity';
import { StdResponseCode } from 'src/common/enums/StdResponseCode';
import { AddUserRequest } from './dto/add-user-request.dto';
import { UpdateUserDisplayNameRequest } from './dto/update-user-display-name-request.dto';
import { UpdateUserRoleRequest } from './dto/update-user-role-request.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Role(UserRole.ADMIN)
  @Get('/search')
  @ApiResponse({
    type: PagingResponse,
  })
  @ApiBearerAuth()
  searchUser(@Query() request: SearchRequest) {
    return this.userService.searchUser(request);
  }

  @Public()
  @Role(UserRole.ADMIN)
  @Post()
  @ApiResponse({
    type: StdResponse,
  })
  async addUser(@Body() request: AddUserRequest) {
    const newUser = await this.userService.addUser(request);
    return StdResponse.of(StdResponseCode.SUCCESS, newUser.id);
  }

  @Put('/update-display-name')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async updateDisplayName(
    @Request() req: any,
    @Body() body: UpdateUserDisplayNameRequest,
  ) {
    const isSuccess = await this.userService.updateDisplayName(
      req.user.id,
      body.displayName,
    );
    return BooleanResponse.of(isSuccess);
  }

  @Role(UserRole.ADMIN)
  @Put('/update-role/:id')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async updateRole(
    @Param('id') id: number,
    @Body() request: UpdateUserRoleRequest,
  ) {
    const isSuccess = await this.userService.updateRole(id, request.role);
    return BooleanResponse.of(isSuccess);
  }

  @Role(UserRole.ADMIN)
  @Put('/update-status/:id')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async updateStatus(
    @Param('id') id: number,
    @Body() request: UpdateStatusRequest,
  ) {
    const isSuccess = await this.userService.updateStatus(id, request.status);
    return BooleanResponse.of(isSuccess);
  }
}
