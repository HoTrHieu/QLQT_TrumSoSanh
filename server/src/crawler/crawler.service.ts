import { Injectable, Logger } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { StdResponse } from 'src/common/dtos/std-response.dto';
import { StdResponseCode } from 'src/common/enums/StdResponseCode';
import { PptrClusterService } from 'src/pptr-cluster/pptr-cluster.service';
import { ProductService } from 'src/product/product.service';
import { BrandExtractor } from './extractors/brand.extractor';
import { CategoryExtractor } from './extractors/category.extractor';
import { RootCategoryExtractor } from './extractors/root-category.extractor';
import { BrandService } from 'src/brand/brand.service';
import { ProductExtractor } from './extractors/product.extractor';
import { CrawlerConstants } from './common/cralwer.constants';
import * as fs from 'fs';
import * as path from 'path';
import { Product } from 'src/common/entities/product.entity';
import { Connection } from 'typeorm';
import { Brand } from 'src/common/entities/brand.entity';
import { Category } from 'src/common/entities/category.entity';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService,
    private pptrClusterService: PptrClusterService,
    private connection: Connection,
  ) {}

  async runJob() {
    return StdResponse.of(StdResponseCode.SUCCESS, 'Done');
  }

  async crawlRootCategories() {
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract root categories',
        maxConcurrency: 1,
      },
      RootCategoryExtractor.extract,
    );
  }

  async crawlCategories() {
    const rootCategories = await this.categoryService.findRootCategories();
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract categories',
        maxConcurrency: 8,
      },
      async (cluster) => CategoryExtractor.extract(cluster, rootCategories),
    );
  }

  async crawlBrands() {
    const categories = await this.categoryService.findNonRootCategories();
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract brands',
        maxConcurrency: 8,
        retryLimit: 3,
      },
      async (cluster) => BrandExtractor.extract(cluster, categories),
    );
  }

  async crawlProducts() {
    const categories = await this.categoryService.findCategoriesWithBrands();
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract products',
        maxConcurrency: 8,
        retryLimit: 3,
      },
      async (cluster) => ProductExtractor.extract(cluster, categories),
    );
  }

  async saveRootCategories() {
    const rootCategories = JSON.parse(
      await fs.promises.readFile(RootCategoryExtractor.SAVE_PATH, 'utf8'),
    );
    return this.connection.manager.save(Category, rootCategories);
  }

  async saveCategories() {
    const categories = JSON.parse(
      await fs.promises.readFile(CategoryExtractor.SAVE_PATH, 'utf8'),
    );
    return this.connection.manager.save(Category, categories);
  }

  async saveBrands() {
    const brands = JSON.parse(
      await fs.promises.readFile(BrandExtractor.SAVE_PATH, 'utf8'),
    );
    return this.connection.manager.save(Brand, brands);
  }

  async saveProducts() {
    const savedProductsPath = CrawlerConstants.getSavePath(
      'saved_products.json',
    );
    const savedProducts = JSON.parse(
      await fs.promises.readFile(savedProductsPath, 'utf8'),
    );
    const productFiles = await fs.promises.readdir(ProductExtractor.SAVE_DIR, {
      withFileTypes: true,
    });
    const self = this;
    await self.connection.transaction(async (manager) => {
      let skipped = 0;
      let jobId = 0;
      for (const productFile of productFiles) {
        jobId++;
        let isSkip = false;
        if (!!savedProducts[productFile.name]) {
          skipped++;
          isSkip = true;
        }
        if (!isSkip) {
          const filePath = path.resolve(
            ProductExtractor.SAVE_DIR,
            productFile.name,
          );
          let products: any = [];
          try {
            products = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
          } catch (err) {
            self.logger.error(
              `${jobId}. Error on: ${productFile.name}, message: ${err.message}`,
            );
            continue;
          }

          self.logger.debug(
            `${jobId}. Start save products: ${productFile.name} -> ${products.length}`,
          );
          await manager.save(Product, products);
          self.logger.debug(
            `${jobId}. Save products on database done: ${filePath}`,
          );
          savedProducts[productFile.name] = true;
        } else {
          self.logger.debug(`${jobId}. Skip products: ${productFile.name}`);
        }
      }
      self.logger.debug(
        `Save all products on database done, skipped: ${skipped}`,
      );
    });
    await fs.promises.writeFile(savedProductsPath, JSON.stringify(savedProducts));
  }
}
