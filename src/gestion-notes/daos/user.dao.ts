import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from '../types/users';
import { UserEntity } from '../typeorm/entities/user.entity';

@Injectable()
export class UserDAO {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOne(id: string): Promise<Partial<UserEntity>> {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name'],
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ select: ['id', 'name'] });
  }

  async findOneByName(name: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { name: name },
    });
  }

  async save({
    name,
    password,
  }: {
    name: string;
    password: string;
  }): Promise<User> {
    // Se encripta la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear una instancia del usuario con la contraseña encriptada
    const newUser = this.userRepository.create({
      id: uuidv4(),
      name,
      password: hashedPassword,
    });
    // Guardar el usuario en la base de datos
    await this.userRepository.save(newUser);
    console.log('Se creó un nuevo usuario');

    return newUser;
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
