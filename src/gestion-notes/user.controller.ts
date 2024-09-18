import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { UserDTO } from './dtos/user.dto';
import { UserEntity } from './typeorm/entities/user.entity';
import { UserService } from './services/user.service';

type UserRegisterResponse = {
  message: string;
  userId: string;
};

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<UserEntity[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserEntity> {
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

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    await this.userService.delete(id);
    return {
      message: `Nota con id ${id} fue eliminada correctamente`,
    };
  }
}
