import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteRepository } from './note.repository';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/note.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
  ) {}

  async getNotes(user: User): Promise<Note[]> {
    return this.noteRepository.getNotes(user);
  }

  async getLabels(user: User): Promise<string[]> {
    return this.noteRepository.getLabels(user);
  }

  async getNoteById(id: string, user: User): Promise<Note> {
    const found = await this.noteRepository.findOne({ id, user });

    if (!found) {
      throw new NotFoundException(`Note with ${id} does not exists.`);
    }

    return found;
  }

  async getByLabel(label: string, user: User): Promise<Note[]> {
    return this.noteRepository.getByLabel(label, user);
  }

  async searchNote(search: string, user: User): Promise<Note[]> {
    return this.noteRepository.searchNote(search, user);
  }

  async createNote(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    return this.noteRepository.createNote(createNoteDto, user);
  }

  async deleteNoteById(id: string, user: User): Promise<Note> {
    return this.noteRepository.deleteNoteById(id, user);
  }

  async updateNote(
    id: string,
    createNoteDto: CreateNoteDto,
    user: User,
  ): Promise<Note> {
    return this.noteRepository.updateNote(id, createNoteDto, user);
  }
}
