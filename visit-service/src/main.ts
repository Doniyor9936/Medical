import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

const GRPC_PORT = process.env.GRPC_PORT || 50066;
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'visit',
        protoPath: join(process.cwd(), '../proto/visit.proto'),

        url: `0.0.0.0:${process.env.GRPC_PORT}`,
      },
    },
  );

  await app.listen();
  console.log(`visit microservice run http://localhost:${GRPC_PORT}`);
}
bootstrap();
