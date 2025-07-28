import { IsString, IsNotEmpty, Length, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MedicalCategory {
  CARDIOLOGY = 'Cardiology',
  NEUROLOGY = 'Neurology',
  ONCOLOGY = 'Oncology',
  GENERAL = 'General',
  PEDIATRICS = 'Pediatrics',
}

export class CreateNewsDto {
  @ApiProperty({
    description: 'Medical yangilik sarlavhasi',
    example: 'Yurak xastaligi bo‘yicha yangi davolash usuli topildi',
    maxLength: 150,
  })
  @IsString({ message: 'Title matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Title bo‘sh bo‘lmasligi kerak' })
  @Length(5, 150, { message: 'Title uzunligi 5 dan 150 gacha bo‘lishi kerak' })
  title: string;

  @ApiProperty({
    description: 'Yangilik kontenti (maqola matni)',
    example: 'Yangi tadqiqotlarga ko‘ra, yurak yetishmovchiligi bemorlari uchun...',
  })
  @IsString()
  @IsNotEmpty()
  @Length(10, 5000)
  content: string;

  @ApiPropertyOptional({
    description: 'Yangilik manbasi yoki muallifi',
    example: 'Dr. Jasur Rahimov',
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  author?: string;

  @ApiPropertyOptional({
    description: 'Medical kategoriya',
    enum: MedicalCategory,
    example: MedicalCategory.CARDIOLOGY,
  })
  @IsOptional()
  @IsEnum(MedicalCategory, { message: 'Kategoriya noto‘g‘ri. Faqat belgilanganlardan foydalaning.' })
  category?: MedicalCategory;

  @ApiPropertyOptional({
    description: 'Yangilik eʼlon qilingan sana (ISO 8601 format)',
    example: '2025-07-24T10:30:00Z',
  })
  @IsOptional()
  @IsDateString({}, { message: 'publishDate ISO formatda bo‘lishi kerak (YYYY-MM-DDTHH:mm:ssZ)' })
  publishDate?: string;
}
