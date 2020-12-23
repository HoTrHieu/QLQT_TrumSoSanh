import { ConfigService } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

export const esModule = ElasticsearchModule.registerAsync({
  useFactory: (config: ConfigService) => ({
    node: config.get('settings.es.node'),
  }),
  inject: [ConfigService],
});
