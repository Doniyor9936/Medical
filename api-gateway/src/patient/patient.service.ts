import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PatientServiceGrpc } from './interface/patient.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { DoctorServiceGrpc } from 'src/doctor/interface/doctor.interface';

@Injectable()
export class PatientService implements OnModuleInit {
  private patientService: PatientServiceGrpc;
  private doctorService: DoctorServiceGrpc;
  constructor(
    @Inject('DOCTOR_PACKAGE') private readonly doctorClient: ClientGrpc,
    @Inject('PATIENT_PACKAGE') private readonly patientClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.patientService =
      this.patientClient.getService<PatientServiceGrpc>('PatientService');
    this.doctorService = this.doctorClient.getService<DoctorServiceGrpc>('DoctorService')
  }
  createPatient(createPatientDto: CreatePatientDto) {
    return this.patientService.CreatePatient(createPatientDto);
  }
  findPatient(id: string) {
    return this.patientService.FindPatient({ id });
  }
  findAllPatientByDoctor(doctor_id: string) {
    return this.patientService.FindAllPatientsByDoctor({ doctor_id });
  }

  updatePatient( updatePatientDto: UpdatePatientDto) {
    return this.patientService.UpdatePatient(updatePatientDto );
  }
  removePatient(id: string) {
    return this.patientService.RemovePatient({ id });
  }
}
