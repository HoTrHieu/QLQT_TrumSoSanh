import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from 'src/common/entities/user.entity';

export class UpdateUserRoleRequest {
  @IsEnum(UserRole)
  @ApiProperty()
  role: UserRole;
}
