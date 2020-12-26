import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchRequest } from 'src/common/dtos/search-request.dto';
import { EntityStatus } from 'src/common/entities/common/status.entity';
import { User, UserRole } from 'src/common/entities/user.entity';
import { BcryptUtil } from 'src/common/utils/bcrypt.util';
import { PagingUtil } from 'src/common/utils/paging.util';
import { Like, Repository } from 'typeorm';
import { AddUserRequest } from './dto/add-user-request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  searchUser(request: SearchRequest) {
    const usernameCondition: any = {};
    const displayNameCondition: any = {};
    const andConditions = { status: EntityStatus.ACTIVE };
    if (request.isSearchTermExists) {
      usernameCondition.userName = Like(`%${request.searchTerm}%`);
      displayNameCondition.displayName = Like(`%${request.searchTerm}%`);
    }
    return PagingUtil.paginate(this.userRepository, request, {
      where: [
        { ...usernameCondition, ...andConditions },
        { ...displayNameCondition, ...andConditions },
      ],
    });
  }

  findOneById(id: number) {
    return this.userRepository.findOne(id);
  }

  findOneByUserName(userName: string) {
    return this.userRepository.findOne({
      where: { userName },
    });
  }

  async addUser(request: AddUserRequest) {
    let user = await this.findOneByUserName(request.userName);
    if (!user) {
      user = this.userRepository.create({
        userName: request.userName,
      });
    }
    user.displayName = request.displayName;
    user.passwordHash = await this.hashPassword(request.password);
    user.role = request.role;
    user.status = EntityStatus.ACTIVE;
    return this.userRepository.save(user);
  }

  async updateStatus(id: number, status: EntityStatus) {
    const result = await this.userRepository.update(
      { id },
      {
        status,
      },
    );
    return result.affected > 0;
  }

  async updateDisplayName(id: number, newDisplayName: string) {
    const result = await this.userRepository.update(
      { id },
      { displayName: newDisplayName },
    );
    return result.affected > 0;
  }

  async updatePassword(id: number, newPassword: string) {
    const newPasswordHash = await this.hashPassword(newPassword);
    const result = await this.userRepository.update(
      { id },
      { passwordHash: newPasswordHash },
    );
    return result.affected > 0;
  }

  async updateRole(id: number, newRole: UserRole) {
    const result = await this.userRepository.update({ id }, { role: newRole });
    return result.affected > 0;
  }

  private hashPassword(password: string) {
    return BcryptUtil.hash(password);
  }

  comparePassword(password: string, hash: string) {
    return BcryptUtil.compare(password, hash);
  }

  makeEntity(id: number) {
    return this.userRepository.create({ id });
  }
}
