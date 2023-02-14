import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const appURL = config.get<number>('APP_URL');
  const portEnv = config.get<number>('PORT');
  const port = portEnv ? portEnv : 3000;

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => {
    logger.log(`Server listening at ${appURL}:${port}`);
  });
}
bootstrap();
