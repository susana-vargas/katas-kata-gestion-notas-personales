import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { NoteEntity } from '../typeorm/entities/note.entity';
import { NoteRepository } from '../repositorys/note.repository';
import { CreateParams } from '../services/note.service';
import { UserEntity } from '../typeorm/entities/user.entity';

@Injectable()
export class NoteDAO {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(NoteEntity)
    private readonly noteRepository: Repository<NoteEntity>,
  ) {}

  async findOne(id: string): Promise<NoteEntity> {
    return this.noteRepository.findOne({ where: { id } });
  }

  async findAll(createdAt?: string): Promise<NoteEntity[]> {
    if (createdAt) {
      // Si pasan una fecha de creación, filtra las notas con esa fecha
      return await this.noteRepository.find({
        where: { createdAt },
        relations: ['user'],
        select: {
          user: {
            id: true,
            name: true,
          },
        },
      });
    } else {
      return await this.noteRepository.find({
        relations: ['user'], // cargar la relación con el usuario
        select: {
          user: {
            id: true,
            name: true,
          },
        },
      });
    }
  }

  async save({
    content,
    createdAt,
    importance,
  }: CreateParams): Promise<NoteEntity> {
    const note = new NoteRepository(
      this.generateId(),
      content,
      createdAt,
      importance,
    );
    const entity = new NoteEntity();
    entity.id = note.getId();
    entity.content = note.getContent();
    entity.createdAt = note.getCreatedAt();
    entity.importance = note.getImportance();
    await this.noteRepository.save(entity);

    return void 0;
  }

  private generateId(): string {
    return uuidv4();
  }

  async delete(id: string): Promise<void> {
    await this.noteRepository.delete(id);
  }

  async create(noteId: string, userId: string): Promise<void> {
    // bsca la nota por su ID
    const note = await this.noteRepository.findOne({
      where: { id: noteId },
      relations: ['user'],
    });

    if (!note) {
      throw new Error('Nota no encontrada');
    }
    // busca el usuario por su ID
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    // asigna el usuario a la nota
    note.user = user;
    // Guardar la nota con el nuevo usuario asignado
    await this.noteRepository.save(note);

    console.log('Nota actualizada con el userId:', userId);
  }
}
