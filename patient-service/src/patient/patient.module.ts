import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientGrpcController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Patient])],
  controllers: [PatientGrpcController],
  providers: [PatientService],
  exports:[TypeOrmModule]
})
export class PatientModule {}
