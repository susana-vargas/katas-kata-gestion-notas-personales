import { Module } from '@nestjs/common';

import { NoteConroller } from './note.controller';
import { NoteService } from './note.service';
import { NoteStrategy } from './note.strategy';

@Module({
  controllers: [NoteConroller],
  providers: [NoteStrategy, NoteService],
})
export class NoteModule {}
