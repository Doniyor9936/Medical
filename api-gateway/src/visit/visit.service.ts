import { Injectable, Inject, OnModuleInit, NotFoundException } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitServiceGrpc } from './interface/visit.interface';
import { PatientServiceGrpc } from 'src/patient/interface/patient.interface';

@Injectable()
export class VisitService implements OnModuleInit {
  private visitService: VisitServiceGrpc;
  private patientService: PatientServiceGrpc;

  constructor(
    @Inject('VISIT_PACKAGE') private readonly visitClient: ClientGrpc,
    @Inject('PATIENT_PACKAGE') private readonly patientClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.visitService = this.visitClient.getService<VisitServiceGrpc>('VisitService');
    this.patientService = this.patientClient.getService<PatientServiceGrpc>('PatientService');
  }

  async createVisit(createVisitDto: CreateVisitDto) {
    const patient = await this.patientService.FindPatient({ id: createVisitDto.patient_id }).catch(() => null);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return this.visitService.CreateVisit(createVisitDto);
  }

  getVisit(id: string) {
    return this.visitService.GetVisit({ id });
  }

  getAllVisits() {
    return this.visitService.GetAllVisits({});
  }

  updateVisit(id: string, updateVisitDto: UpdateVisitDto) {
    return this.visitService.UpdateVisit({ id, ...updateVisitDto });
  }

  deleteVisit(id: string) {
    return this.visitService.DeleteVisit({ id });
  }
}
