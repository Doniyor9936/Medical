import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsUUID } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsUUID()
  id: string;
}
