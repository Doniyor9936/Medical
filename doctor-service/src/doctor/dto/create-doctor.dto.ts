import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({
    description: 'Shifokorning to‘liq ismi',
    example: 'Dr. Anvar Karimov',
    maxLength: 100,
  })
  @IsString({ message: 'Name faqat matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Name bo‘sh bo‘lishi mumkin emas' })
  @Length(2, 100, { message: 'Name uzunligi 2 dan 100 gacha bo‘lishi kerak' })
  name: string;

  @ApiProperty({
    description: 'Shifokorning email manzili',
    example: 'anvar.karimov@hospital.uz',
  })
  @IsString({ message: 'Email matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'Email bo‘sh bo‘lishi mumkin emas' })
  @IsEmail({}, { message: 'Email noto‘g‘ri formatda' })
  email: string;
}
