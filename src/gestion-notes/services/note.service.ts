import { Injectable } from '@nestjs/common';

import { Note } from '../types/notes';
import { NoteDAO } from '../daos/note.dao';
import { NoteStrategy } from '../strategys/note.strategy';

type CreateParams = {
  id: string;
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

  getAll(createdAt?: string): Note[] {
    return this.noteDAO.findAll(createdAt);
  }

  getOne(id: string) {
    return this.noteDAO.findOne(id);
  }

  create({ id, content, createdAt, importance }: CreateParams) {
    return this.noteDAO.save({ id, content, createdAt, importance });
  }
}
