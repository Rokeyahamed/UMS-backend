import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { FacultyNoteDto } from './facultynotes.dto';
  import { FacultyNoteService } from './facultynotes.service';
  
  @Controller('/faculty')
  export class FacultyNoteController {
    constructor(private facultyNoteService: FacultyNoteService) {}
  
    // CREATE a new note
    @Post('/:facultyId/notes')
    @UsePipes(new ValidationPipe())
    createNote(
      @Param('facultyId', ParseIntPipe) facultyId: number,
      @Body() noteDto: FacultyNoteDto,
    ) {
      return this.facultyNoteService.createNote(facultyId, noteDto);
    }
  
    // READ all notes for a faculty
    @Get('/:facultyId/notes')
    getAllNotes(@Param('facultyId', ParseIntPipe) facultyId: number) {
      return this.facultyNoteService.getAllNotes(facultyId);
    }
  
    // READ a single note by ID
    @Get('/:facultyId/notes/:noteId')
    getNoteById(
      @Param('facultyId', ParseIntPipe) facultyId: number,
      @Param('noteId', ParseIntPipe) noteId: number,
    ) {
      return this.facultyNoteService.getNoteById(facultyId, noteId);
    }
  
    // UPDATE a note
    @Put('/:facultyId/notes/:noteId')
    @UsePipes(new ValidationPipe())
    updateNote(
      @Param('facultyId', ParseIntPipe) facultyId: number,
      @Param('noteId', ParseIntPipe) noteId: number,
      @Body() noteDto: FacultyNoteDto,
    ) {
      return this.facultyNoteService.updateNote(facultyId, noteId, noteDto);
    }
  
    // DELETE a note
    @Delete('/:facultyId/notes/:noteId')
    deleteNote(
      @Param('facultyId', ParseIntPipe) facultyId: number,
      @Param('noteId', ParseIntPipe) noteId: number,
    ) {
      return this.facultyNoteService.deleteNoteById(facultyId, noteId);
    }
  }
  