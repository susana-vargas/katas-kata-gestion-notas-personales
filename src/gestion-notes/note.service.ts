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
  notes = [];

  constructor(private readonly noteStrategy: NoteStrategy) {}

  organizeNotes(notes: Note[]): Note[] {
    return this.noteStrategy.organize(notes);
  }

  getAll() {
    return this.notes;
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
