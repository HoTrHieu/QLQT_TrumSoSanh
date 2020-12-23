import { Cluster } from 'puppeteer-cluster';

export interface RootCategory {
  href: string;
  path: string;
  name: string;
}

export class RootCategoryExtractor {
  static async extract(cluster: Cluster): Promise<RootCategory[]> {
    await cluster.task(async ({ page, data: url }) => {
      await page.goto(url);
      return page.evaluate(() => {
        const rootCategories = [];
        const ignorePaths = {
          'hang-quoc-te': true,
          'voucher-dich-vu': true,
          '#': true
        };
    
        document
          .querySelector('ul[data-view-id="main_navigation"]')
          .querySelectorAll('li[data-view-id="main_navigation_item"]>a')
          .forEach((el: any) => {
            const href = el.href.split('?')[0];
            const path = href.split('/')[3];
            if (!ignorePaths[path]) {
              rootCategories.push({ href, path, name: el.innerText });
            }
          });
        return rootCategories;
      });
    });

    return cluster.execute('https://tiki.vn');
  }
}