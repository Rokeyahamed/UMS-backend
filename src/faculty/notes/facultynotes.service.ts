import { Injectable, NotFoundException } from '@nestjs/common';
import { FacultyNoteDto } from './facultynotes.dto';
import { FacultyNote } from './facultynotes.entity';

@Injectable()
export class FacultyNoteService {
  private facultyNotes: Map<number, FacultyNote[]> = new Map();

  // CREATE a new note
  async createNote(
    facultyId: number,
    noteDto: FacultyNoteDto,
  ): Promise<FacultyNote> {
    const notes = this.getFacultyNotes(facultyId);
    const note = new FacultyNote();
    note.id = Math.floor(Math.random() * 1000);
    note.facultyId = facultyId;
    notes.push(note);
    return note;
  }

  // READ all notes for a faculty
  async getAllNotes(facultyId: number): Promise<FacultyNote[]> {
    const notes = this.getFacultyNotes(facultyId);
    return notes;
  }

  // READ a single note by ID
  async getNoteById(facultyId: number, noteId: number): Promise<FacultyNote> {
    const notes = this.getFacultyNotes(facultyId);
    const note = notes.find((note) => note.id === noteId);
    if (!note) {
      throw new NotFoundException(`Note with id ${noteId} not found`);
    }
    return note;
  }

  // UPDATE a note
  async updateNote(
    facultyId: number,
    noteId: number,
    noteDto: FacultyNoteDto,
  ): Promise<FacultyNote> {
    const note = await this.getNoteById(facultyId, noteId);
    return note;
  }

  // DELETE a note
  async deleteNoteById(facultyId: number, noteId: number): Promise<void> {
    const notes = this.getFacultyNotes(facultyId);
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex === -1) {
      throw new NotFoundException(`Note with id ${noteId} not found`);
    }
    notes.splice(noteIndex, 1);
  }

  private getFacultyNotes(facultyId: number): FacultyNote[] {
    let notes = this.facultyNotes.get(facultyId);
    if (!notes) {
      notes = [];
      this.facultyNotes.set(facultyId, notes);
    }
    return notes;
  }
}
