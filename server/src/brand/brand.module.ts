import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/common/entities/brand.entity';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand]), CacheModule.register()],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService]
})
export class BrandModule {}