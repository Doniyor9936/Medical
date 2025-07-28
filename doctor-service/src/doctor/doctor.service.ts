import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { GrpcMethod } from '@nestjs/microservices';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(Doctor) private readonly doctorRepo: Repository<Doctor>) {}
  async create(createDoctorDto: CreateDoctorDto): Promise<{ message: string; doctor: Doctor }> {
    try {
      const doctorFound = await this.doctorRepo.findOneBy({
        email: createDoctorDto.email,
      });
      if (doctorFound) {
        throw new ConflictException('doctor allaqachon mavjud');
      }
      const doctor = this.doctorRepo.create(createDoctorDto);
      const savedDoctor = await this.doctorRepo.save(doctor);
      return { message: 'doctor yaratildi', doctor: savedDoctor };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async findAll(): Promise<{ message: string; doctor: Doctor[] }> {
    try {
      const doctorFound = await this.doctorRepo.find();
      if (doctorFound.length == 0) {
        throw new NotFoundException('doctor topilmadi');
      }
      return { message: 'hamma doctorlar', doctor: doctorFound };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async findOne(id: string): Promise<{ message: string; doctor: Doctor }> {
    try {
      const doctorFound = await this.doctorRepo.findOneBy({ id });
      if (!doctorFound) {
        throw new NotFoundException('doctor topilmadi');
      }
      return { message: 'qidirilgan doctor', doctor: doctorFound };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto): Promise<{ message: string }> {
    try {
      const doctorFound = await this.doctorRepo.findOneBy({ id });
      if (!doctorFound) {
        throw new NotFoundException('doctor topilmadi');
      }
      await this.doctorRepo.update(id, updateDoctorDto);
      return { message: 'doctor muavfaqiyatli yangilandi' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const doctorFound = await this.doctorRepo.findOneBy({ id });
      if (!doctorFound) {
        throw new NotFoundException('doctor topilmadi');
      }
      await this.doctorRepo.remove(doctorFound);
      return { message: 'doctor mauffaqiyatli o`chirildi' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
}
