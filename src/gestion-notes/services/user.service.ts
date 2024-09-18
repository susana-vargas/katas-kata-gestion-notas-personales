import { Injectable } from '@nestjs/common';

import { User } from '../types/users';
import { UserDAO } from '../daos/user.dao';

type CreateParams = {
  name: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(private readonly userDAO: UserDAO) {}

  getAll(): User[] {
    return this.userDAO.findAll();
  }

  async getOne(id: string): Promise<User | string> {
    return this.userDAO.findOne(id);
  }

  create({ name, password }: CreateParams) {
    return this.userDAO.save({ name, password });
  }
}
