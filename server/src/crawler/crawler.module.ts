import { Module } from "@nestjs/common";
import { CategoryModule } from "src/category/category.module";
import { PptrClusterModule } from "src/pptr-cluster/pptr-cluster.module";
import { ProductModule } from "src/product/product.module";
import { CrawlerController } from "./crawler.controller";
import { CrawlerService } from "./crawler.service";

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    PptrClusterModule
  ],
  controllers: [CrawlerController],
  providers: [CrawlerService],
  exports: [CrawlerService]
})
export class CrawlerModule {}