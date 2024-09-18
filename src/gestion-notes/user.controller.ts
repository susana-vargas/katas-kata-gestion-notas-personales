import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { User } from './types/users';
import { UserDTO } from './dtos/user.dto';
import { UserService } from './services/user.service';

type UserRegisterResponse = {
  message: string;
  userId: string;
};

@Controller('users')
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

  @Post('register')
  async register(
    @Body() { name, password }: UserDTO,
  ): Promise<UserRegisterResponse> {
    const newUser = await this.userService.create({ name, password });
    return {
      message: 'Usuario creado exitosamente',
      userId: newUser.id,
    };
  }
}
