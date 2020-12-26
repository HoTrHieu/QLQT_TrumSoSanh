import { Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "src/common/decorators/public.decorator";
import { StdResponse } from "src/common/dtos/std-response.dto";
import { Category } from "src/common/entities/category.entity";
import { CrawlerService } from "./crawler.service";

@ApiTags('Crawler')
@Controller('/crawler')
export class CrawlerController {
  constructor(
    private crawlerService: CrawlerService
  ) {}

  @Post('/run-job')
  @ApiResponse({
    type: StdResponse
  })
  @Public()
  runJob() {
    return this.crawlerService.runJob();
  }

  @Post('/crawl-root-categories')
  @ApiResponse({
    type: Category,
    isArray: true
  })
  @Public()
  crawlRootCategories() {
    return this.crawlerService.crawlRootCategories();
  }

  @Post('/crawl-categories')
  @ApiResponse({
    type: Category,
    isArray: true
  })
  @Public()
  crawlCategory() {
    return this.crawlerService.crawlCategories();
  }

  @Post('/crawl-brands')
  @ApiResponse({
    type: StdResponse
  })
  @Public()
  crawlBrand() {
    return this.crawlerService.crawlBrands();
  }
}