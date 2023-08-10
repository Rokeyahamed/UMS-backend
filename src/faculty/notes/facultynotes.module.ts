import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyNoteController } from './facultynotes.controller';
import { FacultyNote } from './facultynotes.entity';
import { FacultyNoteService } from './facultynotes.service';

@Module({
imports: [TypeOrmModule.forFeature([FacultyNote])],
controllers: [FacultyNoteController],
providers: [FacultyNoteService],
})
export class FacultyNoteModule {}