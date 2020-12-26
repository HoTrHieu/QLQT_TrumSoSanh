import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Brand } from "src/common/entities/brand.entity";
import { EntityStatus } from "src/common/entities/common/status.entity";
import { Repository } from "typeorm";

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>
  ) {}

  findAll() {
    return this.brandRepository.find({
      where: { status: EntityStatus.ACTIVE }
    });
  }

  findOneByName(name: string) {
    return this.brandRepository.findOne({ name });
  }

  async addBrand(name: string) {
    let category = await this.findOneByName(name);
    if (!category) {
      category = this.brandRepository.create({ name });
    }
    category.status = EntityStatus.ACTIVE;
    return this.brandRepository.save(category);
  }

  async updateStatus(id: number, status: EntityStatus) {
    const result = await this.brandRepository.update(id, {
      status,
    });
    return result.affected > 0;
  }
}