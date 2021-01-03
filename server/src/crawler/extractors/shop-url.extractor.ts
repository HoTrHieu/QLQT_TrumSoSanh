import { Logger } from '@nestjs/common';
import { Cluster } from 'puppeteer-cluster';
import { Shop } from 'src/common/entities/shop.entity';
import * as path from 'path';
import * as fs from 'fs';
import { ShopExtractor } from './shop.extractor';

export class ShopUrlExtractor {
  private static readonly logger = new Logger(ShopUrlExtractor.name);
  private static readonly FILES_CHUNK_SIZE = 20;
  static async extract(cluster: Cluster) {
    await cluster.task(async ({ page, data }) => {
      const filePath = path.resolve(ShopExtractor.SAVE_DIR, data.fileName);
      const shops: Shop[] = JSON.parse(
        await fs.promises.readFile(filePath, 'utf8'),
      );
      ShopUrlExtractor.logger.debug(
        `${data.jobId}: Start extract shop.url: ${data.fileName}`,
      );
      for (const shop of shops) {
        ShopUrlExtractor.logger.debug(
          `${data.jobId}: Start Navigate shop.url: ${data.fileName} -> ${shop.url}`,
        );
        await page.goto(shop.url, { timeout: 0 });
        await page.waitForNavigation();
        shop.url = await page.url();
        ShopUrlExtractor.logger.debug(
          `${data.jobId}: End Navigate shop.url: ${data.fileName} -> ${shop.url}`,
        );
      }
      await fs.promises.writeFile(filePath, JSON.stringify(shops));
      ShopUrlExtractor.logger.debug(
        `${data.jobId}: Extract shop.url done: ${data.fileName}`,
      );
    });

    const shopFiles = await fs.promises.readdir(ShopExtractor.SAVE_DIR, {
      withFileTypes: true,
    });

    let jobId = 1;
    for (const shopFile of shopFiles) {
      cluster.queue({ fileName: shopFile.name, jobId: jobId++ });
      if (jobId % ShopUrlExtractor.FILES_CHUNK_SIZE === 0) {
        await cluster.idle();
      }
    }

    await cluster.idle();
    await cluster.close();
  }
}
