import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
   imports: [
      ClientsModule.register([
        {
          name: 'NOTE_PACKAGE',
          transport: Transport.GRPC,
          options: {
            package: 'note',
            protoPath: join(__dirname, '../../../proto/note.proto'),
            url: process.env.NOTE_GRPC_URL,
          },
        },
        {
          name: 'VISIT_PACKAGE',
          transport: Transport.GRPC,
          options: {
            package: 'visit',
            protoPath: join(__dirname, '../../../proto/visit.proto'),
            url: process.env.VISIT_GRPC_URL,
          },
        },
      ]),
    ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
