import { Injectable } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { StdResponse } from 'src/common/dtos/std-response.dto';
import { StdResponseCode } from 'src/common/enums/StdResponseCode';
import { PptrClusterService } from 'src/pptr-cluster/pptr-cluster.service';
import { ProductService } from 'src/product/product.service';
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

  crawlRootCategory() {
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract root category',
        maxConcurrency: 1,
      },
      RootCategoryExtractor.extract,
    );
  }

  async crawlBrand() {
    return StdResponse.of(StdResponseCode.SUCCESS, 'Done');
  }
}
