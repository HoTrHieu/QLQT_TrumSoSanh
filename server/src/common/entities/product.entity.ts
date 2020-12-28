import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
import { EntityStatus } from './common/status.entity';
import { Shop } from './shop.entity';

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
  @Column('varchar', { length: 1000 })
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

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @ApiProperty({ type: () => Brand })
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ApiProperty({ type: () => Shop, isArray: true })
  @ManyToMany(() => Shop, (shop) => shop.products)
  @JoinTable({ name: 'product_shops' })
  shops: Shop[];
}
