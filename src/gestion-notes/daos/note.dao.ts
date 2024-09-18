import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { NoteEntity } from '../typeorm/entities/note.entity';
import { NoteRepository } from '../repositorys/note.repository';
import { CreateParams } from '../services/note.service';

@Injectable()
export class NoteDAO {
  private notes = [];

  constructor(
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
      });
    } else {
      // Si no se pasa una fecha, devuelve todas las notas
      return await this.noteRepository.find();
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
}
