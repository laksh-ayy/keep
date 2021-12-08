import { NoteDto, CreateNoteDto } from "../dto/note.dto";
import axios from "axios";
import { labelEndpoint, noteEndpoint, searchEndpoint } from "../endpoints";

export class NoteService {
  public token = localStorage.getItem("token");
  async getAllNotes(): Promise<NoteDto[]> {
    try {
      const res = await axios({
        method: "get",
        url: noteEndpoint,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error().message;
    }
  }

  async getLabels(): Promise<string[]> {
    try {
      const res = await axios({
        method: "get",
        url: labelEndpoint,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }

  async getNoteById(id: string): Promise<NoteDto> {
    try {
      const res = await axios({
        method: "get",
        url: `${noteEndpoint}/${id}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }

  async getNotesByLabel(label: string): Promise<NoteDto[]> {
    try {
      const res = await axios({
        method: "get",
        url: `${labelEndpoint}/${label}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (err) {
      // @ts-ignore
      throw new Error(err.response.data.message);
    }
  }

  async searchNote(search: string): Promise<NoteDto[]> {
    try {
      const res = await axios({
        method: "get",
        url: `${searchEndpoint}/${search}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (err) {
      // @ts-ignore
      throw new Error(err.response.data.message);
    }
  }

  async createNote(noteDto: CreateNoteDto): Promise<NoteDto> {
    try {
      const { title, body, label } = noteDto;
      const res = await axios({
        method: "post",
        url: noteEndpoint,
        data: {
          title,
          body,
          label,
        },
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (err) {
      // @ts-ignore
      throw new Error(err.response.data.message);
    }
  }

  async deleteNote(id: string): Promise<NoteDto> {
    try {
      const res = await axios({
        method: "delete",
        url: `${noteEndpoint}/${id}`,
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (err) {
      // @ts-ignore
      throw new Error(err.response.data.message);
    }
  }

  async updateNote(noteDto: NoteDto): Promise<NoteDto> {
    try {
      const { id, title, body, label } = noteDto;
      const res = await axios({
        method: "put",
        url: `${noteEndpoint}/${id}`,
        data: {
          title,
          body,
          label,
        },
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      return res.data;
    } catch (err) {
      // @ts-ignore
      throw new Error(err.response.data.message);
    }
  }
}

export {};
