import { Cluster } from 'puppeteer-cluster';
import { Category } from 'src/common/entities/category.entity';
import { ExtractBuilder } from './extract-builder';

export class RootCategoryExtractor {
  static async extract(cluster: Cluster): Promise<Category[]> {
    await cluster.task(async ({ page, data: url }) => {
      await page.goto(url);
      console.log('Start extract common categories');
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

      console.log('Extract common categories done:', rawRootCategories.length);
      return rawRootCategories.map(ExtractBuilder.buildExtractedCategory);
    });

    return cluster.execute('https://tiki.vn');
  }
}
