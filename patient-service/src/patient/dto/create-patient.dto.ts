import { IsString, IsUUID, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Ali Valiyev' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1995-06-12' })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({ example: 'a9d5f37e-9a23-4a56-8c4a-6fd123e8901a' })
  @IsUUID()
  @IsNotEmpty()
  doctor_id: string;
}
