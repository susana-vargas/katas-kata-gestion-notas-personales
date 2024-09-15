import { Body, Controller, Get, Post } from '@nestjs/common';

import { NoteService } from './note.service';
import { NoteDto } from './note.dto';
import { Note } from './types/notes';

@Controller('note')
export class NoteConroller {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getAll() {
    return this.noteService.getAll();
  }

  @Get('organized')
  getOrganizedNotes(): Note[] {
    return this.noteService.organizeNotes(this.noteService.getAll());
  }

  @Post()
  create(@Body() { id, content, createdAt, importance }: NoteDto) {
    return this.noteService.create({ id, content, createdAt, importance });
  }
}
