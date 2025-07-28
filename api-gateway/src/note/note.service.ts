import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteServiceGrpc } from './interface/note.interface';
import { VisitServiceGrpc } from 'src/visit/interface/visit.interface';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class NoteService implements OnModuleInit {
  private noteService: NoteServiceGrpc;
  private visitService: VisitServiceGrpc;
  constructor(
    @Inject('NOTE_PACKAGE') private readonly noteClient: ClientGrpc,
    @Inject('VISIT_PACKAGE') private readonly visitClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.noteService = this.noteClient.getService<NoteServiceGrpc>('NoteService');
    this.visitService = this.visitClient.getService<VisitServiceGrpc>('VisitService');
  }
  createNote(createNoteDto: CreateNoteDto) {
    return this.noteService.CreateNote(createNoteDto);
  }

  getNoteByVisit(visit_id: string) {
    return this.noteService.GetNotesByVisit({ visit_id });
  }

  getNote(id: string) {
    return this.noteService.GetNote({ id });
  }

  updateNote(updateNoteDto: UpdateNoteDto) {
    return this.noteService.UpdateNote(updateNoteDto);
  }

  remove(id: string) {
    return this.noteService.DeleteNote({ id });
  }
}
