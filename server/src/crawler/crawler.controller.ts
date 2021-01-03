import { Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiBearerAuth()
  async runJob() {
    await this.crawlerService.runJob();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-root-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  crawlRootCategories() {
    this.crawlerService.crawlRootCategories();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  crawlCategories() {
    this.crawlerService.crawlCategories();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-brands')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  crawlBrands() {
    this.crawlerService.crawlBrands();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-products')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  crawlProducts() {
    this.crawlerService.crawlProducts();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-shops')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  crawlShops() {
    this.crawlerService.crawlShops();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-shop-urls')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  crawlShopUrls() {
    this.crawlerService.crawlShopUrls();
    return BooleanResponse.of(true);
  }

  @Post('/save-root-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async saveRootCategories() {
    await this.crawlerService.saveRootCategories();
    return BooleanResponse.of(true);
  }

  @Post('/save-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async saveCategories() {
    await this.crawlerService.saveCategories();
    return BooleanResponse.of(true);
  }

  @Post('/save-brands')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async saveBrands() {
    await this.crawlerService.saveBrands();
    return BooleanResponse.of(true);
  }

  @Post('/save-products')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async saveProducts() {
    await this.crawlerService.saveProducts();
    return BooleanResponse.of(true);
  }

  @Post('/save-shops')
  @ApiResponse({
    type: BooleanResponse,
  })
  @ApiBearerAuth()
  async saveShops() {
    await this.crawlerService.saveShops();
    return BooleanResponse.of(true);
  }
}
