import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://erikalira-symmetrical-xylophone-4gw7vpv6jwvcj94g-3000.preview.app.github.dev',
      'https://amzeriddle.netlify.app',
      'https://riddle-game-frontend.darth-ahsoka.repl.co',
      'https://darth-ahsoka-turbo-bassoon-gp6r6j49wrwf9766-3000.preview.app.github.dev'
    ],
    allowedHeaders: 'Access-Control-Allow-Origin, Accept, Content-type, Authorization',
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
