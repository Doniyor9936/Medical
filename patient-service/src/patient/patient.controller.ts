import { Controller, Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller()
export class PatientGrpcController {
  constructor(private readonly patientService: PatientService) {}

  @GrpcMethod('PatientService', 'CreatePatient')
  createPatient(dto: CreatePatientDto) {
    return this.patientService.create(dto);
  }

  @GrpcMethod('PatientService', 'GetPatient')
  getPatient(data: { id: string }) {
    return this.patientService.findOne(data.id);
  }

  @GrpcMethod('PatientService', 'GetPatientsByDoctor')
  getPatientsByDoctor(data: { doctor_id: string }) {
    return this.patientService.findAllByDoctorId(data.doctor_id);
  }

  @GrpcMethod('PatientService', 'UpdatePatient')
  updatePatient(dto: UpdatePatientDto) {
    return this.patientService.update(dto.id, dto);
  }

  @GrpcMethod('PatientService', 'DeletePatient')
  deletePatient(data: { id: string }) {
    return this.patientService.remove(data.id);
  }
}
