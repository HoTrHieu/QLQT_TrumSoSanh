import { Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { StdResponse } from "src/common/dtos/std-response.dto";
import { StdResponseCode } from "src/common/enums/StdResponseCode";
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
  @ApiBearerAuth()
  runJob() {
    return this.crawlerService.runJob();
  }

  @Post('/crawl-category')
  @ApiResponse({
    type: StdResponse
  })
  @ApiBearerAuth()
  async crawlCategory() {
    const rootCategories = await this.crawlerService.crawlRootCategory();
    return StdResponse.of(StdResponseCode.SUCCESS, rootCategories);
  }

  @Post('/crawl-brand')
  @ApiResponse({
    type: StdResponse
  })
  @ApiBearerAuth()
  crawlBrand() {
    return this.crawlerService.crawlBrand();
  }
}