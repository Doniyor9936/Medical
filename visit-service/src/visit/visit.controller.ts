import { Controller, Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { VisitService } from './visit.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';

@Controller()
export class VisitGrpcController {
  constructor(private readonly visitService: VisitService) {}

  @GrpcMethod('VisitService', 'CreateVisit')
  create(dto: CreateVisitDto) {
    return this.visitService.create(dto);
  }

  @GrpcMethod('VisitService', 'GetAllVisits')
  findAllVisit(_: {}) {
    return this.visitService.findAll();
  }

  @GrpcMethod('VisitService', 'GetVisit')
  findOne(dto: { id: string }) {
    return this.visitService.findOne(dto.id);
  }

  @GrpcMethod('VisitService', 'UpdateVisit')
  update(dto: UpdateVisitDto & { id: string }) {
    return this.visitService.update(dto.id, dto);
  }

  @GrpcMethod('VisitService', 'DeleteVisit')
  remove(dto: { id: string }) {
    return this.visitService.remove(dto.id);
  }
}
