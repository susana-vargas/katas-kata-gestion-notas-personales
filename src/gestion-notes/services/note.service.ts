import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { NoteStrategy } from './note.strategy';
import { Note } from './types/notes';

type CreateParams = {
  id: string;
  content: string;
  createdAt: string;
  importance: number;
};

@Injectable()
export class NoteService {
  private notes = [];

  constructor(private readonly noteStrategy: NoteStrategy) {}

  organizeNotes(notes: Note[]): Note[] {
    return this.noteStrategy.organize(notes);
  }

  getAll(createdAt?: string): Note[] {
    this.notes.slice();
    if (createdAt) {
      this.notes = this.notes.filter((note) => note.createdAt === createdAt);
    }
    return this.notes;
  }

  getOne(id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      return 'La nota no se encontro!';
    }
    return note;
  }

  create({ content, createdAt, importance }: CreateParams) {
    const newNote = {
      id: v4(),
      content,
      createdAt,
      importance,
    };
    console.log('en el servicio');
    this.notes.push(newNote);
    return 'se creo una nota';
  }
}
