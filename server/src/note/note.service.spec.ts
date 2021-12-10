import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NoteRepository } from './note.repository';
import { NoteService } from './note.service';

const mockNoteRepository = () => ({
  getNotes: jest.fn(),
  getLabels: jest.fn(),
  findOne: jest.fn(),
  getByLabel: jest.fn(),
  searchNote: jest.fn(),
  createNote: jest.fn(),
  deleteNoteById: jest.fn(),
  updateNote: jest.fn(),
});

export const mockUser = {
  id: '0',
  username: 'Test',
  password: 'somePassword',
  notes: [],
};

export const mockNote = {
  id: 'someId',
  title: 'Test title',
  body: 'Test body',
  label: 'Test label',
  createdOn: '2021-12-07 09:04:39.798908',
  updatedOn: '2021-12-07 09:04:39.798908',
};

export const createMockNote = {
  title: 'Test title',
  body: 'Test body',
  label: 'Test label',
};

describe('NoteService', () => {
  let noteService: NoteService;
  let noteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoteService,
        { provide: NoteRepository, useFactory: mockNoteRepository },
      ],
    }).compile();

    noteService = module.get<NoteService>(NoteService);
    noteRepository = module.get(NoteRepository);
  });

  it('should be defined', () => {
    expect(noteService).toBeDefined();
    expect(noteRepository).toBeDefined();
  });

  describe('getNotes', () => {
    it('calls NoteRepository.getNotes and returns the result', async () => {
      noteRepository.getNotes.mockResolvedValue('somevalue');
      const result = await noteService.getNotes(mockUser);
      expect(result).toEqual('somevalue');
    });
  });

  describe('getLabels', () => {
    it('calls NoteRepository.getLabels and returns the result', async () => {
      noteRepository.getLabels.mockResolvedValue('somevalue');
      const result = await noteService.getLabels(mockUser);
      expect(result).toEqual('somevalue');
    });
  });

  describe('getNoteById', () => {
    it('calls NoteRepository.getNoteById and returns the result', async () => {
      noteRepository.findOne.mockResolvedValue(mockNote);
      const result = await noteService.getNoteById('someId', mockUser);
      expect(result).toEqual(mockNote);
    });

    it('calls NoteRepository.getNoteById and handles an error', async () => {
      noteRepository.findOne.mockResolvedValue(null);
      expect(noteService.getNoteById('someid', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getByLabel', () => {
    it('calls NoteRepository.getByLabel and returns the result', async () => {
      noteRepository.getByLabel.mockResolvedValue([mockNote]);
      const result = await noteService.getByLabel('someId', mockUser);
      expect(result).toEqual([mockNote]);
    });
  });

  describe('searchNote', () => {
    it('calls NoteRepository.searchNote and returns the result', async () => {
      noteRepository.searchNote.mockResolvedValue([mockNote]);
      const result = await noteService.searchNote('someString', mockUser);
      expect(result).toEqual([mockNote]);
    });
  });

  describe('createNote', () => {
    it('calls NoteRepository.createNote and returns the result', async () => {
      noteRepository.createNote.mockResolvedValue(mockNote);
      const result = await noteService.createNote(createMockNote, mockUser);
      expect(result).toEqual(mockNote);
    });
  });

  describe('deleteNoteById', () => {
    it('calls NoteRepository.deleteNoteById and returns the result', async () => {
      noteRepository.deleteNoteById.mockResolvedValue(mockNote);
      const result = await noteService.deleteNoteById('someId', mockUser);
      expect(result).toEqual(mockNote);
    });
  });

  describe('updateNote', () => {
    it('calls NoteRepository.updateNote and returns the result', async () => {
      noteRepository.updateNote.mockResolvedValue(mockNote);
      const result = await noteService.updateNote(
        'someId',
        createMockNote,
        mockUser,
      );
      expect(result).toEqual(mockNote);
    });
  });
});
