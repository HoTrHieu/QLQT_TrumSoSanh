import { MigrationInterface, QueryRunner } from 'typeorm';
import { EntityStatus } from '../entities/common/status.entity';
import { User, UserRole } from '../entities/user.entity';
import { BcryptUtil } from '../utils/bcrypt.util';

export class InitUsers1607244004750 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await BcryptUtil.hash('123456789');
    const { manager } = queryRunner;
    await manager.save(User, [
      {
        userName: 'admin',
        displayName: 'Admin',
        role: UserRole.ADMIN,
        status: EntityStatus.ACTIVE,
        passwordHash,
      },
      {
        userName: 'user1',
        displayName: 'User 1',
        role: UserRole.USER,
        status: EntityStatus.ACTIVE,
        passwordHash,
      },
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryRunner.query('truncate `users`');
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
  }
}
