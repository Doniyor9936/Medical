import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'admin',
          protoPath: join(__dirname, '../../../proto/admin.proto'),
          url: process.env.ADMIN_GRPC_URL,
        },
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
