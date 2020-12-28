import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SearchRequest } from "src/common/dtos/search-request.dto";
import { EntityStatus } from "src/common/entities/common/status.entity";
import { Shop } from "src/common/entities/shop.entity";
import { PagingUtil } from "src/common/utils/paging.util";
import { Repository } from "typeorm";

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>
  ) {}

  search(request: SearchRequest) {
    const qb = this.shopRepository
      .createQueryBuilder('s')
      .where('s.status = :status', { status: EntityStatus.ACTIVE })
    if (request.isSearchTermExists) {
      qb.andWhere(`s.name LIKE '%${request.searchTerm}%'`);
    }
    return PagingUtil.paginateByQb(qb, request);
  }

  async updateStatus(id: number, status: EntityStatus) {
    const result = await this.shopRepository.update(
      { id },
      {
        status,
      },
    );
    return result.affected > 0;
  }
}