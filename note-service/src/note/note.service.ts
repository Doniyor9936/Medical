import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NoteService {
  constructor(@InjectRepository(Note) private readonly noteRepo: Repository<Note>) {}
  async create(createNoteDto: CreateNoteDto): Promise<{ message: string; note: Note }> {
    try {
      const findNode = await this.noteRepo.findOne({
        where: { visit_id: createNoteDto.visit_id },
      });
      if (findNode) {
        throw new ConflictException('Ushbu tashrif uchun tashxis allaqachon mavjud');
      }
      const note = this.noteRepo.create(createNoteDto);
      return { message: 'tashrif uchun note yozildi', note: note };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }
  async findByVisitId(visit_id: string): Promise<{ message: string; note: Note[] }> {
    try {
      const nodes = await this.noteRepo.find({ where: { visit_id } });
      if (nodes.length === 0) {
        throw new NotFoundException('tashrifdagi tashxis topilmadi');
      }
      return { message: 'tashrif uchun tashxislar', note: nodes };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async findOne(id: string): Promise<{ message: string; note: Note }> {
    try {
      const findNode = await this.noteRepo.findOneBy({ id });
      if (!findNode) {
        throw new NotFoundException('qidirilgan tashxis topilmadi ');
      }
      return { message: 'qidirilgan tashxis', note: findNode };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('');
    }
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<{ message: string }> {
    try {
      const findNode = await this.noteRepo.findOneBy({ id });
      if (!findNode) {
        throw new NotFoundException('yangilanayotgan tashxis topilmadi');
      }
      await this.noteRepo.update(id, updateNoteDto);
      return { message: 'tashxis muaffaqiyatli yangilandi' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('server error');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const findNode = this.noteRepo.findOneBy({ id });
      if (!findNode) {
        throw new NotFoundException("o'chirilishi kerak bolgan tashxis topilmadi");
      }
      return { message: "tashxis muaffaqiyatli o'chrildi" };
    } catch (error) {
      if (error instanceof NotFoundException) {
      }
      throw new InternalServerErrorException('server error');
    }
  }
}
