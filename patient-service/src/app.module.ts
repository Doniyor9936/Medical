import { Module } from '@nestjs/common';

import { PatientModule } from './patient/patient.module';
import { ConfigModule } from '@nestjs/config';
import { Patient } from './patient/entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientGrpcController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Patient],
      synchronize: false,
    }),
    PatientModule,
  ],
  controllers: [PatientGrpcController],
  providers: [PatientService],
})
export class AppModule {}
