import { Injectable } from '@nestjs/common';

import { UserDAO } from '../daos/user.dao';
import { UserEntity } from '../typeorm/entities/user.entity';

type CreateParams = {
  name: string;
  password: string;
};

@Injectable()
export class UserService {
  constructor(private readonly userDAO: UserDAO) {}

  async getAll(): Promise<UserEntity[]> {
    return this.userDAO.findAll();
  }

  getOne(id: string): Promise<UserEntity> {
    return this.userDAO.findOne(id);
  }

  create({ name, password }: CreateParams) {
    return this.userDAO.save({ name, password });
  }

  async delete(id: string): Promise<void> {
    return this.userDAO.delete(id);
  }
}
