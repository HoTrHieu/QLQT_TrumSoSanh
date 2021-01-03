import { Cluster } from 'puppeteer-cluster';
import { Category } from 'src/common/entities/category.entity';
import { ExtractBuilder } from './extract-builder';
import * as fs from 'fs';
import { CrawlerConstants } from '../common/cralwer.constants';
import { Logger } from '@nestjs/common';

export class CategoryExtractor {
  static readonly SAVE_PATH = CrawlerConstants.getSavePath('categories.json');
  private static readonly logger = new Logger(CategoryExtractor.name);

  static async extract(cluster: Cluster, rootCategories: Category[]) {
    let doneCount = 0;
    let categories: Category[] = [];
    let existsCategory = new Map();
    await cluster.task(async ({ page: categoryPage, data }) => {
      const rootCategory: Category = data;
      CategoryExtractor.logger.debug(
        'Start extract categories: ' + rootCategory.exHref,
      );
      await categoryPage.goto(rootCategory.exHref, {
        timeout: 0,
      });

      const rawCategories = await categoryPage.evaluate(() => {
        const categories = [];
        let categoryEls = document.querySelectorAll(
          '[data-view-label="Danh Mục Sản Phẩm"] a.item--category',
        );
        if (categoryEls !== null) {
          categoryEls.forEach((el: any) => {
            const span = el.querySelector('span');
            if (span !== null) {
              el.removeChild(span);
            }
            const href = el.href.split('?')[0];
            const path = href.split('/')[3];
            categories.push({ href, path, name: el.innerText.trim() });
          });
        }

        return categories;
      });

      if (rawCategories.length === 0) {
        throw new Error('Empty extracted category at ' + rootCategory.exHref);
      } else {
        categories = categories.concat(
          rawCategories
            .map((rawCategory) => {
              const category = ExtractBuilder.buildExtractedCategory(
                rawCategory,
              );
              category.parent = { id: rootCategory.id } as any;
              return category;
            })
            .filter((category) => {
              if (existsCategory.has(category.slug)) {
                return false;
              }
              existsCategory.set(category.slug, true);
              return true;
            }),
        );
      }

      CategoryExtractor.logger.debug(
        `${++doneCount}/${rootCategories.length}. Extract categories done: ${
          rootCategory.exHref
        } -> ${rawCategories.length}`,
      );
    });

    rootCategories.forEach((rootCategory) => {
      cluster.queue(rootCategory);
    });

    await cluster.idle();
    await cluster.close();

    CategoryExtractor.logger.debug('All extract category processes done!');
    await fs.promises.writeFile(
      CategoryExtractor.SAVE_PATH,
      JSON.stringify(categories),
      'utf8',
    );

    return categories;
  }
}
