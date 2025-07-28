import { Module } from '@nestjs/common';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  controllers: [VisitController],
  providers: [VisitService],
  imports: [
    ClientsModule.register([
      {
        name: 'VISIT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'visit', 
          protoPath: join(__dirname, '../../../proto/visit.proto'),
          url: process.env.VISIT_GRPC_URL,
        },
      },
      {
        name: 'PATIENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(__dirname, '../../../proto/patient.proto'),
          url: process.env.PATIENT_GRPC_URL,
        },
      },
    ]),
  ],
})
export class VisitModule {}
