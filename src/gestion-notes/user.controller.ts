import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from './types/users';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './services/user.service';
import { UserDAO } from './daos/user.dao';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userDAO: UserDAO,
  ) {}

  @Get()
  getAll(): User[] {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.getOne(id);
  }

  @Post()
  create(@Body() { name, password }: UserDTO) {
    return this.userService.create({ name, password });
  }

  @Post('register')
  async register(@Body() user: User) {
    const newUser = await this.userDAO.save(user);
    return {
      message: 'Usuario creado exitosamente',
      userId: newUser.id,
    };
  }
}
