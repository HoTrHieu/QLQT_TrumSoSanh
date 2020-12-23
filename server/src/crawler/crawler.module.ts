import { Module } from "@nestjs/common";
import { CategoryModule } from "src/category/category.module";
import { PptrClusterService } from "src/pptr-cluster/pptr-cluster.service";
import { ProductModule } from "src/product/product.module";
import { CrawlerController } from "./crawler.controller";
import { CrawlerService } from "./crawler.service";

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    PptrClusterService
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService],
  exports: [CrawlerService]
})
export class CrawlerModule {}