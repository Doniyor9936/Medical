import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Notes')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Yangi note yaratish' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, description: 'Note muvaffaqiyatli yaratildi' })
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.createNote(createNoteDto);
  }

  @Get('/by-visit/:visit_id')
  @ApiOperation({ summary: 'Visit ID bo‘yicha barcha note’larni olish' })
  @ApiParam({ name: 'visit_id', type: String, description: 'Visit ID' })
  @ApiResponse({ status: 200, description: 'Note’lar ro‘yxati' })
  getNotesByVisit(@Param('visit_id') visit_id: string) {
    return this.noteService.getNoteByVisit(visit_id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Bitta note olish' })
  @ApiParam({ name: 'id', type: String, description: 'Note ID' })
  @ApiResponse({ status: 200, description: 'Note topildi' })
  getNote(@Param('id') id: string) {
    return this.noteService.getNote(id);
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: 'Note yangilash' })
  @ApiParam({ name: 'id', type: String, description: 'Note ID' })
  @ApiBody({ type: UpdateNoteDto })
  @ApiResponse({ status: 200, description: 'Note muvaffaqiyatli yangilandi' })
  updateNote(@Body() dto: UpdateNoteDto) {
    return this.noteService.updateNote({ ...dto });
  }

  @Delete('/delete/:id')
  @ApiOperation({ summary: 'Note o‘chirish' })
  @ApiParam({ name: 'id', type: String, description: 'Note ID' })
  @ApiResponse({ status: 200, description: 'Note o‘chirildi' })
  deleteNote(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
