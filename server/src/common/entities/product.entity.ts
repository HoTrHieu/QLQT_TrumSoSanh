import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { EntityStatus } from './common/status.entity';

@Entity({
  name: 'products',
})
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 1000 })
  name: string;

  @ApiProperty()
  @Index({ unique: true })
  @Column('varchar', { length: 500 })
  slug: string;

  @ApiProperty()
  @Column('simple-array', { name: 'image_sources', nullable: true })
  imageSources: string[];

  @ApiProperty()
  @Column('varchar', { name: 'root_url', length: 1000 })
  rootUrl: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: EntityStatus,
    default: EntityStatus.ACTIVE,
  })
  status: EntityStatus;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @ApiProperty({ type: () => Brand })
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;
}
