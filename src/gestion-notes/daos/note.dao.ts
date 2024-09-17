import { Note } from '../types/notes';
import { v4 } from 'uuid';

export class NoteDAO {
  private notes = [];

  findOne(id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      return 'La nota no se encontro!';
    }
    return note;
  }

  findAll(createdAt?: string): Note[] {
    this.notes.slice();
    if (createdAt) {
      this.notes = this.notes.filter((note) => note.createdAt === createdAt);
    }
    return this.notes;
  }

  save({ content, createdAt, importance }: Note) {
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
