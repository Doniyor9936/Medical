import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';


const GRPC_PORT = process.env.GRPC_PORT || 50060;
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'note',
        protoPath: join(process.cwd(), '../proto/note.proto'),

        url: `0.0.0.0:${process.env.GRPC_PORT}`,
      },
    },
  );

  await app.listen();
  console.log(`note microservice run http://localhost:${GRPC_PORT}`);
}
bootstrap();
