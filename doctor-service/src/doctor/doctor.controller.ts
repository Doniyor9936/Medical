import { Controller, Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DoctorService } from './doctor.service';
import { error } from 'node:console';

@Controller()
export class DoctorGrpcController {
  constructor(private readonly doctorService: DoctorService) {}

  @GrpcMethod('DoctorService', 'CreateDoctor')
  createDoctor(dto: { name: string; email: string }) {
    return this.doctorService.create(dto); 
  }

  @GrpcMethod('DoctorService', 'GetAllDoctors')
  getAllDoctors(_: any) {
    return this.doctorService.findAll();
  }

  @GrpcMethod('DoctorService', 'FindDoctor')
  findDoctor(dto: { id: string }) {
    return this.doctorService.findOne(dto.id);
  }

  @GrpcMethod('DoctorService', 'UpdateDoctor')
  updateDoctor(dto: { id: string; name: string; email: string }) {
    return this.doctorService.update(dto.id, dto);
  }

  @GrpcMethod('DoctorService', 'DeleteDoctor')
  deleteDoctor(dto: { id: string }) {
    return this.doctorService.remove(dto.id);
  }
}
