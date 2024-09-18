import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from '../types/users';

@Injectable()
export class UserDAO {
  users: User[] = [];

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return 'La nota no se encontro!';
    }
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  async findOneByName(name: string): Promise<any> {
    return this.users.find((user) => user.name === name);
  }

  async save({
    name,
    password,
  }: {
    name: string;
    password: string;
  }): Promise<User> {
    // se encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: v4(),
      name,
      password: hashedPassword,
    };
    console.log('se creo un nuevo usuario');
    this.users.push(newUser);

    return newUser;
  }
}
