import { IsUUID, IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Tashrif ID raqami (visit_id)',
    example: 'f4a7c1e8-9e19-4e1a-9f7e-9d3d77f5d7e7',
  })
  @IsUUID()
  @IsNotEmpty({ message: 'Tashrif ID bo‘sh bo‘lmasligi kerak' })
  visit_id: string;

  @ApiProperty({
    description: 'Eslatma matni',
    example: 'Bemor yengil isitma bilan kelgan. 3 kun dam olish tavsiya etildi.',
    minLength: 5,
    maxLength: 1000,
  })
  @IsString({ message: 'Matn satr (string) ko‘rinishida bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Matn bo‘sh bo‘lmasligi kerak' })
  @Length(5, 1000, { message: 'Matn uzunligi 5 dan 1000 belgigacha bo‘lishi kerak' })
  text: string;
}
