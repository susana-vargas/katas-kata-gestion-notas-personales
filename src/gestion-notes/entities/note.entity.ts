import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('note_entity')
export class NoteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar', name: 'created_at' })
  createdAt: string;

  @Column({ type: 'integer' })
  importance: number;
}
