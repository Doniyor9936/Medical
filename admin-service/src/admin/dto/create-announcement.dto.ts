import {
  IsString,
  IsNotEmpty,
  Length,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum AnnouncementAudience {
  STAFF = 'staff',
  PATIENTS = 'patients',
  DOCTORS = 'doctors',
  ALL = 'all',
}

export enum AnnouncementPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  EMERGENCY = 'emergency',
}

export class CreateAnnouncementDto {
  @ApiProperty({
    description: 'Eʼlon sarlavhasi (tibbiy)',
    example: 'Zudlik bilan evakuatsiya',
    maxLength: 150,
  })
  @IsString()
  @IsNotEmpty()
  @Length(5, 150)
  title: string;

  @ApiProperty({
    description: 'Eʼlon matni',
    example:
      '3-qavatda yong‘in signalizatsiyasi ishga tushdi. Barcha xodimlar va bemorlar evakuatsiya qilinmoqda.',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 2000)
  content: string;

  @ApiPropertyOptional({
    description: 'Eʼlon kimlar uchun mo‘ljallangan',
    enum: AnnouncementAudience,
    example: AnnouncementAudience.ALL,
    default: AnnouncementAudience.ALL,
  })
  @IsOptional()
  @IsEnum(AnnouncementAudience)
  audience?: AnnouncementAudience = AnnouncementAudience.ALL;

  @ApiPropertyOptional({
    description: 'Eʼlonning ustuvorlik darajasi',
    enum: AnnouncementPriority,
    example: AnnouncementPriority.EMERGENCY,
    default: AnnouncementPriority.MEDIUM,
  })
  @IsOptional()
  @IsEnum(AnnouncementPriority)
  priority?: AnnouncementPriority = AnnouncementPriority.MEDIUM;

  @ApiPropertyOptional({
    description: 'Eʼlon amal qilish sanasi (ISO 8601 format)',
    example: '2025-07-25T14:00:00Z',
  })
  @IsOptional()
  @IsDateString({}, { message: 'validUntil ISO formatda bo‘lishi kerak' })
  validUntil?: string;
}
