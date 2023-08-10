import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FacultyEntity } from "./facultyentity.entity";
import { FacultyForm } from "./facultyform.dto";
import { FacultyFormUpdate } from "./facultyformupdate.dto";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer/dist";
import { StudentEntity } from "src/student/student.entity";

@Injectable()
export class FacultyService {
constructor(
@InjectRepository(FacultyEntity)
private facultyRepo: Repository<FacultyEntity>,
@InjectRepository(StudentEntity)
private studentRepo: Repository<StudentEntity>,
private mailerService: MailerService
){}

getIndex():any {
    return this.facultyRepo.find();
    
    }
    getFacultyByID(id):any {
    return this.facultyRepo.findOneBy({ id });
    }
    
    getUserByIDName(qry):any {
    return this.facultyRepo.findOneBy({ id:qry.id,name:qry.name });
    }
    
    insertUser(mydto:FacultyForm):any {
    const facultyaccount = new FacultyEntity()
    facultyaccount.name = mydto.name;
    facultyaccount.email = mydto.email;
    facultyaccount.password = mydto.password;
    facultyaccount.address = mydto.address;
    facultyaccount.filename = mydto.filename;
    return this.facultyRepo.save(facultyaccount);
    }
    
    updatefaculty(name,email):any {
        
    return this.facultyRepo.update({email:email},{name:name});
}
updatefacultybyid(mydto:FacultyFormUpdate,id):any {
return this.facultyRepo.update(id,mydto);
}
deleteUserbyid(id):any {
    return this.facultyRepo.delete(id);
}

getStudentsByFacultyID(id):any {
    return this.facultyRepo.find({ 
            where: {id:id},
        relations: {
            students: true,
        },
     });
}
async signup(mydto) {
    const salt = await bcrypt.genSalt();
    const hassedpassed = await bcrypt.hash(mydto.password, salt);
    mydto.password= hassedpassed;
    return this.facultyRepo.save(mydto);
    }
    
    async signin(mydto: FacultyForm) {
        console.log(mydto.password);
        const mydata = await this.facultyRepo.findOneBy({ email: mydto.email });
      
        if (!mydata) {
          throw new Error("User not found");
        }
      
        const isMatch = await bcrypt.compare(mydto.password, mydata.password);
      
        if (isMatch) {
          return 1;
        } else {
          return 0;
        }
      }
      
    
    async sendEmail(mydata){
    return await this.mailerService.sendMail({
    to: mydata.email,
    subject: mydata.subject,
    text: mydata.text,
    });
    
    }
    
    }
    
    
    
    
    
    