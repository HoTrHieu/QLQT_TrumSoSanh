import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { StdResponse } from 'src/common/dtos/std-response.dto';
import { StdResponseCode } from 'src/common/enums/StdResponseCode';
import { PptrClusterService } from 'src/pptr-cluster/pptr-cluster.service';
import { ProductService } from 'src/product/product.service';
import { BrandExtractor } from './extractors/brand.extractor';
import { CategoryExtractor } from './extractors/category.extractor';
import { RootCategoryExtractor } from './extractors/root-category.extractor';

@Injectable()
export class CrawlerService {
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private pptrClusterService: PptrClusterService,
  ) {}

  async runJob() {
    return StdResponse.of(StdResponseCode.SUCCESS, 'Done');
  }

  async crawlRootCategories() {
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract root categories',
        maxConcurrency: 1
      },
      RootCategoryExtractor.extract
    );
  }

  async crawlCategories() {
    const categories = await this.pptrClusterService.useCluster(
      {
        taskName: 'Extract categories',
        maxConcurrency: 8,
      },
      async cluster => {
        const rootCategories = await RootCategoryExtractor.extract(cluster);
        if (!rootCategories || rootCategories.length === 0) {
          return [];
        }
        return CategoryExtractor.extract(cluster, rootCategories);
      },
    );
    return categories;
  }

  async crawlBrands() {
    const categories = await this.crawlCategories();
    if (!categories || categories.length === 0) {
      return [];
    }
    const brands = await this.pptrClusterService.useCluster(
      {
        taskName: 'Extract brands',
        maxConcurrency: 8
      },
      async cluster => BrandExtractor.extract(cluster, categories)
    );
    return brands;
  }
}
