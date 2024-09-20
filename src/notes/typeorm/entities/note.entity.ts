import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from 'src/users/typeorm/entity/user.entity';

@Entity('note_entity')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: string;

  @Column({ type: 'integer' })
  importance: number;

  // muchas notas pertenecen a un usuario
  @ManyToOne(() => UserEntity, (user) => user.notes)
  user: UserEntity;
}
