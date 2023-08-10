import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FacultyController } from "./faculty.controller"
import { FacultyService } from "./facultyservice.service"
import { FacultyEntity } from "./facultyentity.entity"
import { StudentService } from "src/student/student.service";
import { StudentEntity } from "src/student/student.entity";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
imports: [
MailerModule.forRoot({
transport: {
host: 'smtp.gmail.com',
port: 465,
ignoreTLS: true,
secure: true,
auth: {
user: 'your email address',
pass: 'your app password'
},
}
}),
TypeOrmModule.forFeature([FacultyEntity, StudentEntity])],
controllers: [FacultyController],
providers: [FacultyService,StudentService],

})

export class FacultyModule {}