import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../entities/address.entity';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { User } from '../entities/user.entity';

export const mysqlModule = TypeOrmModule.forRootAsync({
  useFactory: (config: ConfigService) => ({
    type: 'mysql',
    host: config.get('settings.mysql.host'),
    port: config.get('settings.mysql.port'),
    username: config.get('settings.mysql.username'),
    password: config.get('settings.mysql.password'),
    database: config.get('settings.mysql.dbname'),
    entities: [User, Category, Product, Brand, Address],
    synchronize: config.get('settings.mysql.sync'),
  }),
  inject: [ConfigService],
});
