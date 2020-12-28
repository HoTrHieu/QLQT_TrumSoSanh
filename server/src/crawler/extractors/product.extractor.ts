import { Logger } from '@nestjs/common';
import { Cluster } from 'puppeteer-cluster';
import { Category } from 'src/common/entities/category.entity';
import { CrawlerConstants } from '../common/cralwer.constants';
import * as fs from 'fs';
import * as path from 'path';
import { ExtractBuilder } from './extract-builder';

export class ProductExtractor {
  private static readonly logger = new Logger(ProductExtractor.name);
  static readonly SAVE_DIR = CrawlerConstants.getSavePath('products');
  static async extract(cluster: Cluster, categories: Category[]) {
    let jobCount = 0;
    await cluster.task(async ({ page, data }) => {
      const jobId = data.jobId;
      const href = data.href + '&page=' + data.page;
      const fileName = `${data.categoryId}_${data.brandId}.${data.page}.json`;
      if (fs.existsSync(fileName)) {
        ProductExtractor.logger.debug(
          `${jobId}. Skip extract products: ${href}`,
        );
        cluster.queue({ ...data, jobId: ++jobCount, page: data.page + 1 });
        return;
      }

      ProductExtractor.logger.debug(
        `${jobId}. Start extract products: ${href}`,
      );
      await page.goto(href, {
        timeout: 0,
      });
      const rawProducts = await page.evaluate(() => {
        const products = [];
        let els = document.querySelectorAll(
          '[data-view-id="product_list_container"] [data-view-id="product_list_item"]',
        );
        if (els) {
          els.forEach((el) => {
            products.push({
              name: (el.querySelector('.info .name') as any).innerText,
              rootUrl: (el as any).href.split('?')[0],
              imageSources: [(el.querySelector('.thumbnail img') as any).src],
            });
          });
        }
        return products;
      });

      ProductExtractor.logger.debug(
        `${jobId}. Extract products done: ${href} -> ${rawProducts.length}`,
      );
      if (rawProducts.length === 0) {
        ProductExtractor.logger.debug(`${jobId}. Reached last page: ${href}`);
      } else {
        const filePath = path.resolve(ProductExtractor.SAVE_DIR, fileName);
        const products = rawProducts.map((rawProduct) => {
          const product = ExtractBuilder.buildExtractedProduct(rawProduct);
          product.category = { id: data.categoryId } as any;
          product.brand = { id: data.brandId } as any;
          return product;
        });
        await fs.promises.writeFile(filePath, JSON.stringify(products));
        ProductExtractor.logger.debug(
          `${jobId}. Save products on disk done: ${filePath}`,
        );
        cluster.queue({ ...data, jobId: ++jobCount, page: data.page + 1 });
      }
    });

    categories.forEach((category) => {
      category.brands.forEach((brand) => {
        cluster.queue({
          jobId: ++jobCount,
          categoryId: category.id,
          brandId: brand.id,
          href: brand.exHref + '?' + brand.exBrandId,
          page: 1,
        });
      });
    });

    await cluster.idle();
    await cluster.close();
  }
}
