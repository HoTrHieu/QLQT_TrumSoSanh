import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";
import { EntityStatus } from "./common/status.entity";
import { Product } from "./product.entity";

@Entity({
  name: 'brands',
})
export class Brand {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  name: string;

  @ApiProperty()
  @Column('varchar', { length: 255 })
  slug: string;

  @ApiProperty()
  @Column('varchar', { length: 1000 })
  imageSource: string;

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

  @ApiProperty()
  @ManyToMany(() => Category, category => category.brands)
  @Exclude()
  categories: Category[]

  @ApiProperty()
  @OneToMany(() => Product, product => product.brand)
  @Exclude()
  products: Product[];
}