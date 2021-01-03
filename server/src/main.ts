import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useSwagger } from './common/modules/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // configurations
  useSwagger(app);
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
