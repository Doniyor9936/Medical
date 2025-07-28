import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Doctors')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Yangi shifokor yaratish' })
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({ status: 201, description: 'Shifokor muvaffaqiyatli yaratildi' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.createDoctor(createDoctorDto);
  }

  @Get('/getAll')
  @ApiOperation({ summary: 'Barcha shifokorlarni olish' })
  @ApiResponse({ status: 200, description: 'Shifokorlar ro‘yxati' })
  findAll() {
    return this.doctorService.getAllDoctors();
  }

  @Get('/getOne/:id')
  @ApiOperation({ summary: 'Bitta shifokorni olish' })
  @ApiParam({ name: 'id', type: String, description: 'Shifokor IDsi' })
  @ApiResponse({ status: 200, description: 'Topilgan shifokor ma’lumotlari' })
  findOne(@Param('id') id: string) {
    return this.doctorService.findDoctor(id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Shifokorni yangilash' })
  @ApiParam({ name: 'id', type: String, description: 'Shifokor IDsi' })
  @ApiBody({ type: UpdateDoctorDto })
  @ApiResponse({ status: 200, description: 'Shifokor muvaffaqiyatli yangilandi' })
  update(@Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.updateDoctor(updateDoctorDto);
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Shifokorni o‘chirish' })
  @ApiParam({ name: 'id', type: String, description: 'Shifokor IDsi' })
  @ApiResponse({ status: 200, description: 'Shifokor muvaffaqiyatli o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.doctorService.removeDoctor(id);
  }
}
