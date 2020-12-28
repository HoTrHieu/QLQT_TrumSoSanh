import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from 'src/common/entities/common/status.entity';
import { Product } from 'src/common/entities/product.entity';
import { PagingUtil } from 'src/common/utils/paging.util';
import { Repository } from 'typeorm';
import { SearchProductRequest } from './dto/search-product-request.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  search(request: SearchProductRequest) {
    const qb = this.productRepository
      .createQueryBuilder('p')
      .where('p.status = :status', { status: EntityStatus.ACTIVE })
    if (request.isSearchTermExists) {
      qb.andWhere(`p.name LIKE '%${request.searchTerm}%'`);
    }
    return PagingUtil.paginateByQb(qb, request);
  }

  findOneById(id: number) {
    return this.productRepository.findOne({
      id,
      status: EntityStatus.ACTIVE,
    });
  }

  findOneBySlug(slug: string) {
    return this.productRepository.findOne({
      slug,
      status: EntityStatus.ACTIVE,
    });
  }

  async updateStatus(id: number, status: EntityStatus) {
    const result = await this.productRepository.update(
      { id },
      {
        status,
      },
    );
    return result.affected > 0;
  }

  async saveAll(products: Product[]) {
    if (products.length === 0) {
      return [];
    }
    return this.productRepository.save(products);
  }
}
