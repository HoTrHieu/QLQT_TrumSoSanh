import { Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BooleanResponse } from 'src/common/dtos/boolean-response.dto';
import { CrawlerService } from './crawler.service';

@ApiTags('Crawler')
@Controller('/crawler')
export class CrawlerController {
  constructor(private crawlerService: CrawlerService) {}

  @Post('/run-job')
  @ApiResponse({
    type: BooleanResponse,
  })
  async runJob() {
    await this.crawlerService.runJob();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-root-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  crawlRootCategories() {
    this.crawlerService.crawlRootCategories();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  crawlCategories() {
    this.crawlerService.crawlCategories();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-brands')
  @ApiResponse({
    type: BooleanResponse,
  })
  crawlBrands() {
    this.crawlerService.crawlBrands();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-products')
  @ApiResponse({
    type: BooleanResponse,
  })
  crawlProducts() {
    this.crawlerService.crawlProducts();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-shops')
  @ApiResponse({
    type: BooleanResponse,
  })
  crawlShops() {
    this.crawlerService.crawlShops();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-shop-urls')
  @ApiResponse({
    type: BooleanResponse,
  })
  crawlShopUrls() {
    this.crawlerService.crawlShopUrls();
    return BooleanResponse.of(true);
  }

  @Post('/save-root-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  async saveRootCategories() {
    await this.crawlerService.saveRootCategories();
    return BooleanResponse.of(true);
  }

  @Post('/save-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  async saveCategories() {
    await this.crawlerService.saveCategories();
    return BooleanResponse.of(true);
  }

  @Post('/save-brands')
  @ApiResponse({
    type: BooleanResponse,
  })
  async saveBrands() {
    await this.crawlerService.saveBrands();
    return BooleanResponse.of(true);
  }

  @Post('/save-products')
  @ApiResponse({
    type: BooleanResponse,
  })
  async saveProducts() {
    await this.crawlerService.saveProducts();
    return BooleanResponse.of(true);
  }

  @Post('/save-shops')
  @ApiResponse({
    type: BooleanResponse,
  })
  async saveShops() {
    await this.crawlerService.saveShops();
    return BooleanResponse.of(true);
  }
}
