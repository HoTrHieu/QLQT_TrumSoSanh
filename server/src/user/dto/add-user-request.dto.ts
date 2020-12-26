import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, Length } from 'class-validator';
import { UserRole } from 'src/common/entities/user.entity';

export class AddUserRequest {
  @IsString()
  @Length(4, 100)
  @ApiProperty()
  userName: string;

  @IsString()
  @Length(4, 100)
  @ApiProperty()
  displayName: string;

  @IsString()
  @Length(8, 255)
  @ApiProperty()
  password: string;

  @IsEnum(UserRole)
  @ApiProperty()
  role: UserRole;
}
