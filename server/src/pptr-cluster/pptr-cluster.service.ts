import { Injectable } from "@nestjs/common";
import { Cluster } from 'puppeteer-cluster';

@Injectable()
export class PptrClusterService {
  getCluster(options: any) {
    return Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      ...options
    });
  }

  async useCluster(options: any, callback: any) {
    const { taskName, ...opts } = options;
    const cluster = await this.getCluster(opts);
    cluster.on('taskerror', (err, data, willRetry) => {
      console.log(`[Error][${taskName}] error:[${err.message}] data:[${data}] retry:[${willRetry}]`);
    });

    const result = await callback(cluster);
    await cluster.idle();
    await cluster.close();
    return result;
  }
}