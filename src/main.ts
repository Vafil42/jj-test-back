import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Junior Job API')
    .setDescription('The API for Junior Job')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});

  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}

bootstrap();
