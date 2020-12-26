import { Cluster } from 'puppeteer-cluster';
import { Brand } from 'src/common/entities/brand.entity';
import { ExtractBuilder } from './extract-builder';

const isBooks = {
  'sach-tieng-anh': true,
  'sach-truyen-tieng-viet': true,
};

export class BrandExtractor {
  static async extract(
    cluster: Cluster,
    categories: Brand[],
  ): Promise<Brand[]> {
    let doneCount = 0;
    const brands: Brand[] = [];
    const categoriesMap = new Map();

    await cluster.task(async ({ page, data }) => {
      const category: Brand = data;
      await page.goto(category.exHref, {
        timeout: 0,
      });

      console.log('Start extract brands:', category.exHref);
      const rawBrands = await page.evaluate((isBook) => {
        const brands = [];
        let els = null;

        try {
          let brandMenuEl = null;
          if (isBook) {
            brandMenuEl = document.querySelector(
              '#collapse-publisher_vn>.list-group',
            );
          } else {
            brandMenuEl = document.querySelector('#collapse-brand>.list-group');
          }
          if (brandMenuEl) {
            try {
              brandMenuEl.removeChild(
                brandMenuEl.querySelector('.list-group-item.list-group-show'),
              );
              brandMenuEl.removeChild(
                brandMenuEl.querySelector('.list-group-item.list-group-hide'),
              );
            } catch {}
            els = brandMenuEl.querySelectorAll('.list-group-item>a');
          }
        } catch (err) {
          throw new Error('Extract brand by id error: ' + err.message);
        }

        try {
          if (!els) {
            els = document
              .querySelector('[class*="SideBar__Root"]')
              .querySelector('div.block:nth-child(7)')
              .querySelectorAll('div.list.collapsed>a');
          }
        } catch (err) {
          throw new Error(
            'Extract brand by SideBar__Root error: ' + err.message,
          );
        }

        if (els) {
          els.forEach((el) => {
            const span = el.querySelector('span');
            if (span) {
              el.removeChild(span);
            }
            const href = el.href.split('?')[0];
            const path = href.split('/')[5];
            brands.push({ href, path, name: el.innerText.trim() });
          });
        }

        return brands;
      }, isBooks[category.exPath]);

      console.log(
        `${++doneCount}/${categories.length}. Extract brands done:`,
        category.exHref,
        rawBrands.length,
      );
      
      if (rawBrands.length === 0) {
        throw new Error('Empty extracted brands at ' + category.exHref);
      } else {
        brands.push(
          rawBrands.map((rawBrand) => {
            const brand = ExtractBuilder.buildExtractedBrand(rawBrand);
            const categories: any = categoriesMap.get(brand.slug) || [];
            categoriesMap.set(brand.slug, [...categories, category]);
            return brand;
          }),
        );
      }
    });

    categories.forEach((category) => {
      cluster.queue(category);
    });

    await cluster.idle();
    await cluster.close();

    brands.forEach((brand) => {
      brand.categories = categoriesMap.get(brand.slug);
      return brand;
    });

    return brands;
  }
}
