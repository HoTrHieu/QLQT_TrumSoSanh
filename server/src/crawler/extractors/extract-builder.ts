import * as slugify from 'slug';
import { Brand } from 'src/common/entities/brand.entity';
import { Category } from 'src/common/entities/category.entity';
import { Product } from 'src/common/entities/product.entity';
import { Shop } from 'src/common/entities/shop.entity';

export class ExtractBuilder {
  static buildExtractedBrand(rawBrand: any) {
    const brand = new Brand();
    brand.exHrefs = [rawBrand.href];
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
    product.slug = slugify(rawProduct.name);
    product.rootUrl = rawProduct.rootUrl;
    product.imageSources = rawProduct.imageSources;
    return product;
  }

  static buildExtractedShop(rawShop: any) {
    const shop = new Shop();
    shop.name = rawShop.name;
    shop.price = rawShop.price;
    shop.url = rawShop.url;
    shop.title = rawShop.title;
    shop.description = rawShop.description;
    shop.imageSource = rawShop.imageSource;
    return shop;
  }
}
