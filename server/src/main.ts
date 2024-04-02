import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';

async function bootstrap() {
  const PORT = process.env.APP_PORT || 5000;

  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
    cors: {
      credentials: true,
      origin: [
        `${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
        `${process.env.CLIENT_PROTOCOL}://localhost`,
      ],
    },
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
