import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NoteEntity } from './note.entity';

@Entity('user_entity')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  password: string;

  // un usuario con muchas notas
  @OneToMany(() => NoteEntity, (note) => note.user)
  notes: NoteEntity[];
}
