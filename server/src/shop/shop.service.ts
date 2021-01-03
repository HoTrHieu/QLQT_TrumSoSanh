import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/common/entities/shop.entity';
import { PagingUtil } from 'src/common/utils/paging.util';
import { Repository } from 'typeorm';
import { SearchShopRequest } from './dto/search-shop-request.dto';
import { ShopAgg } from './dto/shop-agg.dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
  ) {}

  async search(request: SearchShopRequest) {
    const qb = this.shopRepository
      .createQueryBuilder('s')
      .where('s.productId = :productId', { productId: request.productId });
    const pagingResult = await PagingUtil.paginateByQb(qb, request);
    pagingResult.items.forEach((shop) => {
      shop.price = Number(shop.price);
    });
    return pagingResult;
  }

  async aggByProductIds(productIds: number[]) {
    const rawResults = await this.shopRepository
      .createQueryBuilder('s')
      .where('s.productId IN (:...productIds)', { productIds })
      .groupBy('s.productId')
      .select(
        's.productId AS productId, MIN(s.price) AS minPrice, MAX(s.price) AS maxPrice, COUNT(s.id) AS totalShop',
      )
      .getRawMany();
    return rawResults.reduce((ret, rs) => {
      ret[rs.productId] = ShopAgg.of(
        Number(rs.minPrice),
        Number(rs.maxPrice),
        Number(rs.totalShop),
      );
      return ret;
    }, {});
  }
}
