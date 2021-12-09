import { EntityRepository, Repository } from 'typeorm';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/note.dto';
import { MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { User } from '../auth/user.entity';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  async getNotes(user: User): Promise<Note[]> {
    const query = this.createQueryBuilder('note');
    query.where({ user });
    const notes = await query.getMany();
    return notes;
  }

  async getLabels(user: User): Promise<string[]> {
    const query = this.createQueryBuilder('note');
    query.where({ user });
    query.distinctOn(['note.label']).orderBy('note.label');
    const notes = await query.getMany();
    const labels = notes.map((note) => {
      return note.label;
    });
    return labels;
  }

  async getByLabel(label: string, user: User): Promise<Note[]> {
    const query = this.createQueryBuilder('note');
    query.where({ user });
    query.andWhere('note.label = :label', { label });
    const notes = query.getMany();
    return notes;
  }

  async searchNote(search: string, user: User): Promise<Note[]> {
    const query = this.createQueryBuilder('note');
    query.where({ user });
    query.andWhere('(note.title LIKE :search OR note.body LIKE :search)', {
      search: `%${search}%`,
    });
    const notes = query.getMany();
    return notes;
  }

  async createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const { title, body, label } = createNoteDto;

    if (title || body) {
      const note = this.create({
        title,
        body,
        label,
        user,
      });

      await this.save(note);
      return note;
    } else {
      throw new MethodNotAllowedException(`No content in title and body`);
    }
  }

  async deleteNoteById(id: string, user: User): Promise<Note> {
    const toBeDeleted = await this.findOne({ id, user });

    if (!toBeDeleted) {
      throw new NotFoundException(`Note with ${id} does not exists.`);
    }

    this.remove(toBeDeleted);
    return toBeDeleted;
  }

  async updateNote(
    id: string,
    createNoteDto: CreateNoteDto,
    user: User,
  ): Promise<Note> {
    const toBeUpdated = await this.findOne({ id, user });

    if (!toBeUpdated) {
      throw new NotFoundException(`Note with ${id} does not exists.`);
    }
    const { title, body, label } = createNoteDto;

    toBeUpdated.title = title == null ? toBeUpdated.title : title;
    toBeUpdated.body = body == null ? toBeUpdated.body : body;
    toBeUpdated.label = label == null ? toBeUpdated.label : label;
    await this.save(toBeUpdated);
    return toBeUpdated;
  }
}
