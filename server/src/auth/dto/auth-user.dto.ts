import { UserRole } from 'src/common/entities/user.entity';

export class AuthUser {
  id: number;
  role: UserRole;

  static of(id: number, role: UserRole) {
    const authUser = new AuthUser();
    authUser.id = id;
    authUser.role = role;
    return authUser;
  }
}
