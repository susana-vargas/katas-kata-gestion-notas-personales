import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import { AddUserNoteDTO } from './dtos/add-user-note.dto';
import { Note } from './types/notes';
import { NoteDTO } from './dtos/note.dto';
import { NoteEntity } from './typeorm/entities/note.entity';
import { NoteService } from './services/note.service';
import { NotificationService } from './notify/services/notification-service';
import { SearchDto } from './dtos/search.dto';

@Controller('notes')
export class NoteConroller {
  constructor(
    private readonly noteService: NoteService,
    private readonly notificationService: NotificationService,
  ) {}

  // @Get()
  // getAll(
  //   @Query('createdAt') createdAt?: string,
  //   @Query() { limit, page, where }: SearchDto,
  // ) {
  //   return this.noteService.getAll(createdAt);
  // }
  @Get()
  async getAll(
    @Query() searchDto: SearchDto, // Buscar por DTO
    @Query('createdAt') createdAt?: string,
  ) {
    return this.noteService.getAll(searchDto, createdAt);
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
    const { data } = await this.noteService.getAll();

    return this.noteService.organizeNotes(data);
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

  @Post(':noteId/users')
  addUser(@Body() { userId }: AddUserNoteDTO, @Param('noteId') noteId: string) {
    return this.noteService.addUserToNote(noteId, userId);
  }
}
