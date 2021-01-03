import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/common/entities/address.entity';
import { EntityStatus } from 'src/common/entities/common/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  all() {
    return this.addressRepository.find({
      status: EntityStatus.ACTIVE,
    });
  }

  async updateStatus(id: number, status: EntityStatus) {
    const result = await this.addressRepository.update(
      { id },
      {
        status,
      },
    );
    return result.affected > 0;
  }
}
