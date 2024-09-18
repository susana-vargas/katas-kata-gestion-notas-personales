import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { Note } from './types/notes';
import { NoteDTO } from './dtos/note.dto';
import { NoteEntity } from './typeorm/entities/note.entity';
import { NoteService } from './services/note.service';
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
  async getById(@Param('id') id: string): Promise<NoteEntity> {
    return await this.noteService.getOne(id);
  }

  @Get('organized')
  async getOrganizedNotes(): Promise<Note[]> {
    const notes = await this.noteService.getAll();

    return this.noteService.organizeNotes(notes);
  }

  @Post()
  create(@Body() { content, createdAt, importance }: NoteDTO) {
    this.noteService.create({ content, createdAt, importance });

    return {
      message: `Nota creada correctamente`,
    };
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.noteService.delete(id);

    return {
      message: `Nota con id ${id} fue eliminada correctamente`,
    };
  }
}
