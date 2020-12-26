import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EntityStatus } from "./common/status.entity";
import { Product } from "./product.entity";

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
  @Column('varchar', { length: 255 })
  slug: string;

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
  @OneToMany(() => Product, product => product.category)
  @Exclude()
  products: Product[];
}