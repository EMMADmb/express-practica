import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; 
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Productos')
    .setDescription('Una API de ejemplo para la gestión de productos.')
    .setVersion('1.0')
    .addTag('productos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // La URL para la documentación será /api-docs

  await app.listen(3001);
}
bootstrap();