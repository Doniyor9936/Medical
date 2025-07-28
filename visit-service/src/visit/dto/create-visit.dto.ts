import { IsUUID, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVisitDto {
  @ApiProperty({ example: 'aabbccdd-1234-5678-90ab-cdef12345678' })
  @IsUUID()
  @IsNotEmpty()
  patient_id: string;

  @ApiProperty({ example: '2025-07-25T10:30:00Z' })
  @IsDateString()
  @IsNotEmpty()
  visit_date: Date;
}
