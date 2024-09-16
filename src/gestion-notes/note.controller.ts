import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { NoteService } from './note.service';
import { NoteDto } from './note.dto';
import { Note } from './types/notes';

@Controller('note')
export class NoteConroller {
  constructor(private readonly noteService: NoteService) {}

  @Get()
  getAll(@Query('createdAt') createdAt?: string) {
    return this.noteService.getAll(createdAt);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.noteService.getOne(id);
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
