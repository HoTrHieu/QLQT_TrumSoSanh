import { resolve } from 'path';

export class CrawlerConstants {
  static SAVE_DIR = './src/crawler/crawled-data/';
  static getSavePath(filename: string) {
    return resolve(this.SAVE_DIR, filename);
  }
}
