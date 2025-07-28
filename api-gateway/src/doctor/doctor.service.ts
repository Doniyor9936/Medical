import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { DoctorServiceGrpc } from './interface/doctor.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService implements OnModuleInit {
  private doctorService: DoctorServiceGrpc;
  constructor(@Inject('DOCTOR_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.doctorService =
      this.client.getService<DoctorServiceGrpc>('DoctorService');
  }
  createDoctor(createDoctorDto: CreateDoctorDto) {
    return this.doctorService.CreateDoctor(createDoctorDto);
  }
  findDoctor(id: string) {
    return this.doctorService.FindDoctor({ id });
  }
  getAllDoctors() {
    return this.doctorService.GetAllDoctors({});
  }
  updateDoctor(updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.UpdateDoctor(updateDoctorDto);
  }
  removeDoctor(id: string) {
    return this.doctorService.DeleteDoctor({ id });
  }
}
