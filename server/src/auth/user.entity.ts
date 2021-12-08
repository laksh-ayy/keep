import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Note } from '../note/note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => Note, (note) => note.user, { eager: true })
  notes: Note[];
}
