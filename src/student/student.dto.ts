import { IsNotEmpty, IsInt, Length, IsEmail } from "class-validator";

export class StudentForm {   
   

   @IsNotEmpty()
    name: string;
   
   @IsEmail() 
    email: string;

    @Length(3,8)
    password: string;

 
    address: string;

    @IsInt()
    Facultyid:number;



}