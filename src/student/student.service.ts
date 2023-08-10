import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentForm } from "./student.dto";
import { StudentEntity } from "./student.entity";

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentEntity)
        private studentRepo: Repository<StudentEntity>,
      ) {}

    insertStudent(mydto: StudentForm): any {
        return this.studentRepo.save(mydto);
    }
    deleteStudentbyid(mydto: StudentForm): any {
        return this.studentRepo.save(mydto);
    }

    getFacultyByStudentID(id): any {
        return this.studentRepo.find({ 
            where: { id: id },
            relations: {
                faculty: true,
            },
        });
    }
}