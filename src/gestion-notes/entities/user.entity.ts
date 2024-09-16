import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_entity')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;
}
