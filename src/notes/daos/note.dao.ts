import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateParams } from '../services/note.service';
import { NoteEntity } from '../typeorm/entities/note.entity';
import { NoteRepository } from '../repositories/note.repository';
import { SearchDto } from '../dtos/search.dto';
import { UserEntity } from 'src/users/typeorm/entity/user.entity';

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

  async findAll(
    { limit, offset, where }: SearchDto,
    createdAt?: string,
  ): Promise<{ data: NoteEntity[]; totalItems: number; totalPages: number }> {
    const queryBuilder = this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.user', 'user')
      .select(['note', 'user.id', 'user.name']);

    if (createdAt) {
      queryBuilder.andWhere('note.createdAt = :createdAt', { createdAt });
    }

    if (where) {
      queryBuilder.andWhere(
        'note.title LIKE :where OR note.content LIKE :where',
        {
          where: `%${where}%`,
        },
      );
    }

    // añade paginación
    queryBuilder.skip(offset).take(limit);

    const [data, totalItems] = await queryBuilder.getManyAndCount();
    const totalPages = Math.ceil(totalItems / limit);

    return { data, totalItems, totalPages };
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
