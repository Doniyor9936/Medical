import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitDto } from './create-visit.dto';
import { IsString, IsUUID } from 'class-validator';

export class UpdateVisitDto extends PartialType(CreateVisitDto) {
    @IsUUID()
    @IsString()
    id: string;
}
