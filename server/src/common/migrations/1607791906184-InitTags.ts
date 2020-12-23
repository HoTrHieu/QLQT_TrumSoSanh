import { MigrationInterface, QueryRunner } from 'typeorm';
import { EntityStatus } from '../entities/common/status.entity';
import { Tag } from '../entities/tag.entity';

export class InitTags1607791906184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(
      [
        'Thời sự',
        'Góc nhìn',
        'Thế giới',
        'Kinh doanh',
        'Giải trí',
        'Thể thao',
        'Pháp luật',
        'Giáo dục',
        'Sức khỏe',
        'Đời sống',
        'Du lịch',
        'Khoa học',
        'Số hóa',
        'Xe',
        'Ý kiến',
        'Tâm sự',
        'Hài',
      ].map((name) =>
        queryRunner.manager.create(Tag, {
          status: EntityStatus.ACTIVE,
          name,
        }),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0');
    await queryRunner.query('truncate `tags`');
    await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1');
  }
}
