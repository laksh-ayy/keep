import { User } from '../auth/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'TypeORM';
import { Exclude } from 'class-transformer';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  title?: string;

  @Column({ type: 'text', nullable: true })
  body?: string;

  @Column({ type: 'text', nullable: true })
  label?: string;

  @CreateDateColumn()
  createdOn?: Date;

  @CreateDateColumn()
  updatedOn?: Date;

  @ManyToOne((_type) => User, (user) => user.notes, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
