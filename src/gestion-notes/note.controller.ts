import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { NoteService } from './services/note.service';
import { NoteDTO } from './dtos/note.dto';
// import { Note } from './types/notes';
import { NotificationService } from './notify/services/notification-service';

@Controller('note')
export class NoteConroller {
  constructor(
    private readonly noteService: NoteService,
    private readonly notificationService: NotificationService,
  ) {}

  @Get()
  getAll(@Query('createdAt') createdAt?: string) {
    return this.noteService.getAll(createdAt);
  }

  @Get('notify')
  sendNotification() {
    return this.notificationService.execute();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.noteService.getOne(id);
  }

  // @Get('organized')
  // getOrganizedNotes(): Note[] {
  //   return this.noteService.organizeNotes(this.noteService.getAll());
  // }

  @Post()
  create(@Body() { content, createdAt, importance }: NoteDTO) {
    return this.noteService.create({ content, createdAt, importance });
  }
}
