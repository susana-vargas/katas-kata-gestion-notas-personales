import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from './types/users';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
}
