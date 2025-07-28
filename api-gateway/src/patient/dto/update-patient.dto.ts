import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsUUID()
  id: string;
}
