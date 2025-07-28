import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();


const GRPC_PORT = process.env.GRPC_PORT || 50061
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'admin',
      protoPath: join(process.cwd(), '../proto/admin.proto'),

      url: `0.0.0.0:${process.env.GRPC_PORT}`,
    },
  });

  await app.listen();
  console.log(`admin service run:${GRPC_PORT}`);
  
}
bootstrap();
