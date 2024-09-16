import { Note } from '../types/notes';

export class NoteStrategy {
  organize(note: Note[]): Note[] {
    return note.sort((a, b) => {
      //(más importante primero)
      return b.importance - a.importance;
    });
  }
}
