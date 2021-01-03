import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({
  name: 'shops',
})
export class Shop {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  name: string;

  @ApiProperty()
  @Column('bigint')
  price: number;

  @ApiProperty()
  @Column('text')
  url: string;

  @ApiProperty()
  @Column('varchar', { length: 1000 })
  title: string;

  @ApiProperty()
  @Column('text', { nullable: true })
  description: string;

  @ApiProperty()
  @Column('text', { nullable: true })
  imageSource: string;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @ApiProperty({ type: () => Product })
  @ManyToOne(() => Product, (product) => product.shops)
  product: Product;
}
