import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { User } from '../types/users';

@Injectable()
export class UserDAO {
  private notes = [];

  findOne(id: string) {
    const note = this.notes.find((note) => note.id === id);
    if (!note) {
      return 'La nota no se encontro!';
    }
    return note;
  }

  findAll(): User[] {
    return this.notes;
  }

  save({ name, password }: User) {
    const newUser = {
      id: v4(),
      name,
      password,
    };
    console.log('en el servicio');
    this.notes.push(newUser);
    return 'se creo un nuevo usuario';
  }
}
