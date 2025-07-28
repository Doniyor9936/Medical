import {  Controller, Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller()
export class NoteGrpcController {
  constructor(private readonly noteService: NoteService) {}

  @GrpcMethod('NoteService', 'CreateNote')
  createNote(dto:CreateNoteDto) {
    return this.noteService.create(dto);
  }

  @GrpcMethod('NoteService', 'GetNotesByVisit')
  getNotesByVisit(data: { visit_id: string }) {
    return this.noteService.findByVisitId(data.visit_id);
  }

  @GrpcMethod('NoteService', 'GetNote')
  getNote(data: { id: string }) {
    return this.noteService.findOne(data.id);
  }

  @GrpcMethod('NoteService', 'UpdateNote')
  updateNote(dto:UpdateNoteDto) {
    return this.noteService.update(dto.id, dto);
  }

  @GrpcMethod('NoteService', 'DeleteNote')
  deleteNote(data: { id: string }) {
    return this.noteService.remove(data.id);
  }
}
