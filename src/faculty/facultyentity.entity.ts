import { StudentEntity } from 'src/student/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("faculty")
export class FacultyEntity{
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

@Column()
filename: string;

@OneToMany(() => StudentEntity, (student) => student.faculty)
students: StudentEntity[]

}