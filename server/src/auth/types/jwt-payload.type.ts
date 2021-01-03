import { UserRole } from 'src/common/entities/user.entity';

export interface JwtPayload {
  sub: number;
  role: UserRole;
}
