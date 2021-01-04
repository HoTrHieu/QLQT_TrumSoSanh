import { Logger } from '@nestjs/common';
import { Cluster } from 'puppeteer-cluster';
import { Product } from 'src/common/entities/product.entity';
import { CrawlerConstants } from '../common/cralwer.constants';
import { ExtractBuilder } from './extract-builder';
import * as path from 'path';
import * as fs from 'fs';

export class ShopExtractor {
  static readonly SAVE_DIR = CrawlerConstants.getSavePath('shops');
  private static readonly logger = new Logger(ShopExtractor.name);
  private static readonly PAGE_SIZE = 20;
  private static readonly MAX_PAGE = 2;
  static buildGoogleShoppingUrl(product: Product, page: number) {
    return `https://www.google.com/search?tbm=shop&start=${
      (page - 1) * this.PAGE_SIZE
    }&q=${encodeURIComponent(product.name)}`;
  }
  static async extract(jobId: number, cluster: Cluster, product: Product) {
    await cluster.task(async ({ page, data }) => {
      if (data.page > ShopExtractor.MAX_PAGE) {
        return;
      }
      const href = ShopExtractor.buildGoogleShoppingUrl(product, data.page);
      const jobInfo = `[${product.id}][${data.page}][${product.name}]`;
      const fileName = `${product.id}.${data.page}.json`;
      const filePath = path.resolve(ShopExtractor.SAVE_DIR, fileName);
      if (fs.existsSync(filePath)) {
        let isEmpty = false;
        try {
          const shops = JSON.parse(await fs.promises.readFile(filePath, 'utf8'));
          isEmpty = shops.length === 0;
        } catch (err) {
          isEmpty = true;
        }
        
        ShopExtractor.logger.debug(`${jobId}. Skip extract shops: ${jobInfo}`);
        if (!isEmpty) {
          cluster.queue({ page: data.page + 1 });
        }
        return;
      }
      ShopExtractor.logger.debug(`${jobId}. Start extract shops: ${jobInfo}`);
      await page.goto(href, { timeout: 0 });
      try {
        const rawShops = await page.evaluate(() => {
          const results = document.querySelectorAll(
            '.sh-pr__product-results .sh-dlr__list-result',
          );
          if (!!results) {
            return [...results].map((result) => {
              const titleEl: any = result.querySelector('a.translate-content');
              const priceEl: any = result.querySelector('.h1Wfwb.O8U6h>span');
              const merchantEl: any = result.querySelector(
                'a[class*="merchant-name"]',
              );
              const descriptionEl: any = result.querySelector(
                '.hBUZL:nth-child(3)',
              );
              const imageEl: any = result.querySelector('img');
              return {
                title: titleEl.innerText,
                url: titleEl.href,
                price: Number(priceEl.innerText.replace(/\D+/g, '')),
                name: merchantEl.innerText,
                description: descriptionEl ? descriptionEl.innerText : '',
                imageSource: imageEl.src,
              };
            });
          }
          return [];
        });
        ShopExtractor.logger.debug(
          `${jobId}. Extract shops done: ${jobInfo} -> ${rawShops.length}`,
        );
        if (rawShops.length === 0) {
          ShopExtractor.logger.debug(`${jobId}. Empty shops: ${jobInfo}`);
          await fs.promises.writeFile(filePath, JSON.stringify([]));
        } else {
          const shops = rawShops.map((rawShop) => {
            const shop = ExtractBuilder.buildExtractedShop(rawShop);
            shop.product = { id: product.id } as any;
            return shop;
          });
          await fs.promises.writeFile(filePath, JSON.stringify(shops));
          ShopExtractor.logger.debug(
            `${jobId}. Save shops on disk done: ${jobInfo}`,
          );
          cluster.queue({ page: data.page + 1 });
        }
      } catch (err) {
        throw new Error(`${jobId}. [${jobInfo}]: ${err.message}, ${href}`);
      }
    });

    cluster.queue({ page: 1 });

    await cluster.idle();
  }
}
