import { Injectable, Logger } from '@nestjs/common';
import { Cluster } from 'puppeteer-cluster';

@Injectable()
export class PptrClusterService {
  private readonly logger = new Logger(PptrClusterService.name);

  getCluster(options: any) {
    return Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      ...options,
    });
  }

  async useCluster(options: any, callback: any) {
    const { taskName, ...opts } = options;
    const cluster = await this.getCluster(opts);
    cluster.on('taskerror', (err, data, willRetry) => {
      this.logger.error(
        `[${taskName}] error:${
          err.message
        } retry:${willRetry} data:${JSON.stringify(data)}`,
      );
    });

    const result = await callback(cluster);
    await cluster.idle();
    await cluster.close();
    return result;
  }
}
