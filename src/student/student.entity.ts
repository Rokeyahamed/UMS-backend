import { FacultyEntity } from 'src/faculty/facultyentity.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("student")
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.students)
  faculty: FacultyEntity;
}
