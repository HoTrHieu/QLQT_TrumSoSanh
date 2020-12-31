import { Cluster } from "puppeteer-cluster";
import { Product } from "src/common/entities/product.entity";
import { ExtractBuilder } from "./extract-builder";

export class ShopExtractor {
  private static readonly PAGE_SIZE = 20;
  static buildGoogleShoppingUrl(product: Product, page: number) {
    return `https://www.google.com/search?tbm=shop&start=${(page - 1) * this.PAGE_SIZE}&q=${product.name}`
  }
  static async extract(cluster: Cluster, product: Product, pageNum: number) {
    await cluster.task(async ({ page }) => {
      await page.goto(this.buildGoogleShoppingUrl(product, pageNum));
      const rawShops = await page.evaluate(() => {
        const results = document.querySelectorAll('.sh-pr__product-results .sh-dlr__list-result');
        if (!!results) {
          return [...results].map(result => {
            const titleEl: any = result.querySelector('a.translate-content');
            const priceEl: any = result.querySelector('.h1Wfwb.O8U6h>span');
            const merchantEl: any = result.querySelector('a[class*="merchant-name"]');
            const descriptionEl: any = result.querySelector('.hBUZL:nth-child(3)');
            const imageEl: any = result.querySelector('img');
            return {
              title: titleEl.innerText,
              url: titleEl.src,
              price: Number(priceEl.innerText.replace(/\D+/g, '')),
              name: merchantEl.innerText,
              description: descriptionEl ? descriptionEl.innerText : '',
              imageSource: imageEl.src
            };
          });
        }
        return [];
      });
      return rawShops.map(ExtractBuilder.buildExtractedShop);
    });
    return cluster.execute({});
  }
}