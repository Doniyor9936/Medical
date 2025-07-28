import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteGrpcController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NoteGrpcController],
  providers: [NoteService],
  exports:[TypeOrmModule]
})
export class NoteModule {}
