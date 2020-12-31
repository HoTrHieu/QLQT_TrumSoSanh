import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { EntityStatus } from './common/status.entity';
import { Product } from './product.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  name: string;

  @ApiProperty()
  @Index({ unique: true })
  @Column('varchar', { length: 255 })
  slug: string;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  @Exclude()
  exHref: string;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  @Exclude()
  exPath: string;

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

  @ApiProperty({ type: () => Brand, isArray: true })
  @ManyToMany(() => Brand, (brand) => brand.categories)
  @JoinTable({ name: 'category_brands' })
  @Exclude()
  brands: Brand[];
  
  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.children)
  public parent: Category;

  @ApiProperty()
  @OneToMany(() => Category, (category) => category.parent)
  public children: Category[];
}
