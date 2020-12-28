import { Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
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
  @Public()
  async runJob() {
    await this.crawlerService.runJob();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-root-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  @Public()
  crawlRootCategories() {
    this.crawlerService.crawlRootCategories();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  @Public()
  crawlCategories() {
    this.crawlerService.crawlCategories();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-brands')
  @ApiResponse({
    type: BooleanResponse,
  })
  @Public()
  crawlBrands() {
    this.crawlerService.crawlBrands();
    return BooleanResponse.of(true);
  }

  @Post('/crawl-products')
  @ApiResponse({
    type: BooleanResponse,
  })
  @Public()
  crawlProducts() {
    this.crawlerService.crawlProducts();
    return BooleanResponse.of(true);
  }

  @Post('/save-root-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  @Public()
  async saveRootCategories() {
    await this.crawlerService.saveRootCategories();
    return BooleanResponse.of(true);
  }

  @Post('/save-categories')
  @ApiResponse({
    type: BooleanResponse,
  })
  @Public()
  async saveCategories() {
    await this.crawlerService.saveCategories();
    return BooleanResponse.of(true);
  }

  @Post('/save-brands')
  @ApiResponse({
    type: BooleanResponse,
  })
  @Public()
  async saveBrands() {
    await this.crawlerService.saveBrands();
    return BooleanResponse.of(true);
  }

  @Post('/save-products')
  @ApiResponse({
    type: BooleanResponse,
  })
  @Public()
  async saveProducts() {
    await this.crawlerService.saveProducts();
    return BooleanResponse.of(true);
  }
}
