import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { NoteModule } from './note/note.module';
import { VisitModule } from './visit/visit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ClientsModule.register([
      {
        name: 'ADMIN_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'admin',
          protoPath: join(__dirname, '../../proto/admin.proto'),
          url: process.env.ADMIN_GRPC_URL, 
        },
      },
      {
        name: 'DOCTOR_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'doctor',
          protoPath: join(__dirname, '../../proto/doctor.proto'),
          url: process.env.DOCTOR_GRPC_URL, 
        },
      },
      {
        name: 'PATIENT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'patient',
          protoPath: join(__dirname, '../../proto/patient.proto'),
          url: process.env.PATIENT_GRPC_URL, 
        },
      },
      {
        name: 'VISIT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'visit', 
          protoPath: join(__dirname, '../../proto/visit.proto'),
          url: process.env.VISIT_GRPC_URL,
        },
      },
      {
        name: 'NOTE_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'note',
          protoPath: join(__dirname, '../../proto/note.proto'),
          url: process.env.NOTE_GRPC_URL,
        },
      },
    ]),
    AdminModule,
    DoctorModule,
    PatientModule,
    NoteModule,
    VisitModule,
  ],
})
export class AppModule {}
