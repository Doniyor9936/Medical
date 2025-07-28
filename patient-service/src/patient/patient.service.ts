import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    try {
      const patientFind = await this.patientRepository.findOne({ where: { doctor_id: createPatientDto.doctor_id } });
      if (patientFind) {
        throw new ConflictException('bemor allachon mavjud');
      }
      const patient = this.patientRepository.create(createPatientDto);
      return this.patientRepository.save(patient);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async findAllByDoctorId(doctor_id: string): Promise<Patient[]> {
    try {
      const patient = await this.patientRepository.find({
        where: { doctor_id },
      });
      if (patient.length === 0) {
        throw new NotFoundException('Doctorda bemorlar mavjud emas');
      }
      return patient;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
  async findOne(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException('bemor topilmadi');
    }
    return patient;
  }
  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<{ message: string }> {
    try {
      const patient = await this.patientRepository.findOneBy({ id });
      if (!patient) {
        throw new NotFoundException('bemor topilmadi');
      }
      await this.patientRepository.update({ id }, updatePatientDto);
      return { message: 'succes update' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const patient = await this.patientRepository.findOneBy({ id });
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    await this.patientRepository.remove(patient);
    return { message: 'succes delete' };
  }
}
