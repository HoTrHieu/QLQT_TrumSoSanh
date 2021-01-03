import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/common/entities/address.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
