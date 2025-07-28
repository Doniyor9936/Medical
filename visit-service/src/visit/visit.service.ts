import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './entities/visit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VisitService {
  constructor(@Inject(Visit) private readonly visitRepo: Repository<Visit>) {}
  async create(createVisitDto: CreateVisitDto): Promise<{ message: string; visit: Visit }> {
    try {
      const visitFind = await this.visitRepo.findOne({
        where: { patient_id: createVisitDto.patient_id },
      });
      if (visitFind) {
        throw new ConflictException('bemorga tashrif allaqachon qoshilgan');
      }
      const visit = await this.visitRepo.create(createVisitDto);
      return { message: "bemor uchun tashrif qo'shildi", visit: visit };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async findAll(): Promise<{ message: string; visit: Visit[] }> {
    try {
      const visitFind = await this.visitRepo.find();
      if (visitFind.length === 0) {
        throw new NotFoundException('tashriflar hali mavjud emas');
      }
      return { message: 'hamma tashriflar', visit: visitFind };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async findOne(id: string): Promise<{ message: string; visit: Visit }> {
    try {
      const visitFind = await this.visitRepo.findOneBy({ id });
      if (!visitFind) {
        throw new NotFoundException('tashrif buyurganlar yo`q');
      }
      return { message: 'qidirilgan tashrif', visit: visitFind };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async update(id: string, updateVisitDto: UpdateVisitDto): Promise<{ message: string }> {
    try {
      const visitFind = await this.visitRepo.findOneBy({ id });
      if (!visitFind) {
        throw new NotFoundException('yangilanishi kerak bolgan tashrif topilmadi');
      }
      await this.visitRepo.update({ id }, updateVisitDto);
      return { message: 'tashrif muaffaqiyatli yangilandi' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const visitFind = await this.visitRepo.findOneBy({ id });
      if (!visitFind) {
        throw new NotFoundException("o'chirilishi kerak bo'lgan tashrif topilmadi");
      }
      await this.visitRepo.remove(visitFind);
      return { message: "tashrif muaffaqiyatli o'chirildi" };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
}
