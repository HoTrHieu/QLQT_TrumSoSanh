import * as slugify from 'slug';
import * as cryptoRandomString from 'crypto-random-string';
import { Brand } from 'src/common/entities/brand.entity';
import { Category } from 'src/common/entities/category.entity';
import { Product } from 'src/common/entities/product.entity';

export class ExtractBuilder {
  static buildExtractedBrand(rawBrand: any) {
    const brand = new Brand();
    brand.exHref = rawBrand.href;
    brand.exBrandId = rawBrand.brandId;
    brand.name = rawBrand.name;
    brand.slug = slugify(brand.name);
    return brand;
  }

  static buildExtractedCategory(rawCategory: any) {
    const category = new Category();
    category.exHref = rawCategory.href;
    category.exPath = rawCategory.path;
    category.name = rawCategory.name;
    category.slug = slugify(category.name);
    return category;
  }

  static buildExtractedProduct(rawProduct: any) {
    const product = new Product();
    product.name = rawProduct.name;
    product.slug =
      slugify(rawProduct.name) +
      cryptoRandomString({ length: 10, type: 'url-safe' });
    product.rootUrl = rawProduct.rootUrl;
    product.imageSources = rawProduct.imageSources;
    return product;
  }
}
