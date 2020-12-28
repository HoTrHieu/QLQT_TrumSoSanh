import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { mysqlModule } from './common/modules/mysql.module';
import { rootConfiguration } from './common/configurations/configuration';
import { RoleGuard } from './auth/guard/role.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CrawlerModule } from './crawler/crawler.module';
import { AddressModule } from './address/address.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [rootConfiguration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'webapp'),
    }),
    mysqlModule,
    UserModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    CrawlerModule,
    AddressModule,
    ShopModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
