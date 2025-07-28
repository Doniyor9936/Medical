import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsUUID } from 'class-validator';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
    @IsUUID()
  id: string;
}
