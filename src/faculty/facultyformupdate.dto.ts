import { IsNotEmpty, IsInt, Length } from "class-validator";

export class FacultyFormUpdate {   
   
   @Length(3,8)
    name: string;



}
