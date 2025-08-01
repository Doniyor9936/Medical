import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
    @IsUUID()
    @IsString()
    id: string;
}
