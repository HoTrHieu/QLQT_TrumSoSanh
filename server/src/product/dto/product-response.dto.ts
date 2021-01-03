import { Product } from 'src/common/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ShopAgg } from 'src/shop/dto/shop-agg.dto';

export class ProductResponse extends Product {
  @ApiProperty()
  minPrice: number;

  @ApiProperty()
  maxPrice: number;

  @ApiProperty()
  totalShop: number;

  static of(product: Product, shopAgg: ShopAgg) {
    const resp = new ProductResponse();
    resp.id = product.id;
    resp.name = product.name;
    resp.slug = product.slug;
    resp.imageSources = product.imageSources;
    resp.rootUrl = product.rootUrl;
    resp.status = product.status;
    resp.updatedDate = product.updatedDate;
    resp.createdDate = product.createdDate;
    resp.brand = product.brand;
    resp.shops = product.shops;
    if (shopAgg) {
      resp.minPrice = shopAgg.minPrice;
      resp.maxPrice = shopAgg.maxPrice;
      resp.totalShop = shopAgg.totalShop;
    }
    return resp;
  }
}
