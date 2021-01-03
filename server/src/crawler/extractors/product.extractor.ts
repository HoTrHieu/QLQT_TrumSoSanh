import { Logger } from '@nestjs/common';
import { Cluster } from 'puppeteer-cluster';
import { CrawlerConstants } from '../common/cralwer.constants';
import * as fs from 'fs';
import * as path from 'path';
import { ExtractBuilder } from './extract-builder';
import { Brand } from 'src/common/entities/brand.entity';

export class ProductExtractor {
  private static readonly logger = new Logger(ProductExtractor.name);
  static readonly SAVE_DIR = CrawlerConstants.getSavePath('products');
  static async extract(cluster: Cluster, brands: Brand[]) {
    let jobCount = 0;
    await cluster.task(async ({ page, data }) => {
      const jobId = data.jobId;
      const href = data.href + '&page=' + data.page;
      const fileName = `${data.brandId}.${data.exHrefIdx}.${data.page}.json`;
      const filePath = path.resolve(ProductExtractor.SAVE_DIR, fileName);
      if (fs.existsSync(filePath)) {
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
              price: Number(
                (el.querySelector(
                  '.price-discount__price',
                ) as any).innerText.replace(/\D+/g, ''),
              ),
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
        await fs.promises.writeFile(filePath, JSON.stringify([]));
      } else {
        const products = rawProducts.map((rawProduct) => {
          const product = ExtractBuilder.buildExtractedProduct(rawProduct);
          product.brand = { id: data.brandId } as any;
          product.shops = [
            {
              name: 'tiki.vn',
              price: rawProduct.price,
              url: product.rootUrl,
              title: product.name,
              description: '',
              imageSource: product.imageSources[0] || '',
            },
          ] as any;
          return product;
        });
        await fs.promises.writeFile(filePath, JSON.stringify(products));
        ProductExtractor.logger.debug(
          `${jobId}. Save products on disk done: ${filePath}`,
        );
        cluster.queue({ ...data, jobId: ++jobCount, page: data.page + 1 });
      }
    });

    brands.forEach((brand) => {
      brand.exHrefs.forEach((exHref, exHrefIdx) => {
        cluster.queue({
          jobId: ++jobCount,
          brandId: brand.id,
          exHrefIdx: exHrefIdx,
          href: exHref,
          page: 1,
        });
      });
    });

    await cluster.idle();
    await cluster.close();
  }
}
