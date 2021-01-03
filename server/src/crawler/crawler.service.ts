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
import * as fs from 'fs';
import * as path from 'path';
import { Product } from 'src/common/entities/product.entity';
import { Connection } from 'typeorm';
import { Brand } from 'src/common/entities/brand.entity';
import { Category } from 'src/common/entities/category.entity';
import * as moment from 'moment';
import { ShopExtractor } from './extractors/shop.extractor';
import { ShopUrlExtractor } from './extractors/shop-url.extractor';
import { ShopService } from 'src/shop/shop.service';
import { Shop } from 'src/common/entities/shop.entity';
import { SearchProductRequest } from 'src/product/dto/search-product-request.dto';

const PRODUCT_PAGE_SIZE = 1000;

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService,
    private shopService: ShopService,
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

  async crawlShops() {
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract shops',
        maxConcurrency: 8,
        retryLimit: 3,
      },
      async (cluster) => {
        let jobId = 1;
        let page = 1;
        let products: any;
        do {
          const searchRequest = new SearchProductRequest();
          searchRequest.page = page++;
          searchRequest.pageSize = PRODUCT_PAGE_SIZE;
          const result = await this.productService.search(searchRequest);
          products = result.items;
          for (const product of products) {
            await ShopExtractor.extract(jobId++, cluster, product);
          }
        } while (products.length > 0);
      },
    );
  }

  async crawlShopUrls() {
    return this.pptrClusterService.useCluster(
      {
        taskName: 'Extract shop urls',
        maxConcurrency: 8,
        retryLimit: 3,
      },
      async (cluster) => ShopUrlExtractor.extract(cluster),
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

      // categories map
      let categoryMap = (
        await this.categoryService.findNonRootCategories()
      ).reduce((map, curr) => {
        map[curr.exHref] = curr;
        return map;
      }, {});

      // brands map
      let brandMap = (await this.brandService.findAll()).reduce((map, curr) => {
        curr.exHrefs = curr.exHrefs.map((exHref) => {
          return exHref.split('?')[0];
        });
        map[curr.id] = curr;
        return map;
      }, {});

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

        const productFileTokens = productFile.name.split('.');
        const brandId = Number(productFileTokens[0]);
        const exHrefIdx = Number(productFileTokens[1]);
        const brand = brandMap[brandId];
        const category = categoryMap[brand.exHrefs[exHrefIdx]];
        products.forEach((p) => {
          p.slug = p.slug.substring(0, 768);
          p.category = { id: category.id };
        });

        products = products.filter((p) => {
          if (p.slug in processed) {
            return false;
          }
          processed[p.slug] = true;
          return true;
        });

        self.logger.debug(
          `${jobId}/${productFiles.length}. Start save products: ${productFile.name} -> ${products.length}`,
        );

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
            p.id = idMap[p.slug];
          }
        });

        const savedProducts: any = await manager.save(
          Product,
          manager.create(Product, products),
        );
        const shops = savedProducts.map((p) => {
          p.shops[0].product = { id: p.id };
          return p.shops[0];
        });
        await manager.save(Shop, shops);
        self.logger.debug(
          `${jobId}/${productFiles.length}. Save products on database done: ${filePath}`,
        );
      }
      self.logger.debug(
        `Save all products on database done (${Math.round(
          moment.duration(moment().diff(startTime)).asMinutes(),
        )}m)`,
      );
    });
  }

  async saveShops() {
    const shopFiles = await fs.promises.readdir(ShopExtractor.SAVE_DIR, {
      withFileTypes: true,
    });
    const self = this;
    await self.connection.transaction(async (manager) => {
      let jobId = 0;
      let startTime = moment();
      for (const shopFile of shopFiles) {
        jobId++;
        const filePath = path.resolve(ShopExtractor.SAVE_DIR, shopFile.name);
        let shops: any = [];
        try {
          shops = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
        } catch (err) {
          self.logger.error(
            `${jobId}/${shopFiles.length}. Error on: ${shopFile.name}, message: ${err.message}`,
          );
          continue;
        }

        if (shops.length === 0) {
          continue;
        }

        self.logger.debug(
          `${jobId}/${shopFiles.length}. Start save shops: ${shopFile.name} -> ${shops.length}`,
        );

        await manager.save(Shop, shops);
        self.logger.debug(
          `${jobId}/${shopFiles.length}. Save shops on database done: ${filePath}`,
        );
      }
      self.logger.debug(
        `Save all shops on database done (${Math.round(
          moment.duration(moment().diff(startTime)).asMinutes(),
        )}m)`,
      );
    });
  }
}
