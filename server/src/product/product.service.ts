import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityStatus } from 'src/common/entities/common/status.entity';
import { Product } from 'src/common/entities/product.entity';
import { PagingUtil } from 'src/common/utils/paging.util';
import { ShopService } from 'src/shop/shop.service';
import { In, Repository } from 'typeorm';
import { ProductResponse } from './dto/product-response.dto';
import { SearchProductRequest } from './dto/search-product-request.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private shopService: ShopService,
  ) {}

  async search(request: SearchProductRequest) {
    const qb = this.productRepository
      .createQueryBuilder('p')
      .where('p.status = :status', { status: EntityStatus.ACTIVE });
    if (request.isSearchTermExists) {
      qb.andWhere(`p.name LIKE '%${request.searchTerm}%'`);
    }
    if (request.isBrandIdsExists) {
      qb.andWhere(`p.brandId IN (:...brandIds)`, {
        brandIds: request.getBrandIds(),
      });
    }
    if (request.isCategoryIdsExists) {
      qb.andWhere(`p.categoryId IN (:...categoryIds)`, {
        categoryIds: request.getCategoryIds(),
      });
    }
    const pagingResult = await PagingUtil.paginateByQb(qb, request);
    pagingResult.items = (await this.createProductResponses(
      pagingResult.items,
    )) as any;
    return pagingResult;
  }

  async createProductResponses(products: Product[]) {
    if (products.length === 0) {
      return [];
    }
    const productIds = products.map((p) => p.id);
    const shopAggs = await this.shopService.aggByProductIds(productIds);
    return products.map((p) => {
      return ProductResponse.of(p, shopAggs[p.id]);
    });
  }

  async findOneById(id: number) {
    const product = await this.productRepository.findOne({
      id,
      status: EntityStatus.ACTIVE,
    });
    if (!product) {
      return null;
    }
    return (await this.createProductResponses([product]))[0];
  }

  async findOneBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      slug,
      status: EntityStatus.ACTIVE,
    });
    if (!product) {
      return null;
    }
    return (await this.createProductResponses([product]))[0];
  }

  findBySlugs(slugs: string[]) {
    return this.productRepository.find({
      select: ['id', 'slug'],
      where: {
        slug: In(slugs),
      },
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
}
