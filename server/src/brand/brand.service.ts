import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchRequest } from 'src/common/dtos/search-request.dto';
import { Brand } from 'src/common/entities/brand.entity';
import { EntityStatus } from 'src/common/entities/common/status.entity';
import { PagingUtil } from 'src/common/utils/paging.util';
import { Repository } from 'typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  search(request: SearchRequest) {
    const qb = this.brandRepository
      .createQueryBuilder('b')
      .where('status = :status', { status: EntityStatus.ACTIVE });
    if (request.isSearchTermExists) {
      qb.andWhere(`b.name LIKE '%${request.searchTerm}%'`);
    }
    return PagingUtil.paginateByQb(qb, request);
  }

  findAll() {
    return this.brandRepository.find({
      status: EntityStatus.ACTIVE,
    });
  }

  findAllByCategoryId(categoryId: number) {
    return this.brandRepository
      .createQueryBuilder('b')
      .innerJoin('b.categories', 'c', 'c.categroyId = :categoryId', {
        categoryId,
      })
      .where('b.status = :status', { status: EntityStatus.ACTIVE })
      .getMany();
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

  saveAll(brands: Brand[]) {
    if (brands.length === 0) {
      return [];
    }
    return this.brandRepository.save(brands);
  }
}
