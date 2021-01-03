import { Cluster } from 'puppeteer-cluster';
import { Category } from 'src/common/entities/category.entity';
import { ExtractBuilder } from './extract-builder';
import { CrawlerConstants } from '../common/cralwer.constants';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';

export class RootCategoryExtractor {
  static readonly SAVE_PATH = CrawlerConstants.getSavePath(
    'root_categories.json',
  );
  private static readonly logger = new Logger(RootCategoryExtractor.name);

  static async extract(cluster: Cluster): Promise<Category[]> {
    await cluster.task(async ({ page, data: url }) => {
      RootCategoryExtractor.logger.debug('Start extract root categories');
      await page.goto(url);
      const rawRootCategories = await page.evaluate(() => {
        const rootCategories = [];
        const ignorePaths = {
          'hang-quoc-te': true,
          'voucher-dich-vu': true,
          '#': true,
        };

        document
          .querySelectorAll('ul[data-view-id="main_navigation"] li>a')
          .forEach((el: any) => {
            const href = el.href.split('?')[0];
            const path = href.split('/')[3];
            if (!ignorePaths[path]) {
              rootCategories.push({ href, path, name: el.innerText });
            }
          });
        return rootCategories;
      });

      RootCategoryExtractor.logger.debug(
        'Extract root categories done: ' + rawRootCategories.length,
      );
      const rootCategories = rawRootCategories.map(
        ExtractBuilder.buildExtractedCategory,
      );
      await fs.promises.writeFile(
        RootCategoryExtractor.SAVE_PATH,
        JSON.stringify(rootCategories),
        'utf8',
      );
      return rootCategories;
    });

    return cluster.execute('https://tiki.vn');
  }
}
