import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Patients')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Yangi bemor yaratish' })
  @ApiBody({ type: CreatePatientDto })
  @ApiResponse({ status: 201, description: 'Bemor yaratildi' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.createPatient(createPatientDto);
  }

  @Get('/getDoctor/:doctor_id')
  @ApiOperation({ summary: 'Shifokorga tegishli bemorlarni olish' })
  @ApiParam({ name: 'doctor_id', type: String })
  @ApiResponse({ status: 200, description: 'Bemorlar ro‘yxati' })
  findAllPatientByDoctor(@Param('doctor_id') doctor_id: string) {
    return this.patientService.findAllPatientByDoctor(doctor_id);
  }

  @Get('/getOne/:id')
  @ApiOperation({ summary: 'Bitta bemorni olish' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Bemor topildi' })
  findPatient(@Param('id') id: string) {
    return this.patientService.findPatient(id);
  }

  @Patch('/edit/:id')
  @ApiOperation({ summary: 'Bemorni yangilash' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdatePatientDto })
  @ApiResponse({ status: 200, description: 'Bemor yangilandi' })
  updatePtient(@Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.updatePatient(updatePatientDto)
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Bemorni o‘chirish' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Bemor o‘chirildi' })
  removePatient(@Param('id') id: string) {
    return this.patientService.removePatient(id);
  }
}
