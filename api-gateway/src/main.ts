import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001
  app.useLogger(new Logger)

  const config = new DocumentBuilder()
  .setTitle('Medical Microservice System')
  .setDescription('Doktor, bemor, tashrif va eslatmalar uchun API hujjat')
  .setVersion('1.0')
  .addTag('doctor')
  .addTag('patient')
  .addTag('visit')
  .addTag('note')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
  await app.listen(port,() => {
    console.log(`API Gateway is running on http://localhost:${port}`);
    
  });
}
bootstrap();
