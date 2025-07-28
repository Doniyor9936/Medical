import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PATIENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(__dirname, '../../../proto/patient.proto'),
          url: process.env.PATIENT_GRPC_URL,
        },
      },
      {
        name: 'DOCTOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(__dirname, '../../../proto/doctor.proto'),
          url: process.env.DOCTOR_GRPC_URL,
        },
      },
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
