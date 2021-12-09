import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NoteService } from './note.service';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/note.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('note')
@UseGuards(AuthGuard())
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  getNotes(@GetUser() user: User): Promise<Note[]> {
    return this.noteService.getNotes(user);
  }

  @Get('/label')
  getLabels(@GetUser() user: User): Promise<string[]> {
    return this.noteService.getLabels(user);
  }

  @Get(':id')
  getNoteById(@Param('id') id: string, @GetUser() user: User): Promise<Note> {
    return this.noteService.getNoteById(id, user);
  }

  @Get('/label/:label')
  getByLabel(
    @Param('label') label: string,
    @GetUser() user: User,
  ): Promise<Note[]> {
    return this.noteService.getByLabel(label, user);
  }

  @Get('/search/:search')
  searchNote(
    @Param('search') search: string,
    @GetUser() user: User,
  ): Promise<Note[]> {
    return this.noteService.searchNote(search, user);
  }

  @Post()
  createNote(
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.noteService.createNote(createNoteDto, user);
  }

  @Delete(':id')
  deleteNoteById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.noteService.deleteNoteById(id, user);
  }

  @Put(':id')
  updateNote(
    @Param('id') id: string,
    @Body() createNoteDto: CreateNoteDto,
    @GetUser() user: User,
  ): Promise<Note> {
    return this.noteService.updateNote(id, createNoteDto, user);
  }
}
