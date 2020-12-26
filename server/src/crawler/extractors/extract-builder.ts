import * as slugify from "slug";
import { Brand } from "src/common/entities/brand.entity";
import { Category } from "src/common/entities/category.entity";

export class ExtractBuilder {
  static buildExtractedBrand(rawBrand: any) {
    const brand = new Brand();
    brand.exHref = rawBrand.href;
    brand.exPath = rawBrand.path;
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

  }
}