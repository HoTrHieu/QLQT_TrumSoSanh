import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
import { ShopExtractor } from './extractors/shop.extractor';
import moment from 'moment';

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
    const brands = await this.brandService.findAll();
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract products',
        maxConcurrency: 8,
        retryLimit: 3,
      },
      (cluster) => ProductExtractor.extract(cluster, brands),
    );
  }

  async crawlShops(productId: number, page: number) {
    const product = await this.productService.findOneById(productId);
    if (!product) {
      throw new NotFoundException();
    }
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract shops',
        maxConcurrency: 2,
        retryLimit: 3,
      },
      (cluster) => ShopExtractor.extract(cluster, product, page),
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
    const productFiles = await fs.promises.readdir(ProductExtractor.SAVE_DIR, {
      withFileTypes: true,
    });
    const self = this;
    await self.connection.transaction(async (manager) => {
      let jobId = 0;
      let processed = {};
      let startTime = moment();
      for (const productFile of productFiles) {
        jobId++;
        const filePath = path.resolve(
          ProductExtractor.SAVE_DIR,
          productFile.name,
        );
        let products: any = [];
        try {
          products = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
        } catch (err) {
          self.logger.error(
            `${jobId}/${productFiles.length}. Error on: ${productFile.name}, message: ${err.message}`,
          );
          continue;
        }

        if (products.length === 0) {
          continue;
        }

        self.logger.debug(
          `${jobId}/${productFiles.length}. Start save products: ${productFile.name} -> ${products.length}`,
        );

        products = products.filter((p) => {
          if (p.slug in processed) {
            return false;
          }
          processed[p.slug] = true;
          return true;
        });

        const queryResult = await this.productService.findBySlugs(
          products.map((p) => p.slug),
        );
        const idMap = queryResult.reduce((obj, curr) => {
          obj[curr.slug] = curr.id;
          return obj;
        }, {});

        // set exists id
        products.forEach((p) => {
          if (p.slug in idMap) {
            p.id = idMap[p.slug].id;
          }
        });

        await manager.save(Product, products);
        self.logger.debug(
          `${jobId}/${productFiles.length}. Save products on database done: ${filePath}`,
        );
      }
      self.logger.debug(
        `Save all products on database done (${Math.round(moment.duration(moment().diff(startTime)).asMinutes())}m)`,
      );
    });
  }

  async saveDuplicatedProducts() {
    const productFiles = await fs.promises.readdir(ProductExtractor.SAVE_DIR, {
      withFileTypes: true,
    });
    let duplicatedProducts = {};
    for (const productFile of productFiles) {
      try {
        const filePath = path.resolve(
          ProductExtractor.SAVE_DIR,
          productFile.name,
        );
        const products = JSON.parse(
          await fs.promises.readFile(filePath, 'utf8'),
        );
        products.forEach((p) => {
          if (p.slug in duplicatedProducts) {
            duplicatedProducts[p.slug].push(p);
          } else {
            duplicatedProducts[p.slug] = [p];
          }
        });
      } catch (err) {
        console.error(
          `Process product file failed: ${productFile.name}, error: ${err.message}`,
        );
      }
    }

    duplicatedProducts = Object.keys(duplicatedProducts)
      .filter((key) => duplicatedProducts[key].length > 1)
      .reduce((result, key) => {
        result[key] = duplicatedProducts[key];
        return result;
      }, {});

    const savePath = CrawlerConstants.getSavePath('duplicated_products.json');
    await fs.promises.writeFile(
      savePath,
      JSON.stringify(duplicatedProducts),
      'utf8',
    );
  }
}
