import { IsNotEmpty } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  id: string;

  title?: string;

  body?: string;

  label?: string;
}

export class CreateNoteDto {
  title?: string;
  body?: string;
  label?: string;
}

export class NotesListDto {
  notes: NoteDto[];
}
