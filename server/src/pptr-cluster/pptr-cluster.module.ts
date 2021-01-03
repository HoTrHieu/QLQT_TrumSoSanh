import { Module } from '@nestjs/common';
import { PptrClusterService } from './pptr-cluster.service';

@Module({
  providers: [PptrClusterService],
  exports: [PptrClusterService],
})
export class PptrClusterModule {}
