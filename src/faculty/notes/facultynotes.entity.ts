import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FacultyNote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  facultyId: number;
}
