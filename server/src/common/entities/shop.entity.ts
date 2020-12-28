import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from './address.entity';
import { EntityStatus } from './common/status.entity';
import { Product } from './product.entity';

@Entity({
  name: 'shops',
})
export class Shop {
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
  @Column('bigint', { nullable: true })
  price: number;

  @ApiProperty()
  @Column('float', { nullable: true })
  discount: number;

  @ApiProperty()
  @Column('varchar', { length: 1000 })
  imageSource: string;

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

  @ApiProperty({ type: () => Address, isArray: true })
  @ManyToMany(() => Address, (address) => address.shops)
  @JoinTable({ name: 'shop_addresses' })
  addresses: Address[];

  @ApiProperty({ type: () => Product, isArray: true })
  @ManyToMany(() => Product, (product) => product.shops)
  products: Product[];
}
