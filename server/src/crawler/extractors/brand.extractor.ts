import { Cluster } from 'puppeteer-cluster';
import { Brand } from 'src/common/entities/brand.entity';
import { ExtractBuilder } from './extract-builder';
import * as fs from 'fs';
import { CrawlerConstants } from '../common/cralwer.constants';
import { Logger } from '@nestjs/common';
import { Category } from 'src/common/entities/category.entity';

const isBooks = {
  'sach-tieng-anh': true,
  'sach-truyen-tieng-viet': true,
};

export class BrandExtractor {
  static readonly SAVE_PATH = CrawlerConstants.getSavePath('brands.json');
  private static readonly logger = new Logger(BrandExtractor.name);

  static async extract(
    cluster: Cluster,
    categories: Category[],
  ): Promise<Brand[]> {
    let doneCount = 0;
    let brands: Brand[] = [];
    const categoriesMap = new Map();

    await cluster.task(async ({ page, data }) => {
      const category: Category = data;
      BrandExtractor.logger.debug('Start extract brands: ' + category.exHref);
      await page.goto(category.exHref, {
        timeout: 0,
      });

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
              .querySelector(
                `[class*="SideBar__Root"] [data-view-label="${
                  isBook ? 'Công ty phát hành' : 'Thương hiệu'
                }"]`,
              )
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
            const paramName = isBook ? 'publisher_vn' : 'brand';
            const brandId = new URL(el.href).searchParams.get(paramName);
            brands.push({
              href,
              brandId: paramName + '=' + brandId,
              name: el.innerText.trim(),
            });
          });
        }

        return brands;
      }, isBooks[category.exPath]);

      BrandExtractor.logger.debug(
        `${++doneCount}/${categories.length}. Extract brands done: ${
          category.exHref
        } -> ${rawBrands.length}`,
      );

      if (rawBrands.length === 0) {
        throw new Error('Empty extracted brands at ' + category.exHref);
      } else {
        brands = brands.concat(
          rawBrands.map((rawBrand) => {
            const brand = ExtractBuilder.buildExtractedBrand(rawBrand);
            const categories: any = categoriesMap.get(brand.slug) || [];
            if (!categories.includes(category.id)) {
              categoriesMap.set(brand.slug, [...categories, category.id]);
            }
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

    BrandExtractor.logger.debug('All extract brand processes done!');
    const distinctBrands: Brand[] = [];
    const existsBrand = new Map();
    brands.forEach((brand) => {
      if (!existsBrand.has(brand.slug)) {
        brand.categories = categoriesMap.get(brand.slug).map((id) => ({ id }));
        existsBrand.set(brand.slug, true);
        distinctBrands.push(brand);
      }
    });

    await fs.promises.writeFile(
      BrandExtractor.SAVE_PATH,
      JSON.stringify(distinctBrands),
      'utf8',
    );

    return brands;
  }
}
