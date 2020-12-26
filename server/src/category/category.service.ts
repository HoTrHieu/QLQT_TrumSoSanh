import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/common/entities/category.entity";
import { EntityStatus } from "src/common/entities/common/status.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  findAll() {
    return this.categoryRepository.find({
      where: { status: EntityStatus.ACTIVE }
    });
  }

  findOneByName(name: string) {
    return this.categoryRepository.findOne({ name });
  }

  async addCategory(name: string) {
    let category = await this.findOneByName(name);
    if (!category) {
      category = this.categoryRepository.create({ name });
    }
    category.status = EntityStatus.ACTIVE;
    return this.categoryRepository.save(category);
  }

  async updateStatus(id: number, status: EntityStatus) {
    const result = await this.categoryRepository.update(id, {
      status,
    });
    return result.affected > 0;
  }
}