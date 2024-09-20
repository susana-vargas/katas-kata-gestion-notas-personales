import { Injectable } from '@nestjs/common';

import { Note } from '../types/notes';
import { NoteDAO } from '../daos/note.dao';
import { NoteEntity } from '../typeorm/entities/note.entity';
import { NoteStrategy } from '../strategys/note.strategy';
import { SearchDto } from '../dtos/search.dto';

export type CreateParams = {
  content: string;
  createdAt: string;
  importance: number;
};

@Injectable()
export class NoteService {
  constructor(
    private readonly noteStrategy: NoteStrategy,
    private readonly noteDAO: NoteDAO,
  ) {}

  organizeNotes(notes: Note[]): Note[] {
    return this.noteStrategy.organize(notes);
  }

  async getAll(
    searchDto?: SearchDto,
    createdAt?: string,
  ): Promise<{ data: NoteEntity[]; totalItems: number; totalPages: number }> {
    return this.noteDAO.findAll(searchDto, createdAt);
  }

  getOne(id: string): Promise<NoteEntity> {
    return this.noteDAO.findOne(id);
  }

  create({ content, createdAt, importance }: CreateParams) {
    const newNote = {
      content,
      createdAt,
      importance,
    };

    return this.noteDAO.save(newNote);
  }

  async delete(id: string): Promise<void> {
    return this.noteDAO.delete(id);
  }

  addUserToNote(noteId: string, userId: string): Promise<void> {
    return this.noteDAO.create(noteId, userId);
  }
}
