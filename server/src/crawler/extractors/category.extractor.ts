import { Cluster } from 'puppeteer-cluster';
import { Category } from 'src/common/entities/category.entity';
import { ExtractBuilder } from './extract-builder';

export class CategoryExtractor {
  static async extract(cluster: Cluster, rootCategories: Category[]) {
    let doneCount = 0;
    const categories: Category[] = [];
    await cluster.task(async ({ page: categoryPage, data }) => {
      const rootCategory: Category = data;
      await categoryPage.goto(rootCategory.exHref, {
        timeout: 0,
      });

      console.log('Start extract categories:', rootCategory.exHref);
      const rawCategories = await categoryPage.evaluate(() => {
        const categories = [];
        let categoryEls = null;

        try {
          categoryEls = document
            .querySelector('#collapse-category')
            .querySelectorAll('.list-group-item.is-child>a');
        } catch (err) {}

        try {
          if (categoryEls === null) {
            categoryEls = document
              .querySelector('[class*="SideBar__Root"]')
              .querySelector('div.block')
              .querySelectorAll('div.list.collapsed>a');
            if (categoryEls !== null) {
              categoryEls = [...categoryEls].slice(1);
            }
          }
        } catch (err) {}

        if (categoryEls !== null) {
          categoryEls.forEach((el) => {
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

      console.log(
        `${++doneCount}/${rootCategories.length}. Extract categories done:`,
        rootCategory.exHref,
        rawCategories.length,
      );
      
      if (rawCategories.length === 0) {
        throw new Error('Empty extracted category at ' + rootCategory.exHref);
      } else {
        categories.push(
          rawCategories.map((rawCategory) => {
            const category = ExtractBuilder.buildExtractedCategory(rawCategory);
            category.parent = rootCategory;
            return category;
          }),
        );
      }
    });

    rootCategories.forEach((rootCategory) => {
      cluster.queue(rootCategory);
    });

    await cluster.idle();
    await cluster.close();

    return categories;
  }
}
